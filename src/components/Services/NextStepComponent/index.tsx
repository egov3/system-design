import { BaseComponents } from "~baseComponents";
import { i18n } from "~constants/i18n";
import type { ILangProps } from "~interfaces/common";
import styles from "./NextStepComponent.module.css";

export interface INextStepComponent extends ILangProps {
  disabled: boolean;
  handleNextStepClick: () => Promise<void>;
}

export const NextStepComponent = ({
  disabled,
  handleNextStepClick,
  lang,
}: INextStepComponent) => {
  const langDic = i18n.Common;
  return (
    <div
      data-testid="NextStepBtn_WRAPPER"
      className={styles.nextStepBtnWrapper}
    >
      <BaseComponents.Button
        data-testid="NextStepBtn"
        aria-label={langDic.ariaCompleteStepAndContinue[lang]}
        size="large"
        className={styles.nextStepBtn}
        onClick={handleNextStepClick}
        disabled={disabled}
        aria-disabled={disabled}
      >
        {langDic.nextStep[lang]}
      </BaseComponents.Button>
    </div>
  );
};
