import type { TLanguage } from "~interfaces/common";

export interface IQualityFeedbackProps {
  lang: TLanguage;
  onSubmitRating?: () => void;
  submitButtonText?: string;
  subtitle?: string;
  title?: string;
}
