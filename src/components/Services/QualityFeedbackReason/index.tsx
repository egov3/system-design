import { Typography } from "~baseComponents";
import { i18n } from "~constants/i18n";
import styles from "./QualityFeedbackReason.module.css";
import type { IQualityFeedbackReasonProps } from "./types";

export const QualityFeedbackReason = ({
  description,
  lang,
  title,
}: IQualityFeedbackReasonProps) => {
  const langDic = i18n.QualityFeedback;
  const reasonTitle = title ?? langDic.reasonTitle[lang];
  const reasonDescription = description ?? langDic.reasonDescription[lang];

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
        </div>
      </div>
    </div>
  );
};

export type { IQualityFeedbackReasonProps } from "./types";
