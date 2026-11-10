import type { ILangProps } from "~interfaces/common";

import { Button, HtmlContainer } from "~baseComponents";
import { i18n } from "~constants/i18n";

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
      <div className={styles.agreementWrapper}>
        <HtmlContainer html={agreementText} />
      </div>
      <Button
        data-testid="IdentityBtn_AGREEMENT"
        aria-label={langDic.SignBtnAria[lang]}
        onClick={submitAgreementAndSign}
        className={styles.btn__continue}
        size="large"
      >
        {langDic.SignButton[lang]}
      </Button>
    </div>
  );
};
