import { Graphics } from "@egov3/graphics";
import { BaseComponents } from "~baseComponents";
import { i18n } from "~constants/i18n";
import type { ILangProps } from "~interfaces/common";
import styles from "./EdsSuccess.module.css";

interface IEdsSuccessProps extends ILangProps {
  handleEdsOnclick: () => void;
}

export const EdsSuccess = ({ lang, handleEdsOnclick }: IEdsSuccessProps) => {
  const langDic = i18n.EdsSuccess;

  return (
    <div
      className={styles.modalBodyAgreement}
      data-testid="EdsSuccess_CONTAINER"
    >
      <div className={styles.iconWrapper} data-testid="EdsSuccessIcon_WRAPPER">
        <Graphics.Illustrations.RegistrationSuccess data-testid="Success_ICON" />
      </div>
      <div
        className={styles.modalInfoBlock}
        data-testid="EdsSuccessInfo_WRAPPER"
      >
        <BaseComponents.Typography
          tag="span"
          fontClass="heading3"
          data-testid="IdentityEds_TITLE"
          className={styles.modalStepTitle}
          aria-label={langDic.identityEdsTitle[lang]}
        >
          {langDic.identityEdsTitle[lang]}
        </BaseComponents.Typography>
        <div data-testid="EdsSuccessDescription_WRAPPER">
          <BaseComponents.Typography
            tag="span"
            fontClass="body2Regular"
            data-testid="IdentityEds_DESCRIPTION"
            className={styles.modalDescription}
            aria-label={langDic.identityHappyDescription[lang]}
          >
            {langDic.identityHappyDescription[lang]}
          </BaseComponents.Typography>
          <BaseComponents.Typography
            tag="span"
            fontClass="body2Regular"
            data-testid="IdentityEds_DESCRIPTION"
            className={styles.modalDescription}
            aria-label={langDic.identityHappyLogin[lang]}
          >
            {langDic.identityHappyLogin[lang]}
          </BaseComponents.Typography>
        </div>
      </div>
      <BaseComponents.Button
        data-testid="IdentityEds_BTN"
        aria-label={langDic.identityEdsButton[lang]}
        size="large"
        onClick={handleEdsOnclick}
      >
        {langDic.identityEdsButton[lang]}
      </BaseComponents.Button>
    </div>
  );
};
