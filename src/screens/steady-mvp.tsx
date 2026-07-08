import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useMemo, useRef, useState } from "react";
import { Animated, Image, Pressable, ScrollView, TextInput, View } from "react-native";
import { AppText, Button, Card } from "@/components/steady-primitives";
import { colors, radii, shadows, spacing } from "@/lib/steady-tokens";

const playfulBalloon = require("../../assets/images/playful-balloon.png");

type Screen = "morning" | "balloon" | "evening";

const morningQuestion = "What is one small win you want to notice today?";
const eveningQuestion = "What small win happened today, even if the day was hard?";
const blowThreshold = 0.085;
const blowHoldMs = 850;

export function SteadyMvp() {
  const [screen, setScreen] = useState<Screen>("morning");
  const [morningReflection, setMorningReflection] = useState("");
  const [eveningReflection, setEveningReflection] = useState("");
  const [balloonCollectionCount, setBalloonCollectionCount] = useState(0);

  const title = useMemo(() => {
    if (screen === "balloon") return "Breathe";
    if (screen === "evening") return "Evening";
    return "Morning";
  }, [screen]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.paper }}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{
          gap: spacing.xl,
          minHeight: "100%",
          paddingBottom: 112,
          paddingHorizontal: spacing.xl,
          paddingTop: 62,
        }}
      >
        <Header title={title} />
        {screen === "morning" && (
          <MorningScreen value={morningReflection} onChange={setMorningReflection} onBreathe={() => setScreen("balloon")} />
        )}
        {screen === "balloon" && (
          <BalloonScreen
            collectionCount={balloonCollectionCount}
            onCollectBalloon={() => setBalloonCollectionCount((count) => count + 1)}
          />
        )}
        {screen === "evening" && (
          <EveningScreen
            morningReflection={morningReflection}
            value={eveningReflection}
            onChange={setEveningReflection}
            onBreathe={() => setScreen("balloon")}
          />
        )}
      </ScrollView>
      <TabBar screen={screen} onChange={setScreen} />
    </View>
  );
}

function Header({ title }: { title: string }) {
  return (
    <View style={{ gap: spacing.sm }}>
      <AppText variant="overline" color={colors.accentStrong}>
        Lighthouse
      </AppText>
      <AppText variant="display">{title}</AppText>
    </View>
  );
}

function MorningScreen({
  value,
  onChange,
  onBreathe,
}: {
  value: string;
  onChange: (value: string) => void;
  onBreathe: () => void;
}) {
  return (
    <>
      <Card tone="accent" style={{ gap: spacing.lg }}>
        <View style={{ gap: spacing.sm }}>
          <AppText variant="overline" color={colors.accentStrong}>
            Begin softly
          </AppText>
          <AppText variant="headline">One small win is enough.</AppText>
          <AppText color={colors.inkSoft}>
            Before the day asks anything from you, choose one positive thing to notice. Not a goal to perform. Just a place to aim your attention.
          </AppText>
        </View>
        <ReflectionInput
          accessibilityLabel="Morning reflection"
          placeholder="Maybe: one calm goodbye, one patient pause, one laugh."
          question={morningQuestion}
          value={value}
          onChange={onChange}
        />
      </Card>

      <Card tone="surface" style={{ gap: spacing.md }}>
        <AppText variant="bodyStrong">When the day starts loud</AppText>
        <AppText color={colors.inkSoft}>
          Use the balloon for one breath. Inhale gently, then exhale slowly to fill it.
        </AppText>
        <Button onPress={onBreathe}>Open the balloon</Button>
      </Card>
    </>
  );
}

function EveningScreen({
  morningReflection,
  value,
  onChange,
  onBreathe,
}: {
  morningReflection: string;
  value: string;
  onChange: (value: string) => void;
  onBreathe: () => void;
}) {
  return (
    <>
      <Card tone="repair" style={{ gap: spacing.lg }}>
        <View style={{ gap: spacing.sm }}>
          <AppText variant="overline" color={colors.repair}>
            Close the loop
          </AppText>
          <AppText variant="headline">Log the small win.</AppText>
          <AppText color={colors.inkSoft}>
            The day did not have to be easy to contain something worth keeping. Write one thing that counts.
          </AppText>
        </View>
        {morningReflection.trim().length > 0 && (
          <Card tone="well" style={{ gap: spacing.xs, padding: spacing.lg }}>
            <AppText variant="overline" color={colors.inkSoft}>
              This morning
            </AppText>
            <AppText color={colors.inkSoft}>{morningReflection}</AppText>
          </Card>
        )}
        <ReflectionInput
          accessibilityLabel="Evening reflection"
          placeholder="Maybe: I apologized. I noticed the giggle. I got through bedtime."
          question={eveningQuestion}
          value={value}
          onChange={onChange}
        />
      </Card>

      <Card tone="surface" style={{ gap: spacing.md }}>
        <AppText variant="bodyStrong">Let the day end</AppText>
        <AppText color={colors.inkSoft}>One breath can mark the boundary between what happened and what you carry.</AppText>
        <Button variant="repair" onPress={onBreathe}>
          Inflate the balloon
        </Button>
      </Card>
    </>
  );
}

function ReflectionInput({
  accessibilityLabel,
  placeholder,
  question,
  value,
  onChange,
}: {
  accessibilityLabel: string;
  placeholder: string;
  question: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <View style={{ gap: spacing.sm }}>
      <AppText variant="bodyStrong">{question}</AppText>
      <TextInput
        accessibilityLabel={accessibilityLabel}
        multiline
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor={colors.inkFaint}
        style={{
          backgroundColor: "#fffdf8",
          borderColor: colors.line,
          borderCurve: "continuous",
          borderRadius: radii.md,
          borderWidth: 1,
          color: colors.ink,
          fontSize: 17,
          lineHeight: 24,
          minHeight: 116,
          padding: spacing.lg,
          textAlignVertical: "top",
        }}
        value={value}
      />
    </View>
  );
}

function BalloonScreen({ collectionCount, onCollectBalloon }: { collectionCount: number; onCollectBalloon: () => void }) {
  const maxBreaths = 5;
  const deflatedScale = 0.24;
  const fullScale = 1;
  const scaleForBreath = (count: number) => deflatedScale + (Math.min(count, maxBreaths) / maxBreaths) * (fullScale - deflatedScale);

  const [balloonScale] = useState(() => new Animated.Value(deflatedScale));
  const [float] = useState(() => new Animated.Value(0));
  const [breaths, setBreaths] = useState(0);
  const [collectedThisBalloon, setCollectedThisBalloon] = useState(false);
  const [micActive, setMicActive] = useState(false);
  const [micMessage, setMicMessage] = useState("Tap the button, or turn on the mic and blow gently.");
  const [blowLevel, setBlowLevel] = useState(0);
  const breathsRef = useRef(0);
  const collectedThisBalloonRef = useRef(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const frameRef = useRef<number | null>(null);
  const blowStartedAtRef = useRef<number | null>(null);
  const lastInflatedAtRef = useRef(0);

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(float, {
          toValue: 1,
          duration: 2600,
          useNativeDriver: true,
        }),
        Animated.timing(float, {
          toValue: 0,
          duration: 2600,
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [float]);

  const inflate = () => {
    if (breathsRef.current >= maxBreaths) return;

    const nextBreaths = Math.min(breathsRef.current + 1, maxBreaths);
    breathsRef.current = nextBreaths;
    setBreaths(nextBreaths);
    Animated.spring(balloonScale, {
      toValue: scaleForBreath(nextBreaths),
      damping: 12,
      stiffness: 70,
      useNativeDriver: true,
    }).start();

    if (nextBreaths >= maxBreaths && !collectedThisBalloonRef.current) {
      collectedThisBalloonRef.current = true;
      setCollectedThisBalloon(true);
      onCollectBalloon();
      setMicMessage("Fully inflated. Added to your account collection.");
    }
  };

  const inflateFromBlow = () => {
    if (breathsRef.current >= maxBreaths) return;
    const now = Date.now();
    if (now - lastInflatedAtRef.current < 1200) return;
    lastInflatedAtRef.current = now;
    inflate();
    setMicMessage("Nice slow exhale. The balloon heard you.");
  };

  const reset = () => {
    breathsRef.current = 0;
    collectedThisBalloonRef.current = false;
    setBreaths(0);
    setCollectedThisBalloon(false);
    Animated.spring(balloonScale, {
      toValue: deflatedScale,
      damping: 12,
      stiffness: 70,
      useNativeDriver: true,
    }).start();
    blowStartedAtRef.current = null;
    lastInflatedAtRef.current = 0;
    setMicMessage(micActive ? "Blow gently toward the microphone." : "Tap the button, or turn on the mic and blow gently.");
  };

  const stopMic = () => {
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
    setMicActive(false);
    setMicMessage("Microphone is off. You can still tap to add a breath.");
  };

  const startMic = async () => {
    if (typeof window === "undefined" || !navigator.mediaDevices?.getUserMedia) {
      setMicMessage("Microphone blowing is not available here yet. Tap still works.");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false,
        },
      });
      const AudioContextConstructor = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextConstructor) {
        stream.getTracks().forEach((track) => track.stop());
        setMicMessage("This browser cannot read microphone volume. Tap still works.");
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
      setMicActive(true);
      setMicMessage("Blow gently toward the microphone.");

      const data = new Uint8Array(analyser.fftSize);
      const tick = () => {
        analyser.getByteTimeDomainData(data);
        let sum = 0;
        for (const value of data) {
          const normalized = (value - 128) / 128;
          sum += normalized * normalized;
        }
        const rms = Math.sqrt(sum / data.length);
        const level = Math.min(1, rms / 0.22);
        setBlowLevel(level);

        const now = Date.now();
        if (rms > blowThreshold) {
          blowStartedAtRef.current ??= now;
          setMicMessage("Keep the exhale slow.");
          if (now - blowStartedAtRef.current >= blowHoldMs) {
            blowStartedAtRef.current = null;
            inflateFromBlow();
          }
        } else {
          blowStartedAtRef.current = null;
          if (micActive) setMicMessage("Blow gently toward the microphone.");
        }

        frameRef.current = requestAnimationFrame(tick);
      };

      frameRef.current = requestAnimationFrame(tick);
    } catch {
      setMicMessage("Microphone permission was not granted. Tap still works.");
    }
  };

  useEffect(() => stopMic, []);

  const translateY = float.interpolate({
    inputRange: [0, 1],
    outputRange: [8, -8],
  });
  const balloonScaleX = balloonScale.interpolate({
    inputRange: [deflatedScale, fullScale],
    outputRange: [0.7, 1],
  });
  const balloonScaleY = balloonScale.interpolate({
    inputRange: [deflatedScale, fullScale],
    outputRange: [0.16, 1],
  });
  const breathProgress = breaths / maxBreaths;
  const collectionPreviewCount = Math.min(collectionCount, 9);

  return (
    <>
      <LinearGradient
        colors={["#274d42", "#2f6f5e", "#8ab9aa"]}
        start={{ x: 0.2, y: 0 }}
        end={{ x: 0.8, y: 1 }}
        style={{
          alignItems: "center",
          borderCurve: "continuous",
          borderRadius: radii.xl,
          boxShadow: shadows.raised,
          gap: spacing.lg,
          minHeight: 440,
          justifyContent: "space-between",
          padding: spacing.lg,
        }}
      >
        <View style={{ alignItems: "center", gap: spacing.sm }}>
          <AppText variant="overline" color="rgba(255,255,255,0.72)">
            Balloon breath
          </AppText>
          <AppText variant="headline" color="#ffffff" style={{ textAlign: "center" }}>
            Start empty. Fill it slowly.
          </AppText>
          <AppText color="rgba(255,255,255,0.78)" style={{ textAlign: "center" }}>
            Five slow exhales inflate the balloon. When it is full, it joins your collection.
          </AppText>
        </View>

        <Pressable accessibilityRole="button" accessibilityLabel="Inflate balloon" onPress={inflate} style={{ alignItems: "center" }}>
          <View style={{ alignItems: "center", height: 214, justifyContent: "center", width: 224 }}>
            <Animated.View
              style={{
                alignItems: "center",
                transform: [{ translateY }, { scaleX: balloonScaleX }, { scaleY: balloonScaleY }],
              }}
            >
              <Image
                source={playfulBalloon}
                style={{
                  height: 266,
                  resizeMode: "contain",
                  width: 210,
                }}
              />
            </Animated.View>
          </View>
        </Pressable>

        <View style={{ alignSelf: "stretch", gap: spacing.md }}>
          <View style={{ gap: spacing.sm }}>
            <View
              accessibilityLabel={`Balloon inflation ${Math.round(breathProgress * 100)} percent`}
              style={{
                backgroundColor: "rgba(255,255,255,0.18)",
                borderColor: "rgba(255,255,255,0.34)",
                borderRadius: radii.pill,
                borderWidth: 1,
                height: 12,
                overflow: "hidden",
              }}
            >
              <View
                style={{
                  backgroundColor: "#f8d88f",
                  borderRadius: radii.pill,
                  height: "100%",
                  width: `${Math.max(4, breathProgress * 100)}%`,
                }}
              />
            </View>
            <AppText variant="small" color="rgba(255,255,255,0.82)" style={{ textAlign: "center" }}>
              {collectedThisBalloon ? "Saved. Start another whenever you need it." : `${breaths} of ${maxBreaths} slow breaths`}
            </AppText>
          </View>
          <View style={{ gap: spacing.sm }}>
            <View
              accessibilityLabel={`Blow level ${Math.round(blowLevel * 100)} percent`}
              style={{
                backgroundColor: "rgba(255,255,255,0.18)",
                borderColor: "rgba(255,255,255,0.34)",
                borderRadius: radii.pill,
                borderWidth: 1,
                height: 12,
                overflow: "hidden",
              }}
            >
              <View
                style={{
                  backgroundColor: "rgba(255,255,255,0.82)",
                  borderRadius: radii.pill,
                  height: "100%",
                  width: `${Math.max(8, blowLevel * 100)}%`,
                }}
              />
            </View>
            <AppText variant="small" color="rgba(255,255,255,0.82)" style={{ textAlign: "center" }}>
              {micMessage}
            </AppText>
          </View>
          <Button variant="secondary" onPress={breaths >= maxBreaths ? reset : inflate} style={{ backgroundColor: "rgba(255,255,255,0.18)" }} textStyle={{ color: "#ffffff" }}>
            {breaths >= maxBreaths ? "Start another balloon" : "Add one slow breath"}
          </Button>
          <Button variant="secondary" onPress={micActive ? stopMic : startMic} style={{ backgroundColor: "rgba(255,255,255,0.18)" }} textStyle={{ color: "#ffffff" }}>
            {micActive ? "Turn microphone off" : "Turn microphone on"}
          </Button>
        </View>
      </LinearGradient>

      <Card tone="surface" style={{ gap: spacing.md }}>
        <View style={{ flexDirection: "row", gap: spacing.md, justifyContent: "space-between" }}>
          <View style={{ flex: 1, gap: spacing.xs }}>
            <AppText variant="bodyStrong">Account collection</AppText>
            <AppText color={colors.inkSoft}>
              {collectionCount === 0
                ? "No balloons saved yet. Fill one when you need a reset."
                : `${collectionCount} ${collectionCount === 1 ? "balloon" : "balloons"} saved from slow breaths.`}
            </AppText>
          </View>
          <View
            style={{
              alignItems: "center",
              backgroundColor: colors.accentFaint,
              borderRadius: radii.lg,
              justifyContent: "center",
              minHeight: 56,
              minWidth: 64,
              paddingHorizontal: spacing.md,
            }}
          >
            <AppText variant="title" color={colors.accentStrong}>
              {collectionCount}
            </AppText>
          </View>
        </View>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.sm, minHeight: 42 }}>
          {collectionCount === 0 ? (
            <View
              style={{
                backgroundColor: colors.surfaceWell,
                borderRadius: radii.pill,
                height: 34,
                width: 34,
              }}
            />
          ) : (
            Array.from({ length: collectionPreviewCount }).map((_, index) => (
              <Image
                key={index}
                source={playfulBalloon}
                style={{
                  height: 40,
                  resizeMode: "contain",
                  width: 32,
                }}
              />
            ))
          )}
          {collectionCount > collectionPreviewCount && (
            <View
              style={{
                alignItems: "center",
                backgroundColor: colors.surfaceWell,
                borderRadius: radii.pill,
                height: 36,
                justifyContent: "center",
                paddingHorizontal: spacing.md,
              }}
            >
              <AppText variant="small" color={colors.inkSoft}>
                +{collectionCount - collectionPreviewCount}
              </AppText>
            </View>
          )}
        </View>
      </Card>
    </>
  );
}

function TabBar({ screen, onChange }: { screen: Screen; onChange: (screen: Screen) => void }) {
  const tabs: { label: string; screen: Screen }[] = [
    { label: "Morning", screen: "morning" },
    { label: "Balloon", screen: "balloon" },
    { label: "Evening", screen: "evening" },
  ];

  return (
    <View
      style={{
        backgroundColor: "rgba(250,249,245,0.96)",
        borderColor: colors.line,
        borderTopWidth: 1,
        bottom: 0,
        boxShadow: shadows.card,
        flexDirection: "row",
        gap: spacing.sm,
        left: 0,
        paddingBottom: 28,
        paddingHorizontal: spacing.lg,
        paddingTop: spacing.md,
        position: "absolute",
        right: 0,
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
              backgroundColor: active ? colors.accent : "#fffdf8",
              borderColor: active ? colors.accent : colors.line,
              borderRadius: radii.pill,
              borderWidth: 1,
              flex: 1,
              justifyContent: "center",
              minHeight: 48,
              opacity: pressed ? 0.86 : 1,
            })}
          >
            <AppText variant="small" color={active ? "#ffffff" : colors.inkSoft} selectable={false} style={{ fontWeight: "700" }}>
              {tab.label}
            </AppText>
          </Pressable>
        );
      })}
    </View>
  );
}
