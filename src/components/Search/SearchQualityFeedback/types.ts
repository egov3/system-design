import type { ILangProps } from "~interfaces/common";

export type TSearchQualityRatingValue = 1 | 2 | 3 | 4 | 5;

export type TSearchQualityRatingKey =
  | "angry"
  | "frowning"
  | "neutral"
  | "smile"
  | "smileFace";

export interface ISearchQualityFeedbackProps extends ILangProps {
  onLowRating: (rating: TSearchQualityRatingValue) => void;
  onSubmitRating?: (rating: TSearchQualityRatingValue) => void;
}
