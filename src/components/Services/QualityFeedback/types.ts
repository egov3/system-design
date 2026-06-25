import type { ILangProps } from "~interfaces/common";

export type TSearchQualityRatingValue = 1 | 2 | 3 | 4 | 5;

export type TSearchQualityRatingKey =
  | "angry"
  | "frowning"
  | "neutral"
  | "smile"
  | "smileFace";

export interface IQualityFeedbackProps extends ILangProps {
  isSuccessMode?: boolean;
  onLowRating: (rating: TSearchQualityRatingValue) => void;
  onReset?: () => void;
  onSubmitRating?: (rating: TSearchQualityRatingValue) => void;
  submitButtonText?: string;
  subtitle?: string;
  successButtonText?: string;
  successSubtitle?: string;
  successTitle?: string;
  title?: string;
}
