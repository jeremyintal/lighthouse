// Steady UI kit — shared screen chrome + demo data. Business logic only; all
// styling stays inline in the components. Imported by the UI kit DC via x-import.
import React from "react";
import { SOSButton } from "../../components/steady/SOSButton.jsx";
import { BreatherOrb } from "../../components/steady/BreatherOrb.jsx";
import { ScriptCard } from "../../components/steady/ScriptCard.jsx";
import { CheckInRow } from "../../components/steady/CheckInRow.jsx";
import { MomentDots } from "../../components/steady/MomentDots.jsx";
import { Button } from "../../components/actions/Button.jsx";
import { Chip } from "../../components/actions/Chip.jsx";
import { Card } from "../../components/surfaces/Card.jsx";
import { Badge } from "../../components/surfaces/Badge.jsx";
import { Input } from "../../components/forms/Input.jsx";
import { Switch } from "../../components/forms/Switch.jsx";
import { IconButton } from "../../components/actions/IconButton.jsx";
import { Icon } from "../../components/steady/Icon.jsx";

const PHONE_W = 360;
const PHONE_H = 760;

function Phone({ title, theme = "light", pad = true, footer, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
      <span style={{ fontFamily: "var(--font-ui)", fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--ink-soft)" }}>{title}</span>
      <div
        data-theme={theme === "dark" ? "dark" : undefined}
        data-screen-label={title}
        style={{
          position: "relative",
          width: PHONE_W,
          height: PHONE_H,
          background: "var(--surface-app)",
          borderRadius: 40,
          border: "10px solid #12100d",
          boxShadow: "var(--shadow-raised)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ height: 44, flex: "none", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 22px", fontFamily: "var(--font-ui)", fontSize: 13, fontWeight: 600, color: "var(--text-body)" }}>
          <span>9:41</span>
          <span style={{ width: 90, height: 22, background: "#12100d", borderRadius: 999, position: "absolute", left: "50%", transform: "translateX(-50%)", top: 10 }} />
          <span style={{ display: "flex", gap: 5, alignItems: "center" }}><Icon name="signal" size={15} /><Icon name="battery-medium" size={17} /></span>
        </div>
        <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column", padding: pad ? "4px 24px 0" : 0, position: "relative" }}>
          {children}
        </div>
        {footer && <div style={{ flex: "none", padding: "12px 24px 26px" }}>{footer}</div>}
      </div>
    </div>
  );
}

// ---- Screens ---------------------------------------------------------------

function HomeScreen() {
  return (
    <Phone title="Home · SOS">
      <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <div style={{ paddingTop: 12 }}>
          <div style={{ fontFamily: "var(--font-ui)", fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-accent)" }}>Wednesday evening</div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 30, lineHeight: "37px", fontWeight: 560, color: "var(--text-body)", marginTop: 6 }}>You're not failing. This is a hard age.</div>
        </div>
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <SOSButton />
        </div>
        <Card tone="well" elevated={false} padding={16} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <Icon name="life-buoy" size={20} color="var(--text-soft)" />
          <span style={{ flex: 1, fontFamily: "var(--font-ui)", fontSize: 13, color: "var(--text-soft)" }}>In crisis? Reach a real person now.</span>
          <Icon name="chevron-right" size={18} color="var(--text-faint)" />
        </Card>
      </div>
    </Phone>
  );
}

function BreatherScreen() {
  return (
    <Phone title="Breather" theme="dark" pad={false}
      footer={<Button variant="secondary" style={{ background: "rgba(255,255,255,0.16)", color: "#fff" }}>Skip to the script</Button>}>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg, #274d42, #2f6f5e 70%, #3d8571)" }} />
      <div style={{ position: "relative", flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 40, padding: 24 }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: "var(--font-ui)", fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)" }}>60 seconds</div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 24, color: "#fff", marginTop: 6 }}>Let's slow it down together.</div>
        </div>
        <BreatherOrb size={230} />
      </div>
    </Phone>
  );
}

function ScriptScreen() {
  return (
    <Phone title="Script" footer={<Button>That helped</Button>}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 8, marginBottom: 16 }}>
        <IconButton icon="chevron-left" label="Back" size={44} />
        <span style={{ fontFamily: "var(--font-ui)", fontSize: 15, fontWeight: 600, color: "var(--text-body)" }}>Right now</span>
        <IconButton icon="x" label="Close" size={44} />
      </div>
      <ScriptCard
        situation="When they hit or throw"
        say={["Get low. Say less.", "“I'm right here. I won't let you hit.”"]}
        doLine="Block the hit with a calm hand and name it once."
        dontLine="Don't explain the rule mid-storm — save teaching for later."
        free
      />
      <div style={{ marginTop: 16, display: "flex", gap: 8, flexWrap: "wrap" }}>
        <Chip selected>Hitting</Chip>
        <Chip>Bedtime</Chip>
        <Chip>Mealtime</Chip>
        <Chip>Leaving</Chip>
      </div>
    </Phone>
  );
}

function CheckInScreen() {
  const [feeling, setFeeling] = React.useState("Steadier");
  return (
    <Phone title="Check-in" footer={<div style={{ display: "flex", flexDirection: "column", gap: 10 }}><Button variant="repair">Read: after you yell</Button><Button variant="ghost" fullWidth>Not now</Button></div>}>
      <div style={{ display: "flex", flexDirection: "column", height: "100%", paddingTop: 12 }}>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 26, lineHeight: "33px", fontWeight: 540, color: "var(--text-body)" }}>That counts.</div>
        <div style={{ fontFamily: "var(--font-ui)", fontSize: 17, lineHeight: "26px", color: "var(--text-soft)", marginTop: 8 }}>You showed up for the hard 90 seconds. That's the whole thing.</div>
        <div style={{ flex: 1 }} />
        <Card tone="surface" style={{ marginBottom: 8 }}>
          <CheckInRow value={feeling} onSelect={setFeeling} />
        </Card>
      </div>
    </Phone>
  );
}

function ProgressScreen() {
  const days = ["quiet","used","hard","used","used","quiet","hard","used","quiet","used","used","hard","quiet","used","used","quiet","used","hard","used","used","quiet","used","used","quiet","hard","used","used","quiet"];
  return (
    <Phone title="This month">
      <div style={{ paddingTop: 12, display: "flex", flexDirection: "column", gap: 16, overflowY: "auto" }}>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 26, lineHeight: "33px", fontWeight: 540, color: "var(--text-body)" }}>You've been steadier than it feels.</div>
        <Card tone="surface">
          <MomentDots days={days} caption="14 hard moments this month; you used a breather in 9. That counts." />
        </Card>
        <Card tone="accent" elevated={false}>
          <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
            <Icon name="wind" size={22} color="var(--accent-strong)" />
            <div>
              <div style={{ fontFamily: "var(--font-ui)", fontSize: 15, fontWeight: 600, color: "var(--text-body)" }}>Your breather is working</div>
              <div style={{ fontFamily: "var(--font-ui)", fontSize: 14, lineHeight: "21px", color: "var(--text-soft)", marginTop: 2 }}>On breather days, you logged fewer rough ones. No pressure — just here when you need it.</div>
            </div>
          </div>
        </Card>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <Badge tone="free">Repair scripts always free</Badge>
        </div>
      </div>
    </Phone>
  );
}

function OnboardingScreen() {
  return (
    <Phone title="Welcome" footer={<div style={{ display: "flex", flexDirection: "column", gap: 10 }}><Button>Start with a breather</Button><Button variant="ghost" fullWidth>Not now — stay anonymous</Button></div>}>
      <div style={{ display: "flex", flexDirection: "column", height: "100%", paddingTop: 16 }}>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 34, lineHeight: "42px", fontWeight: 560, color: "var(--text-body)" }}>Steady</div>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 22, lineHeight: "32px", color: "var(--text-soft)", marginTop: 10 }}>For the moment you're about to lose it.</div>
        <div style={{ flex: 1 }} />
        <Card tone="well" elevated={false} padding={16} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 8 }}>
          <Icon name="shield" size={20} color="var(--text-accent)" />
          <span style={{ fontFamily: "var(--font-ui)", fontSize: 14, lineHeight: "21px", color: "var(--text-soft)" }}>We never collect anything about your child. Your moments are yours.</span>
        </Card>
      </div>
    </Phone>
  );
}

function SettingsScreen() {
  const [dark, setDark] = React.useState(false);
  const [haptics, setHaptics] = React.useState(true);
  const [anon, setAnon] = React.useState(true);
  return (
    <Phone title="Settings">
      <div style={{ paddingTop: 12, display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 540, color: "var(--text-body)" }}>Settings</div>
        <Card tone="surface" style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <Switch label="Bedtime theme" description="Dim, warm colors after dark" checked={dark} onChange={setDark} />
          <div style={{ height: 1, background: "var(--border-hairline)" }} />
          <Switch label="Haptic breather" description="Gentle buzz to pace your breath" checked={haptics} onChange={setHaptics} />
          <div style={{ height: 1, background: "var(--border-hairline)" }} />
          <Switch label="Stay anonymous" description="No account, nothing shared" checked={anon} onChange={setAnon} />
        </Card>
        <Card tone="surface" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Input label="Email (optional)" type="email" placeholder="you@example.com" helper="Only to save progress across devices." />
        </Card>
      </div>
    </Phone>
  );
}

export function UIKit() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 48, padding: 48, justifyContent: "center", alignItems: "flex-start", background: "var(--paper)", minHeight: "100vh" }}>
      <OnboardingScreen />
      <HomeScreen />
      <BreatherScreen />
      <ScriptScreen />
      <CheckInScreen />
      <ProgressScreen />
      <SettingsScreen />
    </div>
  );
}
