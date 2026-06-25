import type { TLanguage } from "~interfaces/common";

export interface IQualityFeedbackReasonProps {
  description?: string;
  initialComment?: string;
  lang: TLanguage;
  title?: string;
}
