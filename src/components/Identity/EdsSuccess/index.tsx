import { RegistrationSuccessIllustration } from "@egov3/graphics/Illustrations/RegistrationSuccess";
import { Button, Typography } from "~baseComponents";
import { i18n } from "~constants/i18n";
import type { ILangProps } from "~interfaces/common";
import styles from "./EdsSuccess.module.css";

export interface IEdsSuccessProps extends ILangProps {
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
        <RegistrationSuccessIllustration data-testid="Success_ICON" />
      </div>
      <div
        className={styles.modalInfoBlock}
        data-testid="EdsSuccessInfo_WRAPPER"
      >
        <Typography
          tag="span"
          fontClass="heading3"
          data-testid="IdentityEds_TITLE"
          className={styles.modalStepTitle}
          aria-label={langDic.IdentityEdsTitle[lang]}
        >
          {langDic.IdentityEdsTitle[lang]}
        </Typography>
        <div data-testid="EdsSuccessDescription_WRAPPER">
          <Typography
            tag="span"
            fontClass="body2Regular"
            data-testid="IdentityEds_DESCRIPTION"
            className={styles.modalDescription}
            aria-label={langDic.IdentityHappyDescription[lang]}
          >
            {langDic.IdentityHappyDescription[lang]}
          </Typography>
          <Typography
            tag="span"
            fontClass="body2Regular"
            data-testid="IdentityEds_DESCRIPTION"
            className={styles.modalDescription}
            aria-label={langDic.IdentityHappyLogin[lang]}
          >
            {langDic.IdentityHappyLogin[lang]}
          </Typography>
        </div>
      </div>
      <Button
        data-testid="IdentityEds_BTN"
        aria-label={langDic.IdentityEdsButton[lang]}
        size="large"
        onClick={handleEdsOnclick}
      >
        {langDic.IdentityEdsButton[lang]}
      </Button>
    </div>
  );
};
