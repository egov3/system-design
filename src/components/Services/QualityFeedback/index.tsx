import { useState } from "react";
import { Button, TextPair } from "~baseComponents";
import { i18n } from "~constants/i18n";
import styles from "./QualityFeedback.module.css";
import { RatingIcon } from "./RatingIcon";
import type {
  IQualityFeedbackProps,
  TSearchQualityRatingKey,
  TSearchQualityRatingValue,
} from "./types";

const ratings: Array<{
  label: TSearchQualityRatingKey;
  value: TSearchQualityRatingValue;
}> = [
  { value: 1, label: "angry" },
  { value: 2, label: "frowning" },
  { value: 3, label: "neutral" },
  { value: 4, label: "smile" },
  { value: 5, label: "smileFace" },
];

const DEFAULT_RATING: TSearchQualityRatingValue = 5;

export const QualityFeedback = ({
  lang,
  onSubmitRating,
  submitButtonText,
  subtitle,
  title,
}: IQualityFeedbackProps) => {
  const langDic = i18n.QualityFeedback;
  const defaultTitle = title ?? langDic.title[lang];
  const defaultSubtitle = subtitle ?? langDic.subtitle[lang];
  const defaultButtonText = submitButtonText ?? langDic.submitRating[lang];
  const [selectedRating, setSelectedRating] =
    useState<TSearchQualityRatingValue>(DEFAULT_RATING);

  return (
    <div className={styles.footer} data-testid="QualityFeedback_WRAP">
      <div className={styles.content}>
        <TextPair mainText={defaultTitle} secondaryText={defaultSubtitle} />
        <div
          className={styles.ratingList}
          data-testid="QualityFeedback_RATING_LIST"
        >
          {ratings.map((rating) => (
            <button
              aria-label={langDic.ratingLabels[rating.label][lang]}
              aria-pressed={selectedRating === rating.value}
              className={styles.ratingButton}
              data-rating={rating.label}
              data-selected={selectedRating === rating.value}
              data-testid={`QualityFeedback_RATING_${rating.value}`}
              key={rating.value}
              onClick={() => {
                setSelectedRating(rating.value);
              }}
              type="button"
            >
              <RatingIcon
                dataTestid="QualityFeedbackRating_ICON"
                value={rating.value}
              />
            </button>
          ))}
        </div>
      </div>
      <Button
        aria-label={defaultButtonText}
        className={styles.feedbackButton}
        data-testid="QualityFeedback_SUBMIT_BUTTON"
        onClick={() => onSubmitRating?.(selectedRating)}
      >
        {defaultButtonText}
      </Button>
    </div>
  );
};

export type {
  IQualityFeedbackProps,
  TSearchQualityRatingKey,
  TSearchQualityRatingValue,
} from "./types";
