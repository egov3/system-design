import { Button, TextPair } from "~baseComponents";
import { i18n } from "~constants/i18n";
import styles from "./QualityFeedback.module.css";
import type { IQualityFeedbackProps } from "./types";

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

  return (
    <div className={styles.footer} data-testid="QualityFeedback_WRAP">
      <div className={styles.content}>
        <TextPair mainText={defaultTitle} secondaryText={defaultSubtitle} />
      </div>
      <Button
        aria-label={defaultButtonText}
        className={styles.feedbackButton}
        data-testid="QualityFeedback_SUBMIT_BUTTON"
        onClick={onSubmitRating}
      >
        {defaultButtonText}
      </Button>
    </div>
  );
};

export type { IQualityFeedbackProps } from "./types";
