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
  isFocused?: boolean;
  isError?: boolean;
  hintText?: string;
  setIsFocused?: (value: boolean) => void;
  onChange?: (event: React.ChangeEvent<T>) => void;
  className?: string;
  style?: React.CSSProperties;
  dataTestid?: string;
  children: (props: {
    isFocused: boolean;
    isShowLabel: boolean;
    isShowPlaceholder: boolean;
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
    isFocused: controlledFocused,
    setIsFocused,
    onChange,
    dataTestid = "BaseField_MAIN",
    hintText,
    isError,
    children,
  }: IBaseFieldProps<T>,
  ref: React.Ref<HTMLDivElement>,
) => {
  const [localFocused, setLocalFocused] = useState(false);
  const isFocused = controlledFocused ?? localFocused;

  const isLabelShown = !!labelText && (isFocused || value.length > 0);
  const isLabelPlaceholderShown =
    !!labelText && !isFocused && value.length === 0;

  const handleFocus = () => {
    setLocalFocused(true);
    setIsFocused?.(true);
  };

  const handleBlur = () => {
    setLocalFocused(false);
    setIsFocused?.(false);
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
          isFocused && styles["input--onfocus"],
          isLabelShown ? styles.labelPadding : styles.placeholderPadding,
          typography.body2Regular,
        )}
      >
        <div
          className={styles.inputContainerLabeled}
          data-testid={`${dataTestid}_INPUT_CONTAINER_LABELED`}
        >
          {isLabelShown && (
            <label
              htmlFor={id}
              className={joinClasses(
                typography.caption1Regular,
                isError && styles.error,
              )}
            >
              {labelText}
            </label>
          )}
          <div
            className={styles.inputContainerIcon}
            data-testid={`${dataTestid}_INPUT_CONTAINER_ICON`}
          >
            {inputLeftIcon}
            {children({
              isFocused,
              isShowLabel: isLabelShown,
              isShowPlaceholder: isLabelPlaceholderShown,
              handleFocus,
              handleBlur,
              handleChange,
            })}
          </div>
        </div>
        {isFocused && isClearable && value && (
          <Icons.General.Clear
            className={styles.clearIcon}
            onMouseDown={(e) => e.preventDefault()}
            onClick={handleClear}
            data-testid="Icons_CLEAR"
          />
        )}
      </div>
      {hintText && hintText.length > 0 && (
        <span
          data-testid={`${dataTestid}_HINT_TEXT`}
          className={joinClasses(
            styles.hintText,
            typography.body2Regular,
            isError && styles.error,
          )}
        >
          {hintText}
        </span>
      )}
    </div>
  );
};

export const BaseField = forwardRef(BaseFieldInner) as TBaseFieldComponent;
