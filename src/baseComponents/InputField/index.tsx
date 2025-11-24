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
  labelText?: string;
  value?: string;
  readOnly?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onEnterPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  isClearable?: boolean;
  inputLeftIcon?: JSX.Element;
  focused?: boolean;
  setFocused?: (value: boolean) => void;
  className?: string;
  style?: React.CSSProperties;
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
      onKeyDown,
      variant = "default",
      focused,
      setFocused,
      isClearable,
      inputLeftIcon,
      ...htmlProps
    } = props;

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      onKeyDown?.(event);
      if (event.key === "Enter") {
        props.onEnterPress?.(event);
      }
    };

    return (
      <BaseField<HTMLInputElement>
        {...props}
        onChange={onChange}
        value={value}
        focused={focused}
        setFocused={setFocused}
        isClearable={isClearable}
        inputLeftIcon={inputLeftIcon}
      >
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
            onChange={(e) => {
              handleChange(e);
              onChange?.(e);
            }}
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
