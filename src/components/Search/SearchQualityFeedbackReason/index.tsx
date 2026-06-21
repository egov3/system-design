import { Typography } from "~baseComponents";
import { i18n } from "~constants/i18n";
import styles from "./SearchQualityFeedbackReason.module.css";
import type { ISearchQualityFeedbackReasonProps } from "./types";

export const SearchQualityFeedbackReason = ({
  lang,
}: ISearchQualityFeedbackReasonProps) => {
  const langDic = i18n.SearchQualityFeedback;

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
        </div>
      </div>
    </div>
  );
};

export type { ISearchQualityFeedbackReasonProps } from "./types";
