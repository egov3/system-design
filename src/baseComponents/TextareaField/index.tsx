import type React from "react";
import { forwardRef, type JSX } from "react";
import { joinClasses } from "~utils/joinClasses";
import { BaseField } from "../BaseField";
import styles from "../BaseField/BaseField.module.css";

export interface ITextareaFieldProps
  extends Omit<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    "onChange" | "value"
  > {
  id: string;
  labelText?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isClearable?: boolean;
  inputLeftIcon?: JSX.Element;
  isFocused?: boolean;
  setIsFocused?: (value: boolean) => void;
  className?: string;
  style?: React.CSSProperties;
  readOnly?: boolean;
  dataTestid?: string;
  variant?: "default" | "code";
  hintText?: string;
  isError?: boolean;
}

export const TextareaField = forwardRef<
  HTMLTextAreaElement,
  ITextareaFieldProps
>((props, ref) => {
  const {
    id,
    labelText,
    value,
    readOnly,
    onChange,
    variant = "default",
    isFocused,
    setIsFocused,
    isClearable,
    inputLeftIcon,
    hintText,
    isError,
    ...htmlProps
  } = props;

  const handleAutoResize = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = event.currentTarget;
    textarea.style.height = "24px";
    textarea.style.height = `${textarea.scrollHeight}px`;
    onChange?.(event);
  };

  return (
    <BaseField<HTMLTextAreaElement>
      {...props}
      onChange={onChange}
      value={value}
      isFocused={isFocused}
      setIsFocused={setIsFocused}
      isClearable={isClearable}
      inputLeftIcon={inputLeftIcon}
      hintText={hintText}
      isError={isError}
    >
      {({ handleFocus, handleBlur, isShowPlaceholder, handleChange }) => (
        <textarea
          data-testid="TextAreaField_TEXTAREA"
          ref={ref}
          {...htmlProps}
          id={id}
          value={value}
          readOnly={readOnly}
          placeholder={isShowPlaceholder ? labelText : ""}
          onInput={handleAutoResize}
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
});
