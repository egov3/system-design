import { useEffect, useState } from "react";
import { Button, TextareaField, Typography } from "~baseComponents";
import { i18n } from "~constants/i18n";
import styles from "./QualityFeedbackReason.module.css";
import type { IQualityFeedbackReasonProps } from "./types";

export const QualityFeedbackReason = ({
  cancelButtonText,
  description,
  initialComment = "",
  lang,
  onCancel,
  onSubmit,
  submitButtonText,
  title,
}: IQualityFeedbackReasonProps) => {
  const langDic = i18n.SearchQualityFeedback;
  const reasonTitle = title ?? langDic.reasonTitle[lang];
  const reasonDescription = description ?? langDic.reasonDescription[lang];
  const submitText = submitButtonText ?? langDic.submit[lang];
  const cancelText = cancelButtonText ?? langDic.cancel[lang];
  const [comment, setComment] = useState(initialComment);

  useEffect(() => {
    setComment(initialComment);
  }, [initialComment]);

  return (
    <div className={styles.reasonWrap} data-testid="QualityFeedbackReason_WRAP">
      <div className={styles.reasonContent}>
        <div className={styles.reasonSection}>
          <div className={styles.reasonTitle}>
            <Typography
              data-testid="QualityFeedbackReason_TITLE"
              fontClass="heading3"
              tag="h3"
            >
              {reasonTitle}
            </Typography>
            <Typography
              className={styles.reasonDescription}
              data-testid="QualityFeedbackReason_DESCRIPTION"
              fontClass="body2Regular"
              tag="span"
            >
              {reasonDescription}
            </Typography>
          </div>
          <TextareaField
            className={styles.reasonTextarea}
            data-testid="QualityFeedbackReason_TEXTAREA"
            id="search-quality-feedback-reason"
            labelText={langDic.reasonPlaceholder[lang]}
            onChange={(event) => setComment(event.target.value)}
            value={comment}
          />
        </div>
        <div className={styles.reasonFooter}>
          <Button
            aria-label={submitText}
            className={styles.reasonButton}
            data-testid="QualityFeedbackReason_SUBMIT_BUTTON"
            onClick={() => onSubmit(comment)}
            size="large"
          >
            {submitText}
          </Button>
          <Button
            aria-label={cancelText}
            className={styles.reasonButton}
            data-testid="QualityFeedbackReason_CANCEL_BUTTON"
            onClick={onCancel}
            size="large"
            variant="secondary"
          >
            {cancelText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export type { IQualityFeedbackReasonProps } from "./types";
