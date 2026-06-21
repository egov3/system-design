import { Button, TextPair } from "~baseComponents";
import { i18n } from "~constants/i18n";
import styles from "./SearchQualityFeedback.module.css";
import type { ISearchQualityFeedbackProps } from "./types";

export const SearchQualityFeedback = ({
  lang,
}: ISearchQualityFeedbackProps) => {
  const langDic = i18n.SearchQualityFeedback;

  return (
    <div className={styles.footer} data-testid="SearchQualityFeedback_WRAP">
      <div className={styles.content}>
        <TextPair
          mainText={langDic.title[lang]}
          secondaryText={langDic.subtitle[lang]}
        />
      </div>
      <Button
        aria-label={langDic.submitRating[lang]}
        className={styles.feedbackButton}
        data-testid="SearchQualityFeedback_SUBMIT_BUTTON"
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
