import { Icons } from "@egov3/graphics";
import { useState } from "react";
import { Button, TextPair, Tooltip } from "~baseComponents";
import { i18n } from "~constants/i18n";
import { joinClasses } from "~utils/joinClasses";
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
  isSuccessMode = false,
  lang,
  onLowRating,
  onReset,
  onSubmitRating,
  submitButtonText,
  subtitle,
  successButtonText,
  successSubtitle,
  successTitle,
  title,
}: IQualityFeedbackProps) => {
  const langDic = i18n.QualityFeedback;
  const defaultTitle = title ?? langDic.title[lang];
  const defaultSubtitle = subtitle ?? langDic.subtitle[lang];
  const defaultButtonText = submitButtonText ?? langDic.submitRating[lang];
  const thanksTitle = successTitle ?? langDic.thanksTitle[lang];
  const thanksSubtitle = successSubtitle ?? langDic.thanksSubtitle[lang];
  const resetButtonText = successButtonText ?? langDic.reevaluate[lang];
  const [selectedRating, setSelectedRating] =
    useState<TSearchQualityRatingValue | null>(DEFAULT_RATING);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    if (selectedRating) {
      onSubmitRating?.(selectedRating);

      if (selectedRating <= 2) {
        onLowRating(selectedRating);
        return;
      }

      setIsSubmitted(true);
    }
  };

  const handleRatingSelect = (rating: TSearchQualityRatingValue) => {
    setSelectedRating(rating);
  };

  const handleReset = () => {
    setSelectedRating(DEFAULT_RATING);
    setIsSubmitted(false);
    onReset?.();
  };

  if (isSubmitted || isSuccessMode) {
    return (
      <div className={styles.footer} data-testid="QualityFeedback_THANKS">
        <div className={styles.content}>
          <TextPair mainText={thanksTitle} secondaryText={thanksSubtitle} />
          <span className={styles.thumb} data-testid="QualityFeedback_THUMB">
            <Icons.General.FeedbackLikeIcon
              data-testid="QualityFeedback_LIKE_ICON"
              height={36}
              width={36}
            />
          </span>
        </div>
        <Button
          aria-label={resetButtonText}
          className={styles.feedbackButton}
          data-testid="QualityFeedback_RESET_BUTTON"
          onClick={handleReset}
        >
          {resetButtonText}
        </Button>
      </div>
    );
  }

  return (
    <div className={styles.footer} data-testid="QualityFeedback_WRAP">
      <div className={styles.content}>
        <TextPair mainText={defaultTitle} secondaryText={defaultSubtitle} />
        <div
          className={styles.ratingList}
          data-testid="QualityFeedback_RATING_LIST"
        >
          {ratings.map((rating) => (
            <Tooltip
              className={joinClasses(
                styles.ratingTooltipWrap,
                selectedRating === rating.value && styles.ratingTooltipActive,
              )}
              dataTestid="QualityFeedbackRating_TOOLTIP"
              key={rating.value}
              text={langDic.ratingTooltipLabels[rating.label][lang]}
            >
              <button
                aria-label={langDic.ratingLabels[rating.label][lang]}
                aria-pressed={selectedRating === rating.value}
                className={styles.ratingButton}
                data-rating={rating.label}
                data-selected={selectedRating === rating.value}
                data-testid={`QualityFeedback_RATING_${rating.value}`}
                onClick={() => {
                  handleRatingSelect(rating.value);
                }}
                type="button"
              >
                <RatingIcon
                  dataTestid="QualityFeedbackRating_ICON"
                  value={rating.value}
                />
              </button>
            </Tooltip>
          ))}
        </div>
      </div>
      <Button
        aria-label={defaultButtonText}
        className={styles.feedbackButton}
        data-testid="QualityFeedback_SUBMIT_BUTTON"
        onClick={handleSubmit}
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
