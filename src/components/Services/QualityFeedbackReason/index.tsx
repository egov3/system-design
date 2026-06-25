import { useEffect, useState } from "react";
import { TextareaField, Typography } from "~baseComponents";
import { i18n } from "~constants/i18n";
import styles from "./QualityFeedbackReason.module.css";
import type { IQualityFeedbackReasonProps } from "./types";

export const QualityFeedbackReason = ({
  description,
  initialComment = "",
  lang,
  title,
}: IQualityFeedbackReasonProps) => {
  const langDic = i18n.QualityFeedback;
  const reasonTitle = title ?? langDic.reasonTitle[lang];
  const reasonDescription = description ?? langDic.reasonDescription[lang];
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
      </div>
    </div>
  );
};

export type { IQualityFeedbackReasonProps } from "./types";
