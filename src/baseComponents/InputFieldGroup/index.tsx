import { useRef } from "react";
import { InputField } from "../InputField";
import { joinClasses } from "~utils/joinClasses";

import styles from "./InputFieldGroup.module.css";

export interface IInputFieldGroupProps {
  length: number;
  code: string[];
  ariaLabel: string;
  className?: string;
  focused?: boolean;
  setFocused?: (value: boolean) => void;
  handleInputChange: (
    index: number,
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeyDown?: (
    index: number,
  ) => (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const InputFieldGroup = ({
  length,
  code,
  ariaLabel,
  className,
  focused,
  setFocused,
  handleInputChange,
  handleKeyDown,
}: IInputFieldGroupProps) => {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handlePaste = (idx: number, pastedText: string) => {
    const digits = pastedText.replace(/\D/g, "");
    const newCode = [...code];

    for (let i = 0; i < digits.length && idx + i < length; i++) {
      newCode[idx + i] = digits[i];
    }

    newCode.forEach((val, i) => {
      handleInputChange(i)({
        target: { value: val },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    setTimeout(() => {
      const focusIndex = Math.min(idx + digits.length, length - 1);
      inputsRef.current[focusIndex]?.focus();
    }, 0);
  };

  const handleChange =
    (idx: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      const digits = value.replace(/\D/g, "");
      if (digits.length > 1) {
        handlePaste(idx, digits);
        return;
      }
      const digit = digits.slice(0, 1);
      if (digit) {
        handleInputChange(idx)(event);
        if (idx < length - 1) {
          setTimeout(() => {
            inputsRef.current[idx + 1]?.focus();
          });
        }
      } else {
        handleInputChange(idx)(event);
      }
    };

  const handleKey =
    (idx: number) => (event: React.KeyboardEvent<HTMLInputElement>) => {
      handleKeyDown?.(idx)(event);
      if (event.key === "Backspace" && idx > 0) {
        setTimeout(() => {
          inputsRef.current[idx - 1]?.focus();
        }, 0);
      }
    };

  return (
    <>
      {Array.from({ length }).map((_, idx) => (
        <InputField
          key={`inputCode_${code[idx]}_${idx}`}
          data-testid={`InputField_inputCode_${idx}`}
          ref={(el) => {
            inputsRef.current[idx] = el;
          }}
          id={`inputCode_${idx}`}
          type="text"
          variant="code"
          value={code[idx] || ""}
          aria-label={ariaLabel}
          focused={focused}
          setFocused={setFocused}
          onChange={handleChange(idx)}
          onKeyDown={handleKey(idx)}
          className={joinClasses(className, styles.input)}
        />
      ))}
    </>
  );
};
