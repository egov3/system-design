import parse from "html-react-parser";
import { Modal } from "~baseComponents";
import { i18n } from "~constants/i18n";
import type { ILangProps } from "~interfaces/common";

export interface IPrivacyModalProps extends ILangProps {
  variant?: "small" | "medium" | "large";
}

export const PrivacyModal = ({
  variant = "large",
  lang,
}: IPrivacyModalProps) => {
  const langDic = i18n.PrivacyModal;

  return (
    <Modal
      variant={variant}
      header={{ title: langDic.title[lang] }}
      lang={lang}
    >
      {parse(langDic.privacyAgreementText[lang])}
    </Modal>
  );
};
