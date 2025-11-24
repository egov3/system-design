import { useRef } from "react";
import { InputField } from "../InputField";

export interface IInputFieldGroupProps {
  length: number;
  code: string[];
  ariaLabel: string;
  focused?: boolean;
  setFocused?: (value: boolean) => void;
  handleInputChange: (
    index: number,
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeyDown: (
    index: number,
  ) => (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const InputFieldGroup = ({
  length,
  code,
  ariaLabel,
  focused,
  setFocused,
  handleInputChange,
  handleKeyDown,
}: IInputFieldGroupProps) => {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  return Array.from({ length }).map((_, idx) => {
    const value = code[idx];
    return (
      <InputField
        data-testid={`InputField_inputCode_${idx}`}
        key={value || `inputCode_${idx}`}
        ref={(el) => {
          inputsRef.current[idx] = el;
        }}
        id={`inputCode_${idx}`}
        type="number"
        variant="code"
        value={value}
        ariaLabel={ariaLabel}
        focused={focused}
        setFocused={setFocused}
        onChange={handleInputChange(idx)}
        onKeyDown={handleKeyDown(idx)}
      />
    );
  });
};
