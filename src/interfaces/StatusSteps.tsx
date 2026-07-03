import type { ReactNode } from "react";

export type TStatusStepState = "completed" | "current" | "pending";

export interface IStatusStepItem {
  id?: string;
  icon?: ReactNode;
  title: string;
  subtitle?: string;
  state: TStatusStepState;
  completedVariant?: "dot" | "check";
}

export interface IStatusStepsProps {
  steps: IStatusStepItem[];
  className?: string;
  "aria-label"?: string;
}
