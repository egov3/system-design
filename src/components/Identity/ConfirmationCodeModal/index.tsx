import { type ChangeEvent, useRef, useState } from "react";

import type { ILangProps } from "~interfaces/common";

import { Modal } from "~baseComponents";
import { i18n } from "~constants/i18n";

import { CodeInput } from "../CodeInput";
import styles from "./ConfirmationCodeModal.module.css";

export interface IConfirmationCodeModalProps extends ILangProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  maskedPhone: string;
  codeLength: number;
  onSubmit: (code: string, setErrorText: (text: string) => void) => void;
}

export const ConfirmationCodeModal = ({
  lang,
  isOpen,
  setIsOpen,
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

  const handleClose = () => {
    updateCode(emptyCode);
    setErrorText(undefined);
    setIsOpen(false);
  };

  return (
    <Modal
      lang={lang}
      isOpen={isOpen}
      setIsOpen={handleClose}
      isContentScroll={false}
      variant="small"
      header={{ isClosable: true, handleHeaderLogoClick: handleClose }}
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
