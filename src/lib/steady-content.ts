export type SituationKey = "tantrum" | "hitting" | "refusal" | "bedtime" | "public";

export type Script = {
  key: SituationKey;
  label: string;
  situation: string;
  say: string[];
  doLine: string;
  dontLine: string;
};

export const dailyAffirmation = {
  overline: "Morning steadiness",
  title: "You can begin again today.",
  body:
    "You do not have to be a perfect parent. Be present enough to pause, humble enough to repair, and loving enough to try again.",
  prompt: "What is one ordinary thing about your child you want to notice today?",
};

export const scripts: Script[] = [
  {
    key: "tantrum",
    label: "Tantrum",
    situation: "When the storm is loud",
    say: ["Get low. Say less.", "\"I'm right here. You're safe. I won't rush you.\""],
    doLine: "Move close enough to be steady and far enough to stay calm.",
    dontLine: "Don't teach the lesson mid-storm. Save words for after.",
  },
  {
    key: "hitting",
    label: "Hitting",
    situation: "When they hit or throw",
    say: ["Block gently.", "\"I won't let you hit. I'm here with you.\""],
    doLine: "Put your body between the hit and the target. Keep your voice low.",
    dontLine: "Don't ask why right now. Their brain is not ready to explain.",
  },
  {
    key: "refusal",
    label: "Refusal",
    situation: "When they refuse",
    say: ["Offer two true choices.", "\"Shoes first or jacket first. You choose.\""],
    doLine: "Make the next step smaller than you think it needs to be.",
    dontLine: "Don't turn the whole day into a debate. Hold the boundary kindly.",
  },
  {
    key: "bedtime",
    label: "Bedtime",
    situation: "When bedtime unravels",
    say: ["Slow your body first.", "\"Bedtime is hard tonight. I'm staying close.\""],
    doLine: "Repeat the same sentence and the same next step.",
    dontLine: "Don't add new negotiations after the routine has started.",
  },
  {
    key: "public",
    label: "Public",
    situation: "When everyone is watching",
    say: ["Lower your voice.", "\"We're having a hard moment. I've got you.\""],
    doLine: "Turn your body toward your child and away from the crowd.",
    dontLine: "Don't parent for the audience. Parent for the child in front of you.",
  },
];

export const repairScript = {
  situation: "After you yell",
  say: ["Get close when you're calm.", "\"I yelled. That was scary. You did not deserve that.\""],
  doLine: "Name what happened and say what you will try next time.",
  dontLine: "Don't make your child comfort you. Keep the repair simple.",
};

export const progressDays = [
  "quiet",
  "used",
  "hard",
  "used",
  "used",
  "quiet",
  "hard",
  "used",
  "quiet",
  "used",
  "used",
  "hard",
  "quiet",
  "used",
  "used",
  "quiet",
  "used",
  "hard",
  "used",
  "used",
  "quiet",
  "used",
  "used",
  "quiet",
  "hard",
  "used",
  "used",
  "quiet",
] as const;
