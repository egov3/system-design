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
  focused?: boolean;
  setFocused?: (value: boolean) => void;
  className?: string;
  style?: React.CSSProperties;
  readOnly?: boolean;
  dataTestid?: string;
  variant?: "default" | "code";
  hintText?: string;
  error?: boolean;
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
    focused,
    setFocused,
    isClearable,
    inputLeftIcon,
    hintText,
    error,
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
      focused={focused}
      setFocused={setFocused}
      isClearable={isClearable}
      inputLeftIcon={inputLeftIcon}
      hintText={hintText}
      error={error}
    >
      {({ handleFocus, handleBlur, showPlaceholder, handleChange }) => (
        <textarea
          data-testid="TextAreaField_TEXTAREA"
          ref={ref}
          {...htmlProps}
          id={id}
          value={value}
          readOnly={readOnly}
          placeholder={showPlaceholder ? labelText : ""}
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
