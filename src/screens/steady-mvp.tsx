import { LinearGradient } from "expo-linear-gradient";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, TextInput, View } from "react-native";
import {
  AppText,
  BreatherOrb,
  Button,
  Card,
  Chip,
  ProgressDots,
  SOSButton,
} from "@/components/steady-primitives";
import { dailyAffirmation, progressDays, repairScript, scripts, type Script } from "@/lib/steady-content";
import { colors, radii, shadows, spacing } from "@/lib/steady-tokens";

type Screen = "home" | "breather" | "script" | "checkin" | "progress" | "settings";
type Feeling = "steadier" | "same" | "rough";

export function SteadyMvp() {
  const [screen, setScreen] = useState<Screen>("home");
  const [selectedScript, setSelectedScript] = useState<Script>(scripts[0]);
  const [feeling, setFeeling] = useState<Feeling>("steadier");
  const [ritualNote, setRitualNote] = useState("");
  const [momentsHandled, setMomentsHandled] = useState(9);
  const [bedtimeTheme, setBedtimeTheme] = useState(false);
  const [anonymous, setAnonymous] = useState(true);

  const activeTitle = useMemo(() => {
    if (screen === "breather") return "Breather";
    if (screen === "script") return "Right now";
    if (screen === "checkin") return "Check-in";
    if (screen === "progress") return "This month";
    if (screen === "settings") return "Settings";
    return "Steady";
  }, [screen]);

  const background = bedtimeTheme ? "#211f1b" : colors.paper;

  const startScript = (script: Script) => {
    setSelectedScript(script);
    setScreen("script");
  };

  const completeCheckIn = () => {
    setMomentsHandled((current) => current + 1);
    setScreen("progress");
  };

  return (
    <View style={{ flex: 1, backgroundColor: background }}>
      {screen === "breather" ? (
        <BreatherScreen onSkip={() => setScreen("script")} onDone={() => setScreen("script")} />
      ) : (
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={{
            gap: spacing.xl,
            paddingBottom: 110,
            paddingHorizontal: spacing.xl,
            paddingTop: 62,
          }}
        >
          <Header title={activeTitle} bedtimeTheme={bedtimeTheme} />
          {screen === "home" && (
            <HomeScreen
              ritualNote={ritualNote}
              onChangeRitualNote={setRitualNote}
              onSos={() => setScreen("breather")}
              onScript={startScript}
              momentsHandled={momentsHandled}
              onProgress={() => setScreen("progress")}
            />
          )}
          {screen === "script" && (
            <ScriptScreen
              selectedScript={selectedScript}
              onSelect={setSelectedScript}
              onHelped={() => setScreen("checkin")}
              onRepair={() => {
                setSelectedScript({ key: "tantrum", label: "Repair", ...repairScript });
                setScreen("script");
              }}
            />
          )}
          {screen === "checkin" && (
            <CheckInScreen feeling={feeling} onFeeling={setFeeling} onDone={completeCheckIn} />
          )}
          {screen === "progress" && <ProgressScreen momentsHandled={momentsHandled} onSos={() => setScreen("breather")} />}
          {screen === "settings" && (
            <SettingsScreen
              bedtimeTheme={bedtimeTheme}
              onBedtimeTheme={setBedtimeTheme}
              anonymous={anonymous}
              onAnonymous={setAnonymous}
            />
          )}
        </ScrollView>
      )}
      {screen !== "breather" && <TabBar screen={screen} onChange={setScreen} />}
    </View>
  );
}

function Header({ title, bedtimeTheme }: { title: string; bedtimeTheme: boolean }) {
  return (
    <View style={{ gap: spacing.sm }}>
      <AppText variant="overline" color={bedtimeTheme ? "#b9cbc5" : colors.accentStrong}>
        Tuesday morning
      </AppText>
      <AppText variant="display" color={bedtimeTheme ? "#f6f2ea" : colors.ink}>
        {title}
      </AppText>
    </View>
  );
}

function HomeScreen({
  ritualNote,
  onChangeRitualNote,
  onSos,
  onScript,
  momentsHandled,
  onProgress,
}: {
  ritualNote: string;
  onChangeRitualNote: (value: string) => void;
  onSos: () => void;
  onScript: (script: Script) => void;
  momentsHandled: number;
  onProgress: () => void;
}) {
  return (
    <>
      <Card tone="accent" style={{ gap: spacing.lg }}>
        <View style={{ gap: spacing.sm }}>
          <AppText variant="overline" color={colors.accentStrong}>
            {dailyAffirmation.overline}
          </AppText>
          <AppText variant="headline">{dailyAffirmation.title}</AppText>
          <AppText color={colors.inkSoft}>{dailyAffirmation.body}</AppText>
        </View>
        <View style={{ gap: spacing.sm }}>
          <AppText variant="bodyStrong">{dailyAffirmation.prompt}</AppText>
          <TextInput
            accessibilityLabel="Daily reflection"
            multiline
            onChangeText={onChangeRitualNote}
            placeholder="A tiny thing is enough."
            placeholderTextColor={colors.inkFaint}
            style={{
              backgroundColor: colors.surface,
              borderColor: colors.line,
              borderCurve: "continuous",
              borderRadius: radii.md,
              borderWidth: 1,
              color: colors.ink,
              fontSize: 17,
              lineHeight: 24,
              minHeight: 92,
              padding: spacing.lg,
              textAlignVertical: "top",
            }}
            value={ritualNote}
          />
        </View>
      </Card>

      <View style={{ alignItems: "center", paddingVertical: spacing.lg }}>
        <SOSButton onPress={onSos} />
      </View>

      <Card tone="surface" style={{ gap: spacing.md }}>
        <AppText variant="bodyStrong">Start with a common moment</AppText>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.sm }}>
          {scripts.map((script) => (
            <Chip key={script.key} label={script.label} onPress={() => onScript(script)} />
          ))}
        </View>
      </Card>

      <Pressable accessibilityRole="button" onPress={onProgress}>
        <Card tone="well" style={{ gap: spacing.sm }}>
          <AppText variant="bodyStrong">This month</AppText>
          <AppText color={colors.inkSoft}>
            {momentsHandled} hard moments handled with a breather. No streaks. Just evidence that you keep coming back.
          </AppText>
        </Card>
      </Pressable>
    </>
  );
}

function BreatherScreen({ onSkip, onDone }: { onSkip: () => void; onDone: () => void }) {
  return (
    <LinearGradient colors={["#274d42", "#2f6f5e", "#3d8571"]} style={{ flex: 1 }}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{
          alignItems: "center",
          flexGrow: 1,
          justifyContent: "space-between",
          paddingBottom: 42,
          paddingHorizontal: spacing.xl,
          paddingTop: 82,
        }}
      >
        <View style={{ alignItems: "center", gap: spacing.sm }}>
          <AppText variant="overline" color="rgba(255,255,255,0.74)">
            60 seconds
          </AppText>
          <AppText variant="headline" color="#ffffff" style={{ textAlign: "center" }}>
            {"Let's slow it down together."}
          </AppText>
          <AppText color="rgba(255,255,255,0.8)" style={{ textAlign: "center" }}>
            Inhale while it grows. Exhale while it settles.
          </AppText>
        </View>

        <BreatherOrb />

        <View style={{ alignSelf: "stretch", gap: spacing.md }}>
          <Button variant="secondary" onPress={onDone} style={{ backgroundColor: "rgba(255,255,255,0.18)" }} textStyle={{ color: "#ffffff" }}>
            {"I'm ready for a script"}
          </Button>
          <Button variant="ghost" onPress={onSkip} textStyle={{ color: "rgba(255,255,255,0.86)" }}>
            Skip to the script
          </Button>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

function ScriptScreen({
  selectedScript,
  onSelect,
  onHelped,
  onRepair,
}: {
  selectedScript: Script;
  onSelect: (script: Script) => void;
  onHelped: () => void;
  onRepair: () => void;
}) {
  return (
    <>
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.sm }}>
        {scripts.map((script) => (
          <Chip
            key={script.key}
            label={script.label}
            selected={script.key === selectedScript.key}
            onPress={() => onSelect(script)}
          />
        ))}
      </View>

      <Card tone="surface" style={{ gap: spacing.xl }}>
        <View style={{ gap: spacing.sm }}>
          <AppText variant="overline" color={colors.accentStrong}>
            {selectedScript.situation}
          </AppText>
          {selectedScript.say.map((line) => (
            <AppText key={line} variant="title">
              {line}
            </AppText>
          ))}
        </View>

        <View style={{ gap: spacing.md }}>
          <Card tone="accent" style={{ gap: spacing.xs, padding: spacing.lg }}>
            <AppText variant="overline" color={colors.accentStrong}>
              Do
            </AppText>
            <AppText>{selectedScript.doLine}</AppText>
          </Card>
          <Card tone="well" style={{ gap: spacing.xs, padding: spacing.lg }}>
            <AppText variant="overline" color={colors.inkSoft}>
              {"Don't"}
            </AppText>
            <AppText color={colors.inkSoft}>{selectedScript.dontLine}</AppText>
          </Card>
        </View>
      </Card>

      <View style={{ gap: spacing.md }}>
        <Button onPress={onHelped}>That helped</Button>
        <Button variant="repair" onPress={onRepair}>
          I need a repair script
        </Button>
      </View>
    </>
  );
}

function CheckInScreen({
  feeling,
  onFeeling,
  onDone,
}: {
  feeling: Feeling;
  onFeeling: (feeling: Feeling) => void;
  onDone: () => void;
}) {
  return (
    <>
      <Card tone="surface" style={{ gap: spacing.lg }}>
        <AppText variant="headline">That counts.</AppText>
        <AppText color={colors.inkSoft}>
          You showed up for the hard 90 seconds. That is the whole thing.
        </AppText>
        <View style={{ flexDirection: "row", gap: spacing.sm }}>
          <Chip label="Steadier" selected={feeling === "steadier"} onPress={() => onFeeling("steadier")} />
          <Chip label="Same" selected={feeling === "same"} onPress={() => onFeeling("same")} />
          <Chip label="Rough" selected={feeling === "rough"} onPress={() => onFeeling("rough")} />
        </View>
      </Card>
      <Card tone="repair" style={{ gap: spacing.sm }}>
        <AppText variant="bodyStrong">Repair stays free.</AppText>
        <AppText color={colors.inkSoft}>If you yelled, snapped, or got louder than you wanted, there is still a next right move.</AppText>
      </Card>
      <Button onPress={onDone}>Save this moment</Button>
    </>
  );
}

function ProgressScreen({ momentsHandled, onSos }: { momentsHandled: number; onSos: () => void }) {
  return (
    <>
      <Card tone="surface" style={{ gap: spacing.lg }}>
        <AppText variant="headline">{"You've been steadier than it feels."}</AppText>
        <ProgressDots days={progressDays} />
        <AppText color={colors.inkSoft}>
          14 hard moments this month; you used a breather in {momentsHandled}. That counts.
        </AppText>
      </Card>
      <Card tone="accent" style={{ gap: spacing.sm }}>
        <AppText variant="bodyStrong">Your breather is working.</AppText>
        <AppText color={colors.inkSoft}>On breather days, you logged fewer rough ones. No pressure. Just here when you need it.</AppText>
      </Card>
      <Button onPress={onSos}>Use the SOS button</Button>
    </>
  );
}

function SettingsScreen({
  bedtimeTheme,
  onBedtimeTheme,
  anonymous,
  onAnonymous,
}: {
  bedtimeTheme: boolean;
  onBedtimeTheme: (value: boolean) => void;
  anonymous: boolean;
  onAnonymous: (value: boolean) => void;
}) {
  return (
    <>
      <Card tone="surface" style={{ gap: spacing.lg }}>
        <SettingsRow
          title="Bedtime theme"
          body="Dim, warm colors for late-night moments."
          active={bedtimeTheme}
          onPress={() => onBedtimeTheme(!bedtimeTheme)}
        />
        <SettingsDivider />
        <SettingsRow
          title="Stay anonymous"
          body="No account required for the MVP."
          active={anonymous}
          onPress={() => onAnonymous(!anonymous)}
        />
      </Card>
      <Card tone="well" style={{ gap: spacing.sm }}>
        <AppText variant="bodyStrong">Privacy promise</AppText>
        <AppText color={colors.inkSoft}>We never collect anything about your child. Your moments are yours.</AppText>
      </Card>
      <Card tone="danger" style={{ gap: spacing.sm }}>
        <AppText variant="bodyStrong">In crisis?</AppText>
        <AppText color={colors.inkSoft}>This app is not therapy. If someone may be hurt, reach a real person now.</AppText>
      </Card>
    </>
  );
}

function SettingsRow({
  title,
  body,
  active,
  onPress,
}: {
  title: string;
  body: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityState={{ checked: active }}
      onPress={onPress}
      style={{ alignItems: "center", flexDirection: "row", gap: spacing.lg, minHeight: 56 }}
    >
      <View style={{ flex: 1, gap: spacing.xs }}>
        <AppText variant="bodyStrong">{title}</AppText>
        <AppText variant="small" color={colors.inkSoft}>
          {body}
        </AppText>
      </View>
      <View
        style={{
          alignItems: active ? "flex-end" : "flex-start",
          backgroundColor: active ? colors.accent : colors.lineStrong,
          borderRadius: radii.pill,
          height: 32,
          justifyContent: "center",
          padding: 3,
          width: 54,
        }}
      >
        <View style={{ backgroundColor: "#ffffff", borderRadius: radii.pill, height: 26, width: 26 }} />
      </View>
    </Pressable>
  );
}

function SettingsDivider() {
  return <View style={{ backgroundColor: colors.line, height: 1 }} />;
}

function TabBar({ screen, onChange }: { screen: Screen; onChange: (screen: Screen) => void }) {
  const tabs: { label: string; screen: Screen }[] = [
    { label: "Home", screen: "home" },
    { label: "SOS", screen: "breather" },
    { label: "Progress", screen: "progress" },
    { label: "Settings", screen: "settings" },
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
        const active = tab.screen === screen || (tab.screen === "home" && screen === "script");
        return (
          <Pressable
            accessibilityRole="button"
            accessibilityState={{ selected: active }}
            key={tab.label}
            onPress={() => onChange(tab.screen)}
            style={({ pressed }) => ({
              alignItems: "center",
              backgroundColor: active ? colors.accent : colors.surface,
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
