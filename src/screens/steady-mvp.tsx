import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useMemo, useState } from "react";
import { Animated, Pressable, ScrollView, TextInput, View } from "react-native";
import { AppText, Button, Card } from "@/components/steady-primitives";
import { colors, radii, shadows, spacing } from "@/lib/steady-tokens";

type Screen = "morning" | "balloon" | "evening";

const morningQuestion = "What is one small win you want to notice today?";
const eveningQuestion = "What small win happened today, even if the day was hard?";

export function SteadyMvp() {
  const [screen, setScreen] = useState<Screen>("morning");
  const [morningReflection, setMorningReflection] = useState("");
  const [eveningReflection, setEveningReflection] = useState("");

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
        {screen === "balloon" && <BalloonScreen onEvening={() => setScreen("evening")} />}
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

function BalloonScreen({ onEvening }: { onEvening: () => void }) {
  const [balloonScale] = useState(() => new Animated.Value(0.72));
  const [float] = useState(() => new Animated.Value(0));
  const [breaths, setBreaths] = useState(0);

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
    const nextBreaths = Math.min(breaths + 1, 4);
    setBreaths(nextBreaths);
    Animated.spring(balloonScale, {
      toValue: 0.72 + nextBreaths * 0.11,
      damping: 12,
      stiffness: 70,
      useNativeDriver: true,
    }).start();
  };

  const reset = () => {
    setBreaths(0);
    Animated.spring(balloonScale, {
      toValue: 0.72,
      damping: 12,
      stiffness: 70,
      useNativeDriver: true,
    }).start();
  };

  const translateY = float.interpolate({
    inputRange: [0, 1],
    outputRange: [8, -8],
  });

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
          gap: spacing.xxl,
          minHeight: 520,
          justifyContent: "space-between",
          padding: spacing.xxl,
        }}
      >
        <View style={{ alignItems: "center", gap: spacing.sm }}>
          <AppText variant="overline" color="rgba(255,255,255,0.72)">
            Balloon breath
          </AppText>
          <AppText variant="headline" color="#ffffff" style={{ textAlign: "center" }}>
            Fill it slowly.
          </AppText>
          <AppText color="rgba(255,255,255,0.78)" style={{ textAlign: "center" }}>
            Inhale through your nose. Exhale like you are gently filling a balloon. Tap once for each slow breath.
          </AppText>
        </View>

        <Pressable accessibilityRole="button" accessibilityLabel="Inflate balloon" onPress={inflate} style={{ alignItems: "center" }}>
          <View style={{ alignItems: "center", height: 276, justifyContent: "center", width: 240 }}>
            <Animated.View
              style={{
                alignItems: "center",
                transform: [{ translateY }, { scale: balloonScale }],
              }}
            >
              <LinearGradient
                colors={["#f6e8df", "#d99a79", "#b4633f"]}
                start={{ x: 0.18, y: 0.08 }}
                end={{ x: 0.82, y: 1 }}
                style={{
                  alignItems: "center",
                  borderColor: "rgba(255,255,255,0.44)",
                  borderRadius: 95,
                  borderWidth: 1,
                  height: 188,
                  justifyContent: "flex-start",
                  paddingTop: 28,
                  width: 166,
                }}
              >
                <View
                  style={{
                    backgroundColor: "rgba(255,255,255,0.34)",
                    borderRadius: radii.pill,
                    height: 30,
                    opacity: 0.76,
                    width: 44,
                  }}
                />
              </LinearGradient>
              <View
                style={{
                  borderLeftColor: "transparent",
                  borderLeftWidth: 14,
                  borderRightColor: "transparent",
                  borderRightWidth: 14,
                  borderTopColor: "#b4633f",
                  borderTopWidth: 24,
                  height: 0,
                  marginTop: -2,
                  width: 0,
                }}
              />
              <View style={{ backgroundColor: "rgba(255,255,255,0.74)", height: 72, marginTop: -2, width: 2 }} />
            </Animated.View>
          </View>
        </Pressable>

        <View style={{ alignSelf: "stretch", gap: spacing.md }}>
          <Button variant="secondary" onPress={breaths >= 4 ? reset : inflate} style={{ backgroundColor: "rgba(255,255,255,0.18)" }} textStyle={{ color: "#ffffff" }}>
            {breaths >= 4 ? "Start again" : "Add one slow breath"}
          </Button>
          <Button variant="ghost" onPress={onEvening} textStyle={{ color: "rgba(255,255,255,0.86)" }}>
            Go to evening reflection
          </Button>
        </View>
      </LinearGradient>

      <Card tone="well" style={{ gap: spacing.sm }}>
        <AppText variant="bodyStrong">Use it anytime.</AppText>
        <AppText color={colors.inkSoft}>A balloon is simple on purpose. It gives your body one clear job: make the exhale slow and gentle.</AppText>
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
