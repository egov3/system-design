import { Icons } from "@egov3/graphics";
import { useState } from "react";
import { Button, TextPair, Tooltip } from "~baseComponents";
import { i18n } from "~constants/i18n";
import { joinClasses } from "~utils/joinClasses";
import { RatingIcon } from "./RatingIcon";
import styles from "./SearchQualityFeedback.module.css";
import type {
  ISearchQualityFeedbackProps,
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

export const SearchQualityFeedback = ({
  lang,
  onLowRating,
  onSubmitRating,
}: ISearchQualityFeedbackProps) => {
  const langDic = i18n.SearchQualityFeedback;
  const [selectedRating, setSelectedRating] =
    useState<TSearchQualityRatingValue | null>(DEFAULT_RATING);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    if (selectedRating) {
      onSubmitRating?.(selectedRating);

      if (selectedRating <= 2) {
        onLowRating(selectedRating);
      } else {
        setIsSubmitted(true);
      }
    }
  };

  const handleReset = () => {
    setSelectedRating(DEFAULT_RATING);
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <div className={styles.footer} data-testid="SearchQualityFeedback_THANKS">
        <div className={styles.content}>
          <TextPair
            mainText={langDic.thanksTitle[lang]}
            secondaryText={langDic.thanksSubtitle[lang]}
          />
          <span
            className={styles.thumb}
            data-testid="SearchQualityFeedback_THUMB"
          >
            <Icons.General.FeedbackLikeIcon
              data-testid="SearchQualityFeedback_LIKE_ICON"
              height={36}
              width={36}
            />
          </span>
        </div>
        <Button
          aria-label={langDic.reevaluate[lang]}
          className={styles.feedbackButton}
          data-testid="SearchQualityFeedback_RESET_BUTTON"
          onClick={handleReset}
        >
          {langDic.reevaluate[lang]}
        </Button>
      </div>
    );
  }

  return (
    <div className={styles.footer} data-testid="SearchQualityFeedback_WRAP">
      <div className={styles.content}>
        <TextPair
          mainText={langDic.title[lang]}
          secondaryText={langDic.subtitle[lang]}
        />
        <div
          className={styles.ratingList}
          data-testid="SearchQualityFeedback_RATING_LIST"
        >
          {ratings.map((rating) => (
            <Tooltip
              className={joinClasses(
                styles.ratingTooltipWrap,
                selectedRating === rating.value && styles.ratingTooltipActive,
              )}
              dataTestid="SearchQualityFeedbackRating_TOOLTIP"
              key={rating.value}
              text={langDic.ratingTooltipLabels[rating.label][lang]}
            >
              <button
                aria-label={langDic.ratingLabels[rating.label][lang]}
                aria-pressed={selectedRating === rating.value}
                className={styles.ratingButton}
                data-rating={rating.label}
                data-selected={selectedRating === rating.value}
                data-testid={`SearchQualityFeedback_RATING_${rating.value}`}
                onClick={() => {
                  setSelectedRating(rating.value);
                }}
                onPointerDown={() => {
                  setSelectedRating(rating.value);
                }}
                type="button"
              >
                <RatingIcon
                  dataTestid="SearchQualityFeedbackRating_ICON"
                  value={rating.value}
                />
              </button>
            </Tooltip>
          ))}
        </div>
      </div>
      <Button
        aria-label={langDic.submitRating[lang]}
        className={styles.feedbackButton}
        data-testid="SearchQualityFeedback_SUBMIT_BUTTON"
        onClick={handleSubmit}
      >
        {langDic.submitRating[lang]}
      </Button>
    </div>
  );
};

export type {
  ISearchQualityFeedbackProps,
  TSearchQualityRatingKey,
  TSearchQualityRatingValue,
} from "./types";
