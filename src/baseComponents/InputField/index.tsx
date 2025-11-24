// src/baseComponents/InputField/index.tsx
import type React from "react";
import { forwardRef, type JSX } from "react";
import { joinClasses } from "~utils/joinClasses";
import { BaseField } from "../BaseField";
import styles from "../BaseField/BaseField.module.css";

export interface IInputFieldProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "onChange" | "value"
  > {
  id: string;
  ariaLabel: string;
  labelText?: string;
  value?: string;
  readOnly?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onEnterPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  isClearable?: boolean;
  inputLeftIcon?: JSX.Element;
  focused?: boolean;
  setFocused?: (value: boolean) => void;
  className?: string;
  style?: React.CSSProperties;
  dataTestid?: string;
  variant?: "default" | "code";
}

export const InputField = forwardRef<HTMLInputElement, IInputFieldProps>(
  (props, ref) => {
    const {
      id,
      labelText,
      value,
      readOnly,
      onChange,
      variant = "default",
      ...htmlProps
    } = props;

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        props.onEnterPress?.(event);
      }
    };

    return (
      <BaseField<HTMLInputElement> {...props} onChange={onChange} value={value}>
        {({ handleFocus, handleBlur, showPlaceholder, handleChange }) => (
          <input
            data-testid="InputField_INPUT"
            ref={ref}
            {...htmlProps}
            id={id}
            value={value}
            readOnly={readOnly}
            placeholder={showPlaceholder ? labelText : ""}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            className={joinClasses(
              styles.input,
              variant === "code" && styles.code,
            )}
          />
        )}
      </BaseField>
    );
  },
);
