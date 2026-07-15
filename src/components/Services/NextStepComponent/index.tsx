import { Button } from "~baseComponents";
import { i18n } from "~constants/i18n";
import type { ILangProps } from "~interfaces/common";
import { joinClasses } from "~utils/joinClasses";
import styles from "./NextStepComponent.module.css";

export interface INextStepComponentProps extends ILangProps {
  disabled: boolean;
  handleNextStepClick: () => Promise<void>;
  isMobile?: boolean;
}

const langDic = i18n.Common;

export const NextStepComponent = ({
  disabled,
  handleNextStepClick,
  lang,
  isMobile = false,
}: INextStepComponentProps) => {
  const button = (
    <Button
      data-testid="NextStepBtn"
      aria-label={langDic.AriaCompleteStepAndContinue[lang]}
      size="large"
      className={joinClasses(styles.nextStepBtn, isMobile && styles.mobile)}
      onClick={handleNextStepClick}
      disabled={disabled}
      aria-disabled={disabled}
    >
      {langDic.NextStep[lang]}
    </Button>
  );

  if (isMobile) {
    return button;
  }

  return (
    <div
      data-testid="NextStepBtn_WRAPPER"
      className={styles.nextStepBtnWrapper}
    >
      {button}
    </div>
  );
};
