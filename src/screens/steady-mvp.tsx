import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useMemo, useState } from "react";
import { Animated, Pressable, ScrollView, TextInput, View } from "react-native";
import { AppText, Button, Card } from "@/components/steady-primitives";
import { colors, radii, shadows, spacing } from "@/lib/steady-tokens";

type Screen = "morning" | "candle" | "evening";

const morningQuestion = "What is one small win you want to notice today?";
const eveningQuestion = "What small win happened today, even if the day was hard?";

export function SteadyMvp() {
  const [screen, setScreen] = useState<Screen>("morning");
  const [morningReflection, setMorningReflection] = useState("");
  const [eveningReflection, setEveningReflection] = useState("");

  const title = useMemo(() => {
    if (screen === "candle") return "Breathe";
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
          <MorningScreen value={morningReflection} onChange={setMorningReflection} onBreathe={() => setScreen("candle")} />
        )}
        {screen === "candle" && <CandleScreen onEvening={() => setScreen("evening")} />}
        {screen === "evening" && (
          <EveningScreen
            morningReflection={morningReflection}
            value={eveningReflection}
            onChange={setEveningReflection}
            onBreathe={() => setScreen("candle")}
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
          Use the candle for one breath. Inhale while it glows. Exhale and blow it out.
        </AppText>
        <Button onPress={onBreathe}>Open the candle</Button>
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
          Blow out the candle
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

function CandleScreen({ onEvening }: { onEvening: () => void }) {
  const [flame] = useState(() => new Animated.Value(1));
  const [blownOut, setBlownOut] = useState(false);

  useEffect(() => {
    if (blownOut) return;
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(flame, {
          toValue: 1.12,
          duration: 2200,
          useNativeDriver: true,
        }),
        Animated.timing(flame, {
          toValue: 0.92,
          duration: 2200,
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [blownOut, flame]);

  const blowOut = () => {
    setBlownOut(true);
    Animated.timing(flame, {
      toValue: 0,
      duration: 700,
      useNativeDriver: true,
    }).start();
  };

  const relight = () => {
    setBlownOut(false);
    flame.setValue(1);
  };

  return (
    <>
      <LinearGradient
        colors={["#274d42", "#2f6f5e", "#3d8571"]}
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
            One candle breath
          </AppText>
          <AppText variant="headline" color="#ffffff" style={{ textAlign: "center" }}>
            Inhale. Then let it go.
          </AppText>
          <AppText color="rgba(255,255,255,0.78)" style={{ textAlign: "center" }}>
            Breathe in while the flame moves. Exhale slowly and tap the flame to blow it out.
          </AppText>
        </View>

        <Pressable accessibilityRole="button" accessibilityLabel="Blow out candle" onPress={blowOut} style={{ alignItems: "center" }}>
          <View style={{ alignItems: "center", height: 260, justifyContent: "flex-end", width: 190 }}>
            <Animated.View
              style={{
                opacity: flame,
                transform: [{ scale: flame }],
              }}
            >
              <LinearGradient
                colors={["#fff7bd", "#f3b562", "#c96b3f"]}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                style={{
                  borderBottomLeftRadius: 34,
                  borderBottomRightRadius: 34,
                  borderTopLeftRadius: 42,
                  borderTopRightRadius: 42,
                  height: 102,
                  marginBottom: -8,
                  transform: [{ rotate: "-7deg" }],
                  width: 62,
                }}
              />
            </Animated.View>
            <View
              style={{
                backgroundColor: "#fffdf8",
                borderColor: "rgba(255,255,255,0.5)",
                borderRadius: 22,
                borderWidth: 1,
                height: 154,
                width: 92,
              }}
            />
            <View
              style={{
                backgroundColor: "rgba(20, 35, 31, 0.22)",
                borderRadius: radii.pill,
                height: 18,
                marginTop: -8,
                width: 124,
              }}
            />
          </View>
        </Pressable>

        <View style={{ alignSelf: "stretch", gap: spacing.md }}>
          <Button variant="secondary" onPress={blownOut ? relight : blowOut} style={{ backgroundColor: "rgba(255,255,255,0.18)" }} textStyle={{ color: "#ffffff" }}>
            {blownOut ? "Light it again" : "Blow it out"}
          </Button>
          <Button variant="ghost" onPress={onEvening} textStyle={{ color: "rgba(255,255,255,0.86)" }}>
            Go to evening reflection
          </Button>
        </View>
      </LinearGradient>

      <Card tone="well" style={{ gap: spacing.sm }}>
        <AppText variant="bodyStrong">Use it anytime.</AppText>
        <AppText color={colors.inkSoft}>A candle is simple on purpose. It gives your body one clear job: slow the exhale.</AppText>
      </Card>
    </>
  );
}

function TabBar({ screen, onChange }: { screen: Screen; onChange: (screen: Screen) => void }) {
  const tabs: { label: string; screen: Screen }[] = [
    { label: "Morning", screen: "morning" },
    { label: "Candle", screen: "candle" },
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
