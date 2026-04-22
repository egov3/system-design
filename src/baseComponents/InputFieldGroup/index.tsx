import { type KeyboardEvent, useRef } from "react";
import { joinClasses } from "~utils/joinClasses";
import typography from "../../styles/typography.module.css";
import { InputField } from "../InputField";

import styles from "./InputFieldGroup.module.css";

export interface IInputFieldGroupProps {
  length: number;
  code: string[];
  "aria-label": string;
  "data-testid"?: string;
  className?: string;
  isFocused?: boolean;
  setIsFocused?: (value: boolean) => void;
  hintText?: string;
  isError?: boolean;
  handleInputChange: (
    index: number,
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const isModifierKeyPressed = (event: KeyboardEvent<HTMLInputElement>) => {
  return event.metaKey || event.ctrlKey || event.altKey;
};

const isSingleDigit = (key: string) => {
  return key.length === 1 && /^\d$/.test(key);
};

const shouldPreventKeyInput = (event: KeyboardEvent<HTMLInputElement>) => {
  if (isModifierKeyPressed(event)) return false;
  if (event.key.length !== 1) return false;
  return !isSingleDigit(event.key);
};

export const InputFieldGroup = ({
  length,
  code,
  "aria-label": ariaLabel,
  "data-testid": dataTestid = "InputFieldGroup_WRAPPER",
  className,
  isFocused,
  setIsFocused,
  hintText,
  isError,
  handleInputChange,
}: IInputFieldGroupProps) => {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const focusInput = (index: number) => {
    setTimeout(() => {
      const input = inputsRef.current[index];

      if (input) {
        input.focus();

        const len = input.value.length;
        input.setSelectionRange(len, len);
      }
    }, 0);
  };

  const extractDigits = (text: string) => text.replaceAll(/\D/g, "");

  const handleChange =
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const digits = extractDigits(event.target.value);

      if (digits.length === 0) {
        handleInputChange(index)(event);
        return;
      }

      for (let i = 0; i < digits.length && index + i < length; i++) {
        const digitsIndex = index + i;
        if (index + 1 === length && code[code.length - 1] === digits[i]) {
          return;
        }

        handleInputChange(digitsIndex)({
          target: { value: digits[i] },
        } as React.ChangeEvent<HTMLInputElement>);
      }

      const lastFilledIndex = Math.min(index + digits.length, length - 1);
      focusInput(lastFilledIndex);
    };

  const handleKey =
    (index: number) => (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (shouldPreventKeyInput(event)) {
        event.preventDefault();
        return;
      }

      const input = inputsRef.current[index];

      if (
        event.key === "Backspace" &&
        index > 0 &&
        input?.selectionStart === 0
      ) {
        focusInput(index - 1);
      }
    };

  return (
    <div
      className={joinClasses(styles.inputFieldGroupWrapper, className)}
      data-testid={dataTestid}
    >
      <div
        className={styles.inputFieldsContainer}
        data-testid={`${dataTestid}_INPUT_FIELDS_CONTAINER`}
      >
        {Array.from({ length }).map((_, index) => {
          const fieldId = `inputCode_${index}`;
          return (
            <InputField
              key={fieldId}
              data-testid={`${dataTestid}_INPUT_FIELD_${index}`}
              ref={(el) => {
                inputsRef.current[index] = el;
              }}
              id={fieldId}
              type="text"
              pattern="[0-9]*"
              variant="code"
              value={code[index] || ""}
              aria-label={ariaLabel}
              isFocused={isFocused}
              setIsFocused={setIsFocused}
              onChange={handleChange(index)}
              onKeyDown={handleKey(index)}
              className={styles.input}
            />
          );
        })}
      </div>
      {hintText && hintText.length > 0 && (
        <span
          data-testid={`${dataTestid}_HINT_TEXT`}
          className={joinClasses(
            styles.hintText,
            typography.body2Regular,
            isError && styles.error,
          )}
        >
          {hintText}
        </span>
      )}
    </div>
  );
};
