import type { ReactNode } from "react";
import {
  Button,
  InputFieldGroup,
  StatusText,
  Typography,
} from "~baseComponents";
import { i18n } from "~constants/i18n";
import type { ILangProps } from "~interfaces/common";
import styles from "./CodeInput.module.css";

export interface ICodeInputResendButton {
  label: string;
  isDisabled?: boolean;
  onClick: () => void;
}

export interface ICodeInputProps extends ILangProps {
  title: string;
  description: ReactNode;
  code: string[];
  handleInputChange: (
    index: number,
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  errorText?: string;
  resendButton?: ICodeInputResendButton;
  "data-testid"?: string;
}

export const CodeInput = ({
  lang,
  title,
  description,
  code,
  handleInputChange,
  errorText,
  resendButton,
  "data-testid": dataTestid = "CodeInput",
}: ICodeInputProps) => {
  const langDic = i18n.CodeInput;

  return (
    <div className={styles.wrapper} data-testid={`${dataTestid}_WRAPPER`}>
      <div className={styles.infoBlock} data-testid={`${dataTestid}_INFO`}>
        <Typography
          tag="span"
          fontClass="heading3"
          className={styles.title}
          data-testid={`${dataTestid}_TITLE`}
          aria-label={title}
        >
          {title}
        </Typography>
        <Typography
          tag="span"
          fontClass="body2Regular"
          className={styles.description}
          data-testid={`${dataTestid}_DESCRIPTION`}
        >
          {description}
        </Typography>
      </div>
      <div
        className={styles.inputWrapper}
        data-testid={`${dataTestid}_INPUT_WRAPPER`}
      >
        <InputFieldGroup
          length={code.length}
          code={code}
          handleInputChange={handleInputChange}
          aria-label={langDic.AriaInputField[lang]}
          data-testid={`${dataTestid}_FIELD`}
        />
        {errorText && errorText.length > 0 && (
          <StatusText text={errorText} variant="ERROR" isAlignedCenter={true} />
        )}
      </div>
      {resendButton && (
        <Button
          variant="tinted"
          size="small"
          className={styles.resendButton}
          disabled={resendButton.isDisabled}
          onClick={resendButton.onClick}
          aria-label={resendButton.label}
          data-testid={`${dataTestid}_RESEND_BTN`}
        >
          {resendButton.label}
        </Button>
      )}
    </div>
  );
};
