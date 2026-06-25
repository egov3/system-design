import type { TLanguage } from "~interfaces/common";

export type TSearchQualityRatingValue = 1 | 2 | 3 | 4 | 5;
export type TSearchQualityRatingKey =
  | "angry"
  | "frowning"
  | "neutral"
  | "smile"
  | "smileFace";

export interface IQualityFeedbackProps {
  isSuccessMode?: boolean;
  lang: TLanguage;
  onLowRating?: (rating: TSearchQualityRatingValue) => void;
  onReset?: () => void;
  onSubmitRating?: (rating: TSearchQualityRatingValue) => void;
  submitButtonText?: string;
  subtitle?: string;
  title?: string;
}
