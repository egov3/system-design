// InputField.tsx
import React, { forwardRef, HTMLInputTypeAttribute, JSX } from "react";

import { joinClasses } from "~utils/joinClasses";

import styles from "./InputField.module.css";

import { ClearIcon } from "~svg";

export type TOtpType = "OTP" | "TEXT";

export interface IInputFieldProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  onFocus?: () => void;
  onBlur?: () => void;
  onEnterPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  placeholder?: string;
  className?: string;
  style?: React.CSSProperties;
  isClearable?: boolean;
  inputLeftIcon?: JSX.Element;
  type?: HTMLInputTypeAttribute;
  id: string;
  labelText?: string;
  ariaLabel: string;
  focused?: boolean;
  setFocused?: (val: boolean) => void;
  readOnly?: boolean;
}

export const InputField = forwardRef<HTMLInputElement, IInputFieldProps>(
  (
    {
      onFocus,
      onBlur,
      onChange,
      onEnterPress,
      value = "",
      inputLeftIcon,
      placeholder = "",
      className = "",
      style,
      isClearable = false,
      type = "text",
      id,
      labelText = "",
      ariaLabel = "",
      focused = false,
      setFocused = () => {},
      readOnly = false,
    }: IInputFieldProps,
    ref
  ): JSX.Element => {
    const handleClear = () => {
      if (onChange) {
        onChange({
          target: { value: "" },
        } as React.ChangeEvent<HTMLInputElement>);
      }
    };
    const handleFocus = () => {
      setFocused(true);
      if (onFocus) onFocus();
    };
    const handleBlur = () => {
      setFocused(false);
      if (onBlur) onBlur();
    };
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (onEnterPress && event.key === "Enter") {
        onEnterPress(event);
      }
    };

    return (
      <div
        data-testid="InputField_MAIN"
        className={joinClasses(
          styles[labelText.length ? "inputContainerLabeled" : "inputContainer"],
          focused ? styles[`input--onfocus`] : undefined,
          styles[`input-${type?.toLocaleLowerCase()}`],
          className
        )}
        style={style}
      >
        {labelText.length > 0 && (
          <label htmlFor={id} data-testid="InputField_LABEL">
            {labelText}
          </label>
        )}
        {inputLeftIcon}
        <input
          ref={ref}
          data-testid="InputField_INPUT"
          aria-label={ariaLabel}
          id={id}
          type={type}
          className={styles.input}
          placeholder={placeholder}
          aria-placeholder={placeholder}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          value={value}
          readOnly={readOnly}
        />
        {isClearable && value && (
          <ClearIcon
            fill="red"
            pathFill="#758393"
            className={styles.clearIcon}
            onClick={handleClear}
          />
        )}
      </div>
    );
  }
);
