import parse from "html-react-parser";
import { BaseComponents } from "~baseComponents";
import styles from "./Agreement.module.css";

export interface IAgreementStepProps {
  agreementText: string;
  submitAgreementAndSign: () => void;
}

export const Agreement = ({
  agreementText,
  submitAgreementAndSign,
}: IAgreementStepProps) => {
  return (
    <div className={styles.modalBodyAgreement}>
      <div className={styles.agreementWrapper}>{parse(agreementText)}</div>
      <BaseComponents.Button
        data-testid="IdentityBtn_AGREEMENT"
        aria-label="Кнопка принять договор и продолжить"
        onClick={submitAgreementAndSign}
        className={styles.btn__continue}
        size="large"
      >
        Подписать согласие
      </BaseComponents.Button>
    </div>
  );
};
