import { BaseComponents } from "~baseComponents";
import { i18n } from "~constants/i18n";
import type { ILangProps } from "~interfaces/common";
import type { ITitleValuePair } from "~interfaces/Profile";
import styles from "./ProfileHealthGeneral.module.css";

export interface IProfileHealthGeneral extends ILangProps {
  attachedClinic: ITitleValuePair[];
  compulsoryHealthInsurance: ITitleValuePair[];
}

export const ProfileHealthGeneral = ({
  lang,
  attachedClinic,
  compulsoryHealthInsurance,
}: IProfileHealthGeneral) => {
  const langDic = i18n.ProfileHealthGeneral;
  return (
    <div className={styles.wrap} data-testid="ProfileHealth_GENERAL">
      <div data-testid="ProfileHealth_INFO">
        <BaseComponents.Typography
          tag="span"
          data-testid="ProfileHealth_HEADER"
          className={styles.header}
          aria-label={langDic.healthInfo[lang]}
          fontClass="body2Medium"
        >
          {langDic.healthInfo[lang]}
        </BaseComponents.Typography>
        <div
          className={styles.content}
          data-testid="ProfileHealthAttached_CONTENT"
        >
          {attachedClinic.map((content, index) => (
            <div
              key={`attached-${index}-${content.value}`}
              className={styles.block}
              data-testid="ProfileHealthAttached_BLOCK"
            >
              <BaseComponents.Typography
                tag="span"
                data-testid="ProfileHealthContent_VALUE"
                className={styles.description}
                aria-label={content.value}
                fontClass="body2Regular"
              >
                {content.value}
              </BaseComponents.Typography>
              <BaseComponents.Typography
                tag="span"
                data-testid="ProfileHealthContent_TITLE"
                className={styles.title}
                aria-label={content.title}
                fontClass="caption1Regular"
              >
                {content.title}
              </BaseComponents.Typography>
            </div>
          ))}
        </div>
        <hr className={styles.line} data-testid="ProfileHealth_LINE" />
      </div>
      <div data-testid="ProfileHealth_INSURANCE">
        <BaseComponents.Typography
          tag="span"
          data-testid="ProfileHealth_HEADER"
          className={styles.header}
          aria-label={langDic.healthInsurance[lang]}
          fontClass="body2Medium"
        >
          {langDic.healthInsurance[lang]}
        </BaseComponents.Typography>
        <div
          className={styles.content}
          data-testid="ProfileHealthInsurance_CONTENT"
        >
          {compulsoryHealthInsurance.map((content, index) => (
            <div
              key={`insurance-${index}-${content.value}`}
              className={styles.block}
              data-testid="ProfileHealthInsurance_BLOCK"
            >
              <BaseComponents.Typography
                tag="span"
                data-testid="ProfileHealthInsurance_VALUE"
                className={styles.description}
                aria-label={content.value}
                fontClass="body2Regular"
              >
                {content.value}
              </BaseComponents.Typography>
              <BaseComponents.Typography
                tag="span"
                data-testid="ProfileHealthInsurance_TITLE"
                className={styles.title}
                aria-label={content.title}
                fontClass="caption1Regular"
              >
                {content.title}
              </BaseComponents.Typography>
            </div>
          ))}
        </div>
        <hr className={styles.line} data-testid="ProfileHealth_LINE" />
      </div>
    </div>
  );
};
