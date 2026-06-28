import { Button } from "~baseComponents";
import { i18n } from "~constants/i18n";
import type { ILangProps } from "~interfaces/common";
import styles from "./NextStepComponent.module.css";

export interface INextStepComponentProps extends ILangProps {
  disabled: boolean;
  handleNextStepClick: () => Promise<void>;
}

const langDic = i18n.Common;

export const NextStepComponent = ({
  disabled,
  handleNextStepClick,
  lang,
}: INextStepComponentProps) => (
  <div data-testid="NextStepBtn_WRAPPER" className={styles.nextStepBtnWrapper}>
    <Button
      data-testid="NextStepBtn"
      aria-label={langDic.AriaCompleteStepAndContinue[lang]}
      size="large"
      className={styles.nextStepBtn}
      onClick={handleNextStepClick}
      disabled={disabled}
      aria-disabled={disabled}
    >
      {langDic.NextStep[lang]}
    </Button>
  </div>
);
