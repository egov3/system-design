import { type ChangeEvent, useRef, useState } from "react";

import type { ILangProps } from "~interfaces/common";

import { Modal } from "~baseComponents";
import { i18n } from "~constants/i18n";

import { CodeInput } from "../CodeInput";
import styles from "./ConfirmationCodeModal.module.css";

export interface IConfirmationCodeModalProps extends ILangProps {
  onBack: () => void;
  maskedPhone: string;
  codeLength: number;
  onSubmit: (code: string, setErrorText: (text: string) => void) => void;
}

export const ConfirmationCodeModal = ({
  lang,
  onBack,
  maskedPhone,
  codeLength,
  onSubmit,
}: IConfirmationCodeModalProps) => {
  const emptyCode = Array.from({ length: codeLength }, () => "");
  const [code, setCode] = useState<string[]>(emptyCode);
  const [errorText, setErrorText] = useState<string>();
  const codeRef = useRef<string[]>(emptyCode);
  const langDic = i18n.ConfirmationCodeModal;

  const updateCode = (nextCode: string[]) => {
    codeRef.current = nextCode;
    setCode(nextCode);
  };

  const handleCodeChange =
    (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
      const digit = event.target.value.replaceAll(/\D/g, "").slice(0, 1);
      const nextCode = codeRef.current.map((value, position) =>
        position === index ? digit : value,
      );
      setErrorText(undefined);
      updateCode(nextCode);
      if (nextCode.every((value) => value.length > 0)) {
        onSubmit(nextCode.join(""), (text) => {
          updateCode(emptyCode);
          setErrorText(text);
        });
      }
    };

  const handleBack = () => {
    updateCode(emptyCode);
    setErrorText(undefined);
    onBack();
  };

  return (
    <Modal
      lang={lang}
      isContentScroll={false}
      variant="small"
      header={{ goBackService: handleBack, handleHeaderLogoClick: handleBack }}
    >
      <div
        className={styles.contentWrapper}
        data-testid="ConfirmationCodeModal_CONTENT_WRAPPER"
      >
        <CodeInput
          lang={lang}
          title={langDic.EnterConfirmationCode[lang]}
          description={langDic.ConfirmationCodeSent[lang].replace(
            "{{number}}",
            maskedPhone,
          )}
          code={code}
          handleInputChange={handleCodeChange}
          errorText={errorText}
          data-testid="ConfirmationCodeModal"
        />
      </div>
    </Modal>
  );
};
