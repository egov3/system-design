import parse from "html-react-parser";
import type { Dispatch, SetStateAction } from "react";
import { Modal } from "~baseComponents";
import { i18n } from "~constants/i18n";
import type { ILangProps } from "~interfaces/common";
import styles from "./PrivacyModal.module.css";

export interface IPrivacyModalProps extends ILangProps {
  variant?: "small" | "medium" | "large";
  isOpen?: boolean;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
}

export const PrivacyModal = ({
  variant = "large",
  lang,
  isOpen,
  setIsOpen,
}: IPrivacyModalProps) => {
  const langDic = i18n.PrivacyModal;

  return (
    <Modal
      variant={variant}
      header={{ title: langDic.title[lang], isClosable: true }}
      lang={lang}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <div data-testid="PrivacyModal_BODY" className={styles.policyBody}>
        {parse(langDic.privacyAgreementText[lang])}
      </div>
    </Modal>
  );
};
