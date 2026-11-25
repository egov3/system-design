import { type ChangeEvent, useState } from "react";

import type { ILangProps } from "~interfaces/common";

import { Modal } from "~baseComponents";
import { i18n } from "~constants/i18n";

import { CodeInput } from "../CodeInput";
import styles from "./ConfirmationCodeModal.module.css";

const CONFIRMATION_CODE_LENGTH = 5;
const EMPTY_CODE = Array.from({ length: CONFIRMATION_CODE_LENGTH }, () => "");

export interface IConfirmationCodeModalProps extends ILangProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  maskedPhone: string;
  onSubmit: (code: string, setErrorText: (text: string) => void) => void;
}

export const ConfirmationCodeModal = ({
  lang,
  isOpen,
  setIsOpen,
  maskedPhone,
  onSubmit,
}: IConfirmationCodeModalProps) => {
  const [code, setCode] = useState<string[]>(EMPTY_CODE);
  const [errorText, setErrorText] = useState<string>();
  const langDic = i18n.ConfirmationCodeModal;

  const handleCodeChange =
    (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
      const digit = event.target.value.replaceAll(/\D/g, "").slice(0, 1);
      const nextCode = code.map((value, position) =>
        position === index ? digit : value,
      );
      setErrorText(undefined);
      setCode(nextCode);
      if (nextCode.every((value) => value.length > 0)) {
        onSubmit(nextCode.join(""), (text) => {
          setCode(EMPTY_CODE);
          setErrorText(text);
        });
      }
    };

  const handleClose = () => {
    setCode(EMPTY_CODE);
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
