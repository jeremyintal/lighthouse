import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { ReactNode, useEffect, useState } from "react";
import {
  Animated,
  Pressable,
  Text,
  View,
  type PressableProps,
  type TextStyle,
  type ViewStyle,
} from "react-native";
import { colors, radii, shadows, spacing, type } from "@/lib/steady-tokens";

type Tone = "surface" | "well" | "accent" | "repair" | "danger" | "deep";

export function Card({
  children,
  tone = "surface",
  style,
}: {
  children: ReactNode;
  tone?: Tone;
  style?: ViewStyle;
}) {
  const backgroundColor =
    tone === "well"
      ? colors.surfaceWell
      : tone === "accent"
        ? colors.accentFaint
        : tone === "repair"
          ? colors.repairSoft
          : tone === "danger"
            ? colors.dangerSoft
            : tone === "deep"
              ? colors.surfaceDeep
              : colors.surface;

  return (
    <View
      style={[
        {
          backgroundColor,
          borderColor: tone === "surface" ? colors.line : "transparent",
          borderCurve: "continuous",
          borderRadius: radii.lg,
          borderWidth: 1,
          boxShadow: tone === "surface" ? shadows.card : undefined,
          padding: spacing.xl,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

export function AppText({
  children,
  variant = "body",
  color = colors.ink,
  style,
  selectable = true,
}: {
  children: ReactNode;
  variant?: keyof typeof type;
  color?: string;
  style?: TextStyle;
  selectable?: boolean;
}) {
  return (
    <Text selectable={selectable} style={[type[variant], { color }, style]}>
      {children}
    </Text>
  );
}

type ButtonVariant = "primary" | "secondary" | "ghost" | "repair" | "danger";

export function Button({
  children,
  variant = "primary",
  style,
  textStyle,
  onPress,
  ...props
}: PressableProps & {
  children: ReactNode;
  variant?: ButtonVariant;
  style?: ViewStyle;
  textStyle?: TextStyle;
}) {
  const backgroundColor =
    variant === "primary"
      ? colors.accent
      : variant === "repair"
        ? colors.repair
        : variant === "danger"
          ? colors.danger
          : variant === "secondary"
            ? colors.surface
            : "transparent";
  const borderColor = variant === "secondary" ? colors.lineStrong : "transparent";
  const textColor = variant === "primary" || variant === "repair" || variant === "danger" ? "#ffffff" : colors.accentStrong;

  return (
    <Pressable
      accessibilityRole="button"
      onPress={(event) => {
        Haptics.selectionAsync().catch(() => undefined);
        onPress?.(event);
      }}
      style={({ pressed }) => [
        {
          alignItems: "center",
          backgroundColor,
          borderColor,
          borderCurve: "continuous",
          borderRadius: radii.md,
          borderWidth: 1,
          justifyContent: "center",
          minHeight: 54,
          opacity: pressed ? 0.88 : 1,
          paddingHorizontal: spacing.xl,
          transform: [{ scale: pressed ? 0.98 : 1 }],
        },
        style,
      ]}
      {...props}
    >
      <AppText variant="bodyStrong" color={textColor} style={textStyle} selectable={false}>
        {children}
      </AppText>
    </Pressable>
  );
}

export function Chip({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected?: boolean;
  onPress?: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={() => {
        Haptics.selectionAsync().catch(() => undefined);
        onPress?.();
      }}
      style={({ pressed }) => ({
        backgroundColor: selected ? colors.accent : colors.surface,
        borderColor: selected ? colors.accent : colors.line,
        borderRadius: radii.pill,
        borderWidth: 1,
        minHeight: 44,
        opacity: pressed ? 0.86 : 1,
        paddingHorizontal: spacing.lg,
        justifyContent: "center",
      })}
    >
      <AppText variant="small" color={selected ? "#ffffff" : colors.inkSoft} selectable={false}>
        {label}
      </AppText>
    </Pressable>
  );
}

export function SOSButton({ onPress }: { onPress: () => void }) {
  const [scale] = useState(() => new Animated.Value(1));

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.05,
          duration: 4000,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [scale]);

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Start SOS"
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => undefined);
          onPress();
        }}
        style={({ pressed }) => ({
          alignItems: "center",
          backgroundColor: colors.accent,
          borderRadius: 116,
          boxShadow: shadows.sos,
          height: 232,
          justifyContent: "center",
          opacity: pressed ? 0.92 : 1,
          width: 232,
        })}
      >
        <AppText variant="overline" color="rgba(255,255,255,0.76)" selectable={false}>
          SOS
        </AppText>
        <AppText
          color="#ffffff"
          selectable={false}
          style={{ fontFamily: "Georgia", fontSize: 34, fontWeight: "600", lineHeight: 42, marginTop: spacing.sm }}
        >
          {"It's happening"}
        </AppText>
        <AppText variant="small" color="rgba(255,255,255,0.82)" selectable={false} style={{ marginTop: spacing.sm }}>
          90 seconds
        </AppText>
      </Pressable>
    </Animated.View>
  );
}

export function BreatherOrb() {
  const [scale] = useState(() => new Animated.Value(0.9));

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.08,
          duration: 4000,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 0.9,
          duration: 4000,
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [scale]);

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <LinearGradient
        colors={["rgba(255,255,255,0.85)", "rgba(255,255,255,0.24)"]}
        start={{ x: 0.2, y: 0.1 }}
        end={{ x: 0.8, y: 1 }}
        style={{
          alignItems: "center",
          borderColor: "rgba(255,255,255,0.36)",
          borderRadius: 118,
          borderWidth: 1,
          height: 236,
          justifyContent: "center",
          width: 236,
        }}
      >
        <View
          style={{
            backgroundColor: "rgba(255,255,255,0.18)",
            borderRadius: 78,
            height: 156,
            width: 156,
          }}
        />
      </LinearGradient>
    </Animated.View>
  );
}

export function ProgressDots({ days }: { days: readonly string[] }) {
  return (
    <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
      {days.map((day, index) => (
        <View
          key={`${day}-${index}`}
          accessibilityLabel={`Day ${index + 1}: ${day}`}
          style={{
            backgroundColor: day === "used" ? colors.accent : day === "hard" ? colors.repair : colors.line,
            borderRadius: radii.pill,
            height: 14,
            opacity: day === "quiet" ? 0.66 : 1,
            width: 14,
          }}
        />
      ))}
    </View>
  );
}
