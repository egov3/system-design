import { useState } from "react";
import { Button, TextareaField, Typography } from "~baseComponents";
import { i18n } from "~constants/i18n";
import styles from "./SearchQualityFeedbackReason.module.css";
import type { ISearchQualityFeedbackReasonProps } from "./types";

export const SearchQualityFeedbackReason = ({
  initialComment = "",
  lang,
  onCancel,
  onSubmit,
}: ISearchQualityFeedbackReasonProps) => {
  const langDic = i18n.SearchQualityFeedback;
  const [comment, setComment] = useState(initialComment);

  return (
    <div
      className={styles.reasonWrap}
      data-testid="SearchQualityFeedbackReason_WRAP"
    >
      <div className={styles.reasonContent}>
        <div className={styles.reasonSection}>
          <div className={styles.reasonTitle}>
            <Typography
              data-testid="SearchQualityFeedbackReason_TITLE"
              fontClass="heading3"
              tag="h3"
            >
              {langDic.reasonTitle[lang]}
            </Typography>
            <Typography
              className={styles.reasonDescription}
              data-testid="SearchQualityFeedbackReason_DESCRIPTION"
              fontClass="body2Regular"
              tag="span"
            >
              {langDic.reasonDescription[lang]}
            </Typography>
          </div>
          <TextareaField
            className={styles.reasonTextarea}
            data-testid="SearchQualityFeedbackReason_TEXTAREA"
            id="search-quality-feedback-reason"
            labelText={langDic.reasonPlaceholder[lang]}
            onChange={(event) => setComment(event.target.value)}
            value={comment}
          />
        </div>
        <div className={styles.reasonFooter}>
          <Button
            aria-label={langDic.submit[lang]}
            className={styles.reasonButton}
            data-testid="SearchQualityFeedbackReason_SUBMIT_BUTTON"
            onClick={() => onSubmit(comment)}
            size="large"
          >
            {langDic.submit[lang]}
          </Button>
          <Button
            aria-label={langDic.cancel[lang]}
            className={styles.reasonButton}
            data-testid="SearchQualityFeedbackReason_CANCEL_BUTTON"
            onClick={onCancel}
            size="large"
            variant="secondary"
          >
            {langDic.cancel[lang]}
          </Button>
        </div>
      </div>
    </div>
  );
};

export type { ISearchQualityFeedbackReasonProps } from "./types";
