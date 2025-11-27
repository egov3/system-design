import parse from "html-react-parser";
import { BaseComponents } from "~baseComponents";
import { i18n } from "~constants/i18n";
import type { ILangProps } from "~interfaces/common";
import styles from "./Agreement.module.css";

export interface IAgreementStepProps extends ILangProps {
  agreementText: string;
  submitAgreementAndSign: () => void;
}

export const Agreement = ({
  lang,
  agreementText,
  submitAgreementAndSign,
}: IAgreementStepProps) => {
  const langDic = i18n.Agreement;

  return (
    <div className={styles.modalBodyAgreement}>
      <div className={styles.agreementWrapper}>{parse(agreementText)}</div>
      <BaseComponents.Button
        data-testid="IdentityBtn_AGREEMENT"
        aria-label={langDic.signBtnAria[lang]}
        onClick={submitAgreementAndSign}
        className={styles.btn__continue}
        size="large"
      >
        {langDic.signButton[lang]}
      </BaseComponents.Button>
    </div>
  );
};
