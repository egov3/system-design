import { type KeyboardEvent, useRef } from "react";
import { joinClasses } from "~utils/joinClasses";
import typography from "../../styles/typography.module.css";
import { InputField } from "../InputField";

import styles from "./InputFieldGroup.module.css";

export interface IInputFieldGroupProps {
  length: number;
  code: string[];
  "aria-label": string;
  className?: string;
  focused?: boolean;
  setFocused?: (value: boolean) => void;
  hintText?: string;
  error?: boolean;
  handleInputChange: (
    index: number,
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeyDown?: (
    index: number,
  ) => (e: React.KeyboardEvent<HTMLInputElement>) => void;
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
  className,
  focused,
  setFocused,
  hintText,
  error,
  handleInputChange,
  handleKeyDown,
}: IInputFieldGroupProps) => {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const focusInput = (index: number) => {
    setTimeout(() => {
      inputsRef.current[index]?.focus();
    }, 0);
  };

  const extractDigits = (text: string) => text.replaceAll(/\D/g, "");

  const handlePaste = (startIndex: number, pastedText: string) => {
    const digits = extractDigits(pastedText);
    for (let i = 0; i < digits.length && startIndex + i < length; i++) {
      const index = startIndex + i;
      handleInputChange(index)({
        target: { value: digits[i] },
      } as React.ChangeEvent<HTMLInputElement>);
    }

    const lastFilledIndex = Math.min(startIndex + digits.length, length - 1);
    focusInput(lastFilledIndex);
  };

  const handleChange =
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const digits = extractDigits(event.target.value);
      if (digits.length > 1) {
        handlePaste(index, digits);
        return;
      }
      handleInputChange(index)(event);
      if (digits.length === 1 && index < length - 1) {
        focusInput(index + 1);
      }
    };

  const handleKey =
    (index: number) => (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (shouldPreventKeyInput(event)) {
        event.preventDefault();
        return;
      }
      handleKeyDown?.(index)(event);
      if (event.key === "Backspace" && index > 0) {
        focusInput(index - 1);
      }
    };

  return (
    <div
      className={joinClasses(styles.inputFieldGroupWrapper, className)}
      data-testid="InputFieldGroup_WRAPPER"
    >
      <div
        className={styles.inputFieldsContainer}
        data-testid="InputFieldGroup_INPUT_FIELDS_CONTAINER"
      >
        {Array.from({ length }).map((_, index) => {
          const fieldId = `inputCode_${index}`;
          return (
            <InputField
              key={fieldId}
              data-testid={`InputField_${fieldId}`}
              ref={(el) => {
                inputsRef.current[index] = el;
              }}
              id={fieldId}
              type="text"
              pattern="[0-9]*"
              variant="code"
              value={code[index] || ""}
              aria-label={ariaLabel}
              focused={focused}
              setFocused={setFocused}
              onChange={handleChange(index)}
              onKeyDown={handleKey(index)}
              className={styles.input}
            />
          );
        })}
      </div>
      {hintText && (
        <div
          className={joinClasses(
            styles.hintText,
            typography.body2Regular,
            error && styles.error,
          )}
        >
          {hintText}
        </div>
      )}
    </div>
  );
};
