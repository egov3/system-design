import { Icons } from "@egov3/graphics";
import type React from "react";
import { forwardRef, type JSX, useState } from "react";
import { joinClasses } from "~utils/joinClasses";
import typography from "../../styles/typography.module.css";
import styles from "./BaseField.module.css";

export interface IBaseFieldProps<
  T extends HTMLInputElement | HTMLTextAreaElement,
> {
  id: string;
  value?: string;
  labelText?: string;
  inputLeftIcon?: React.ReactNode;
  isClearable?: boolean;
  focused?: boolean;
  error?: boolean;
  hintText?: string;
  setFocused?: (value: boolean) => void;
  onChange?: (event: React.ChangeEvent<T>) => void;
  className?: string;
  style?: React.CSSProperties;
  dataTestid?: string;
  children: (props: {
    focused: boolean;
    showLabel: boolean;
    showPlaceholder: boolean;
    handleFocus: () => void;
    handleBlur: () => void;
    handleChange: (event: React.ChangeEvent<T>) => void;
  }) => React.ReactNode;
}

type TBaseFieldComponent = <T extends HTMLInputElement | HTMLTextAreaElement>(
  props: IBaseFieldProps<T> & { ref?: React.Ref<HTMLDivElement> },
) => JSX.Element;

const BaseFieldInner = <T extends HTMLInputElement | HTMLTextAreaElement>(
  {
    value = "",
    labelText,
    inputLeftIcon,
    isClearable,
    className,
    style,
    id,
    focused: controlledFocused,
    setFocused,
    onChange,
    dataTestid = "BaseField_MAIN",
    hintText,
    error,
    children,
  }: IBaseFieldProps<T>,
  ref: React.Ref<HTMLDivElement>,
) => {
  const [localFocused, setLocalFocused] = useState(false);
  const focused = controlledFocused ?? localFocused;

  const isLabelShown = !!labelText && (focused || value.length > 0);
  const isLabelPlaceholderShown = !!labelText && !focused && value.length === 0;

  const handleFocus = () => {
    setLocalFocused(true);
    setFocused?.(true);
  };

  const handleBlur = () => {
    setLocalFocused(false);
    setFocused?.(false);
  };

  const handleChange = (event: React.ChangeEvent<T>) => {
    onChange?.(event);
  };

  const handleClear = () => {
    if (!onChange) return;

    const event: React.ChangeEvent<T> = {
      target: { value: "" } as T,
    } as React.ChangeEvent<T>;

    onChange(event);
  };

  return (
    <div
      className={joinClasses(styles.baseFieldWrapper, className)}
      style={style}
      data-testid={dataTestid}
    >
      <div
        ref={ref}
        data-testid={`${dataTestid}_INPUT_CONTAINER`}
        className={joinClasses(
          styles.inputContainer,
          focused && styles["input--onfocus"],
          isLabelShown ? styles.labelPadding : styles.placeholderPadding,
          typography.body2Regular,
        )}
      >
        <div className={styles.inputContainerLabeled}>
          {isLabelShown && (
            <label
              htmlFor={id}
              className={joinClasses(
                typography.caption1Regular,
                error && styles.error,
              )}
            >
              {labelText}
            </label>
          )}
          <div className={styles.inputContainerIcon}>
            {inputLeftIcon}
            {children({
              focused,
              showLabel: isLabelShown,
              showPlaceholder: isLabelPlaceholderShown,
              handleFocus,
              handleBlur,
              handleChange,
            })}
          </div>
        </div>

        {isClearable && value && (
          <Icons.General.Clear
            className={styles.clearIcon}
            onClick={handleClear}
            data-testid="Icons_CLEAR"
          />
        )}
      </div>
      {hintText && (
        <span
          className={joinClasses(
            styles.hintText,
            typography.body2Regular,
            error && styles.error,
          )}
        >
          {hintText}
        </span>
      )}
    </div>
  );
};

export const BaseField = forwardRef(BaseFieldInner) as TBaseFieldComponent;
