import type { ReactElement, SVGProps } from "react";

export type TStatusStepState =
  | "completed"
  | "current"
  | "pending"
  | "error"
  | "default";

export type TStatusStepIcon = ReactElement<SVGProps<SVGSVGElement>>;

export interface IStatusStepItem {
  id: string;
  icon?: TStatusStepIcon;
  title: string;
  subtitle?: string;
  state: TStatusStepState;
  variant?: "dot" | "circle";
}

export interface IStatusStepperProps {
  steps: IStatusStepItem[];
  className?: string;
  "aria-label"?: string;
  isPresale: boolean;
}
