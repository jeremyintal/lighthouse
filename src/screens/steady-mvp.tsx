import { LinearGradient } from "expo-linear-gradient";
import { requestRecordingPermissionsAsync, useAudioStream, type AudioStreamBuffer } from "expo-audio";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Animated, Image, Platform, Pressable, ScrollView, TextInput, useWindowDimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppText, Button, Card } from "@/components/steady-primitives";
import { colors, radii, shadows, spacing } from "@/lib/steady-tokens";

const realisticBalloon = require("../../assets/images/realistic-balloon.png");
const balloonFrames = [
  require("../../assets/images/balloon-stage-1.png"),
  require("../../assets/images/balloon-stage-2.png"),
  require("../../assets/images/balloon-stage-3.png"),
  require("../../assets/images/balloon-stage-4.png"),
  require("../../assets/images/balloon-stage-5.png"),
  require("../../assets/images/balloon-stage-6.png"),
  require("../../assets/images/balloon-stage-7.png"),
  require("../../assets/images/balloon-stage-8.png"),
  require("../../assets/images/balloon-stage-9.png"),
] as const;

type Screen = "breathe" | "morning";

const morningQuestion = "What would make today feel a little lighter?";
const maxBreaths = 8;
const blowThreshold = 0.085;
const nativeBlowThreshold = 0.045;
const blowHoldMs = 850;
const useNativeAnimations = Platform.OS !== "web";

function savedBalloonLabel(count: number) {
  return `${count} ${count === 1 ? "balloon" : "balloons"} saved`;
}

export function SteadyMvp() {
  const insets = useSafeAreaInsets();
  const [screen, setScreen] = useState<Screen>("breathe");
  const [morningReflection, setMorningReflection] = useState("");
  const [balloonCollectionCount, setBalloonCollectionCount] = useState(0);

  const today = useMemo(
    () => new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric" }).format(new Date()),
    [],
  );

  return (
    <LinearGradient colors={["#f7fbf7", "#fff8f0", "#edf5f0"]} locations={[0, 0.58, 1]} style={{ flex: 1 }}>
      <ScrollView
        contentInsetAdjustmentBehavior="never"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        style={{ alignSelf: "center", maxWidth: 430, width: "100%" }}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 112 + insets.bottom,
          paddingHorizontal: spacing.xl,
          paddingTop: insets.top + spacing.lg,
        }}
      >
        <TopBar collectionCount={balloonCollectionCount} date={today} />

        {screen === "breathe" ? (
          <BalloonBreather
            collectionCount={balloonCollectionCount}
            onCollectBalloon={() => setBalloonCollectionCount((count) => count + 1)}
          />
        ) : (
          <MorningScreen
            value={morningReflection}
            onChange={setMorningReflection}
            onFinish={() => setScreen("breathe")}
          />
        )}
      </ScrollView>

      <TabBar bottomInset={insets.bottom} screen={screen} onChange={setScreen} />
    </LinearGradient>
  );
}

function TopBar({ collectionCount, date }: { collectionCount: number; date: string }) {
  return (
    <View style={{ alignItems: "center", flexDirection: "row", justifyContent: "space-between", minHeight: 44 }}>
      <View style={{ gap: 2 }}>
        <AppText variant="overline" color={colors.accentStrong}>
          Lighthouse
        </AppText>
        <AppText variant="small" color={colors.inkSoft}>
          {date}
        </AppText>
      </View>

      <View
        accessibilityLabel={savedBalloonLabel(collectionCount)}
        style={{
          alignItems: "center",
          backgroundColor: "rgba(255,253,248,0.82)",
          borderColor: colors.line,
          borderCurve: "continuous",
          borderRadius: radii.md,
          borderWidth: 1,
          flexDirection: "row",
          gap: spacing.xs,
          minHeight: 44,
          paddingHorizontal: spacing.md,
        }}
      >
        <Image source={realisticBalloon} style={{ height: 30, resizeMode: "contain", width: 20 }} />
        <AppText variant="bodyStrong" color={colors.accentStrong}>
          {collectionCount}
        </AppText>
      </View>
    </View>
  );
}

function MorningScreen({
  value,
  onChange,
  onFinish,
}: {
  value: string;
  onChange: (value: string) => void;
  onFinish: () => void;
}) {
  return (
    <View style={{ flex: 1, gap: spacing.xxl, paddingTop: spacing.xxxl }}>
      <View style={{ gap: spacing.md }}>
        <AppText variant="headline">Begin with one thing.</AppText>
        <AppText color={colors.inkSoft}>No perfect plan. Just a gentle direction for today.</AppText>
      </View>

      <Card tone="surface" style={{ gap: spacing.lg }}>
        <AppText variant="bodyStrong">{morningQuestion}</AppText>
        <TextInput
          accessibilityLabel="Morning intention"
          multiline
          onChangeText={onChange}
          placeholder="A patient goodbye. A laugh before school."
          placeholderTextColor={colors.inkFaint}
          style={{
            backgroundColor: colors.paper,
            borderColor: colors.line,
            borderCurve: "continuous",
            borderRadius: radii.md,
            borderWidth: 1,
            color: colors.ink,
            fontFamily: "Avenir Next",
            fontSize: 17,
            lineHeight: 25,
            minHeight: 144,
            padding: spacing.lg,
            textAlignVertical: "top",
          }}
          value={value}
        />
        <Button onPress={onFinish}>{value.trim() ? "Save and breathe" : "Skip to breathing"}</Button>
      </Card>

      <View style={{ borderLeftColor: colors.repair, borderLeftWidth: 3, gap: spacing.sm, paddingLeft: spacing.lg }}>
        <AppText variant="bodyStrong" color={colors.ink}>
          You only need to meet this day one moment at a time.
        </AppText>
      </View>
    </View>
  );
}

function BalloonBreather({
  collectionCount,
  onCollectBalloon,
}: {
  collectionCount: number;
  onCollectBalloon: () => void;
}) {
  const { height: viewportHeight } = useWindowDimensions();
  const compactHeight = viewportHeight < 780;
  const [float] = useState(() => new Animated.Value(0));
  const [breaths, setBreaths] = useState(0);
  const [collectedThisBalloon, setCollectedThisBalloon] = useState(false);
  const [micActive, setMicActive] = useState(false);
  const [micMessage, setMicMessage] = useState("Ready when you are.");
  const [blowLevel, setBlowLevel] = useState(0);
  const breathsRef = useRef(0);
  const collectedThisBalloonRef = useRef(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const frameRef = useRef<number | null>(null);
  const blowStartedAtRef = useRef<number | null>(null);
  const lastInflatedAtRef = useRef(0);
  const smoothedBlowLevelRef = useRef(0);
  const micActiveRef = useRef(false);
  const stopMicRef = useRef<(preserveMessage?: boolean) => void>(() => undefined);

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(float, { toValue: 1, duration: 2800, useNativeDriver: useNativeAnimations }),
        Animated.timing(float, { toValue: 0, duration: 2800, useNativeDriver: useNativeAnimations }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [float]);

  const inflate = useCallback(() => {
    if (breathsRef.current >= maxBreaths) return;

    const nextBreaths = Math.min(breathsRef.current + 1, maxBreaths);
    breathsRef.current = nextBreaths;
    setBreaths(nextBreaths);

    if (nextBreaths === maxBreaths && !collectedThisBalloonRef.current) {
      collectedThisBalloonRef.current = true;
      setCollectedThisBalloon(true);
      onCollectBalloon();
      setMicMessage("You made a little space.");
      if (micActiveRef.current) stopMicRef.current(true);
    }
  }, [onCollectBalloon]);

  const inflateFromBlow = useCallback(() => {
    if (breathsRef.current >= maxBreaths) return;
    const now = Date.now();
    if (now - lastInflatedAtRef.current < 1200) return;
    lastInflatedAtRef.current = now;
    inflate();
    setMicMessage("That was enough.");
  }, [inflate]);

  const handleNativeAudioBuffer = useCallback(
    (buffer: AudioStreamBuffer) => {
      if (breathsRef.current >= maxBreaths) return;

      const samples = new Float32Array(buffer.data);
      if (samples.length === 0) return;

      let sum = 0;
      for (let index = 0; index < samples.length; index += 1) {
        const sample = samples[index];
        sum += sample * sample;
      }

      const rms = Math.sqrt(sum / samples.length);
      const level = Math.min(1, rms / 0.18);
      const smoothedLevel = smoothedBlowLevelRef.current * 0.72 + level * 0.28;
      smoothedBlowLevelRef.current = smoothedLevel;
      setBlowLevel(smoothedLevel);

      const now = Date.now();
      if (rms > nativeBlowThreshold) {
        blowStartedAtRef.current ??= now;
        setMicMessage("Keep exhaling...");
        if (now - blowStartedAtRef.current >= blowHoldMs) {
          blowStartedAtRef.current = null;
          inflateFromBlow();
        }
      } else {
        blowStartedAtRef.current = null;
        setMicMessage("Blow gently toward the phone.");
      }
    },
    [inflateFromBlow],
  );

  const { stream: nativeAudioStream } = useAudioStream({
    sampleRate: 16000,
    channels: 1,
    encoding: "float32",
    onBuffer: handleNativeAudioBuffer,
  });

  const reset = () => {
    breathsRef.current = 0;
    collectedThisBalloonRef.current = false;
    setBreaths(0);
    setCollectedThisBalloon(false);
    blowStartedAtRef.current = null;
    lastInflatedAtRef.current = 0;
    setMicMessage(micActive ? "Blow gently toward the phone." : "Ready when you are.");
  };

  const stopMic = useCallback((preserveMessage = false) => {
    if (Platform.OS !== "web") {
      nativeAudioStream.stop();
      blowStartedAtRef.current = null;
      smoothedBlowLevelRef.current = 0;
      setBlowLevel(0);
      micActiveRef.current = false;
      setMicActive(false);
      if (!preserveMessage) setMicMessage("Ready when you are.");
      return;
    }

    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    audioContextRef.current?.close().catch(() => undefined);
    audioContextRef.current = null;
    analyserRef.current = null;
    blowStartedAtRef.current = null;
    setBlowLevel(0);
    micActiveRef.current = false;
    setMicActive(false);
    if (!preserveMessage) setMicMessage("Ready when you are.");
  }, [nativeAudioStream]);

  useEffect(() => {
    stopMicRef.current = stopMic;
  }, [stopMic]);

  const startMic = async () => {
    if (Platform.OS !== "web") {
      try {
        const permission = await requestRecordingPermissionsAsync();
        if (!permission.granted) {
          setMicMessage("Microphone access is needed. Tapping still works.");
          return;
        }

        blowStartedAtRef.current = null;
        smoothedBlowLevelRef.current = 0;
        setBlowLevel(0);
        setMicMessage("Blow gently toward the phone.");
        await nativeAudioStream.start();
        micActiveRef.current = true;
        setMicActive(true);
      } catch {
        setMicActive(false);
        setMicMessage("Microphone unavailable. Tapping still works.");
      }
      return;
    }

    if (typeof window === "undefined" || !navigator.mediaDevices?.getUserMedia) {
      setMicMessage("Microphone unavailable. Tapping still works.");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false },
      });
      const AudioContextConstructor =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextConstructor) {
        stream.getTracks().forEach((track) => track.stop());
        setMicMessage("Microphone unavailable. Tapping still works.");
        return;
      }

      const audioContext = new AudioContextConstructor();
      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 1024;
      analyser.smoothingTimeConstant = 0.82;
      source.connect(analyser);

      streamRef.current = stream;
      audioContextRef.current = audioContext;
      analyserRef.current = analyser;
      micActiveRef.current = true;
      setMicActive(true);
      setMicMessage("Blow gently toward the phone.");

      const data = new Uint8Array(analyser.fftSize);
      const tick = () => {
        analyser.getByteTimeDomainData(data);
        let sum = 0;
        for (const value of data) {
          const normalized = (value - 128) / 128;
          sum += normalized * normalized;
        }
        const rms = Math.sqrt(sum / data.length);
        setBlowLevel(Math.min(1, rms / 0.22));

        const now = Date.now();
        if (rms > blowThreshold) {
          blowStartedAtRef.current ??= now;
          setMicMessage("Keep exhaling...");
          if (now - blowStartedAtRef.current >= blowHoldMs) {
            blowStartedAtRef.current = null;
            inflateFromBlow();
          }
        } else {
          blowStartedAtRef.current = null;
          setMicMessage("Blow gently toward the phone.");
        }

        frameRef.current = requestAnimationFrame(tick);
      };

      frameRef.current = requestAnimationFrame(tick);
    } catch {
      setMicMessage("Microphone access is needed. Tapping still works.");
    }
  };

  useEffect(
    () => () => {
      if (Platform.OS !== "web") {
        nativeAudioStream.stop();
        return;
      }

      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
      streamRef.current?.getTracks().forEach((track) => track.stop());
      audioContextRef.current?.close().catch(() => undefined);
    },
    [nativeAudioStream],
  );

  const translateY = float.interpolate({ inputRange: [0, 1], outputRange: [7, -7] });

  return (
    <View style={{ alignItems: "center", flex: 1, paddingTop: compactHeight ? spacing.xl : spacing.xxl }}>
      <View style={{ alignItems: "center", gap: spacing.sm }}>
        <AppText variant="headline" style={{ textAlign: "center" }}>
          {collectedThisBalloon ? "A little lighter." : "Take one slow breath."}
        </AppText>
        <AppText color={colors.inkSoft} style={{ textAlign: "center" }}>
          {collectedThisBalloon ? `${savedBalloonLabel(collectionCount)}.` : "Long exhale. Soft shoulders."}
        </AppText>
      </View>

      <Pressable
        accessibilityLabel="Inflate balloon"
        accessibilityRole="button"
        onPress={inflate}
        style={{
          alignItems: "center",
          height: compactHeight ? 280 : 340,
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Animated.View
          style={{
            alignItems: "center",
            height: compactHeight ? 284 : 320,
            justifyContent: "center",
            position: "absolute",
            transform: [{ translateY }],
            width: compactHeight ? 170 : 190,
          }}
        >
          {balloonFrames.map((frame, index) => (
            <Image
              fadeDuration={0}
              key={index}
              source={frame}
              style={{
                height: "100%",
                opacity: index === breaths ? 1 : 0,
                position: "absolute",
                resizeMode: "contain",
                width: "100%",
              }}
            />
          ))}
        </Animated.View>
      </Pressable>

      <View accessibilityLabel={`${breaths} of ${maxBreaths} slow breaths`} style={{ flexDirection: "row", gap: spacing.sm }}>
        {Array.from({ length: maxBreaths }).map((_, index) => (
          <View
            key={index}
            style={{
              backgroundColor: index < breaths ? colors.repair : colors.lineStrong,
              borderRadius: radii.pill,
              height: 8,
              opacity: index < breaths ? 1 : 0.62,
              width: index < breaths ? 28 : 8,
            }}
          />
        ))}
      </View>

      <View style={{ alignItems: "center", alignSelf: "stretch", gap: spacing.md, paddingTop: spacing.lg }}>
        {micActive && (
          <View style={{ alignSelf: "stretch", gap: spacing.sm }}>
            <View
              accessibilityLabel={`Breath strength ${Math.round(blowLevel * 100)} percent`}
              style={{
                backgroundColor: colors.line,
                borderRadius: radii.pill,
                height: 4,
                overflow: "hidden",
              }}
            >
              <View
                style={{
                  backgroundColor: colors.accent,
                  borderRadius: radii.pill,
                  height: "100%",
                  width: `${Math.max(6, blowLevel * 100)}%`,
                }}
              />
            </View>
          </View>
        )}

        <AppText variant="small" color={colors.inkSoft} style={{ minHeight: 21, textAlign: "center" }}>
          {micMessage}
        </AppText>

        <Button
          onPress={collectedThisBalloon ? reset : micActive ? () => stopMic() : startMic}
          style={{ alignSelf: "stretch", boxShadow: shadows.card }}
        >
          {collectedThisBalloon ? "Breathe again" : micActive ? "Stop listening" : "Use microphone"}
        </Button>

        {!collectedThisBalloon && (
          <Pressable
            accessibilityRole="button"
            onPress={inflate}
            style={({ pressed }) => ({
              alignItems: "center",
              justifyContent: "center",
              minHeight: 44,
              opacity: pressed ? 0.6 : 1,
              paddingHorizontal: spacing.lg,
            })}
          >
            <AppText variant="small" color={colors.accentStrong} selectable={false} style={{ fontWeight: "700" }}>
              Tap the balloon instead
            </AppText>
          </Pressable>
        )}
      </View>
    </View>
  );
}

function TabBar({
  bottomInset,
  screen,
  onChange,
}: {
  bottomInset: number;
  screen: Screen;
  onChange: (screen: Screen) => void;
}) {
  const tabs: { label: string; screen: Screen }[] = [
    { label: "Breathe", screen: "breathe" },
    { label: "Morning", screen: "morning" },
  ];

  return (
    <View
      pointerEvents="box-none"
      style={{
        alignItems: "center",
        bottom: Math.max(bottomInset, spacing.md),
        left: 0,
        paddingHorizontal: spacing.xl,
        position: "absolute",
        right: 0,
      }}
    >
      <View
        style={{
          backgroundColor: "rgba(255,253,248,0.94)",
          borderColor: colors.line,
          borderCurve: "continuous",
          borderRadius: radii.lg,
          borderWidth: 1,
          boxShadow: shadows.raised,
          flexDirection: "row",
          gap: spacing.xs,
          maxWidth: 382,
          padding: spacing.xs,
          width: "100%",
        }}
      >
        {tabs.map((tab) => {
          const active = tab.screen === screen;
          return (
            <Pressable
              accessibilityRole="button"
              accessibilityState={{ selected: active }}
              key={tab.label}
              onPress={() => onChange(tab.screen)}
              style={({ pressed }) => ({
                alignItems: "center",
                backgroundColor: active ? colors.accent : "transparent",
                borderCurve: "continuous",
                borderRadius: radii.md,
                flex: 1,
                justifyContent: "center",
                minHeight: 52,
                opacity: pressed ? 0.82 : 1,
              })}
            >
              <AppText
                variant="small"
                color={active ? "#ffffff" : colors.inkSoft}
                selectable={false}
                style={{ fontWeight: "700" }}
              >
                {tab.label}
              </AppText>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
