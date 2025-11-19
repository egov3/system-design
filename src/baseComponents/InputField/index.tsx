// src/baseComponents/InputField/index.tsx
import type React from "react";
import {
  forwardRef,
  type HTMLInputTypeAttribute,
  type JSX,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { ClearIcon } from "~svg";
import { joinClasses } from "~utils/joinClasses";
import typography from "../../styles/typography.module.css";
import styles from "./InputField.module.css";

export interface IInputFieldProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>,
    HTMLInputElement | HTMLTextAreaElement
  > {
  onFocus?: () => void;
  onBlur?: () => void;
  onEnterPress?: (
    event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  value?: string;
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
  dataTestid?: string;
  variant?: "default" | "code";
  autoExpand?: boolean;
}

export const InputField = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  IInputFieldProps
>(
  (
    {
      onFocus,
      onBlur,
      onChange,
      onEnterPress,
      value = "",
      inputLeftIcon,
      className = "",
      style,
      isClearable = false,
      type = "text",
      id,
      labelText = "",
      ariaLabel,
      focused: controlledFocused,
      setFocused: setControlledFocused,
      readOnly = false,
      dataTestid = "InputField_MAIN",
      variant = "default",
      autoExpand = false,
    }: IInputFieldProps,
    ref,
  ) => {
    const [localFocused, setLocalFocused] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const isControlled = controlledFocused !== undefined;
    const focused = isControlled ? controlledFocused : localFocused;

    const isLabelShown = labelText.length > 0 && (focused || value.length > 0);
    const isLabelPlaceholderShown = value.length === 0 && !focused;

    const handleClear = () => {
      if (onChange) {
        onChange({
          target: { value: "" },
        } as React.ChangeEvent<HTMLInputElement>);
      }
    };
    const handleFocus = () => {
      if (!isControlled) {
        setLocalFocused(true);
      }
      setControlledFocused?.(true);
      if (onFocus) onFocus();
    };
    const handleBlur = () => {
      if (!isControlled) {
        setLocalFocused(false);
      }
      setControlledFocused?.(false);
      if (onBlur) onBlur();
    };
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (onEnterPress && event.key === "Enter") {
        onEnterPress(event);
      }
    };
    const handleTextareaInput = (
      event: React.FormEvent<HTMLTextAreaElement>,
    ) => {
      const textarea = event.currentTarget;
      textarea.style.height = "24px";
      textarea.style.height = `${textarea.scrollHeight}px`;
      if (onChange) {
        onChange(event as React.ChangeEvent<HTMLTextAreaElement>);
      }
    };

    useImperativeHandle(ref, () => {
      if (autoExpand) {
        return textareaRef.current as HTMLTextAreaElement;
      } else {
        return inputRef.current as HTMLInputElement;
      }
    }, [autoExpand]);

    const commonProps = {
      "data-testid": "InputField_INPUT",
      "aria-label": ariaLabel,
      id,
      className: joinClasses(
        styles.input,
        variant === "code" && styles.code,
        type === "text" ? typography.body2Regular : undefined,
      ),
      placeholder: isLabelPlaceholderShown ? labelText : "",
      "aria-placeholder": isLabelPlaceholderShown ? labelText : "",
      onFocus: handleFocus,
      onBlur: handleBlur,
      onChange,
      value,
      readOnly: readOnly || !onChange,
    };

    return (
      <div
        data-testid={dataTestid}
        className={joinClasses(
          styles.inputContainer,
          focused ? styles[`input--onfocus`] : undefined,
          type === "text" ? typography.body2Regular : undefined,
          styles[`input-${type?.toLocaleLowerCase()}`],
          isLabelShown ? styles.labelPadding : styles.placeholderPadding,
          className,
        )}
        style={style}
      >
        <div
          className={styles.inputContainerLabeled}
          data-testid="InputField_WRAP_W_LABEL"
        >
          {isLabelShown && (
            <label
              htmlFor={id}
              data-testid="InputField_LABEL"
              className={typography.caption1Regular}
            >
              {labelText}
            </label>
          )}
          <div
            className={styles.inputContainerIcon}
            data-testid="InputField_WRAP_LEFT_ICON"
          >
            {inputLeftIcon}
            {autoExpand ? (
              <textarea
                ref={textareaRef}
                onInput={handleTextareaInput}
                {...commonProps}
              />
            ) : (
              <input
                ref={inputRef}
                type={type}
                onKeyDown={handleKeyDown}
                {...commonProps}
              />
            )}
          </div>
        </div>
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
  },
);
