import React, { HTMLInputTypeAttribute } from "react";

import { CombineClassNames } from "~utils/CombineClassNames";

import styles from "./InputField.module.scss";
import { ClearIcon } from "~svg";

export type TOtpType = "OTP" | "TEXT";

export interface IInputFieldProps {
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
}

export const InputField = ({
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
}: IInputFieldProps): React.ReactNode => (
  <div
    data-testid="InputField_MAIN"
    className={CombineClassNames(
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
      data-testid="InputField_INPUT"
      aria-label={ariaLabel}
      id={id}
      type={type}
      className={styles.input}
      placeholder={placeholder}
      aria-placeholder={placeholder}
      onFocus={() => {
        setFocused(true);
        if (onFocus) {
          onFocus();
        }
      }}
      onBlur={() => {
        setFocused(false);
        if (onBlur) {
          onBlur();
        }
      }}
      onChange={onChange}
      onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
        if (onEnterPress && event.key === "Enter") {
          onEnterPress(event);
        }
      }}
      value={value}
      readOnly={!onChange}
    />
    {isClearable && value && (
      <ClearIcon
        fill="red"
        pathFill="#758393"
        className={styles.clearIcon}
        onClick={() => {
          if (onChange) {
            onChange({
              target: { value: "" },
            } as React.ChangeEvent<HTMLInputElement>);
          }
        }}
      />
    )}
  </div>
);
