import { Icons } from "@egov3/graphics";
import { useCallback, useEffect, useRef, useState } from "react";
import { i18n } from "~constants/i18n";
import type { ILangProps } from "~interfaces/common";
import { debounce } from "~utils/debounce";
import { joinClasses } from "~utils/joinClasses";
import typography from "../../styles/typography.module.css";
import styles from "./SearchBar.module.css";

export interface ISearchBarProps extends ILangProps {
  handleModalOpen?: () => void;
  handleOnEnter?: (value: string) => void;
  handleOnClear?: () => void;
  handleOnChange?: (value: string) => void;
  variant?: "shadow" | "slim" | "default";
  loading?: boolean;
  disabled?: boolean;
  defaultValue?: string;
  showClearButton?: boolean;
  placeholder?: string;
  "aria-label"?: string;
  debounceDelay?: number;
}

const langDic = i18n.SearchBar;

export const SearchBar = ({
  lang,
  handleModalOpen,
  handleOnEnter,
  handleOnClear,
  handleOnChange,
  variant = "default",
  loading = false,
  disabled = false,
  defaultValue = "",
  showClearButton = true,
  placeholder = "",
  "aria-label": ariaLabel = "",
  debounceDelay = 300,
}: ISearchBarProps) => {
  const [value, setValue] = useState(defaultValue);
  const inputRef = useRef<HTMLInputElement>(null);

  const debouncedOnChangeRef = useRef<ReturnType<typeof debounce> | null>(null);

  useEffect(() => {
    debouncedOnChangeRef.current = debounce((value: string) => {
      if (handleOnChange) {
        handleOnChange(value);
      }
    }, debounceDelay);

    return () => {
      if (debouncedOnChangeRef.current) {
        debouncedOnChangeRef.current.cancel();
      }
    };
  }, [handleOnChange, debounceDelay]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (disabled || loading || !!handleModalOpen) return;

      if (event.key === "Enter") {
        event.preventDefault();
        if (handleOnEnter && value.trim()) {
          handleOnEnter(value.trim());
        }
      }
    },
    [disabled, loading, handleModalOpen, handleOnEnter, value],
  );

  const handleClear = useCallback(() => {
    if (disabled || loading) return;

    setValue("");

    if (debouncedOnChangeRef.current) {
      debouncedOnChangeRef.current.cancel();
    }

    handleOnEnter?.("");
    handleOnChange?.("");
    handleOnClear?.();

    inputRef.current?.focus();
  }, [disabled, loading, handleOnEnter, handleOnClear, handleOnChange]);

  const handleInputClick = useCallback(
    (event: React.MouseEvent<HTMLInputElement>) => {
      event.stopPropagation();

      if (handleModalOpen && !disabled) {
        handleModalOpen();
      }
    },
    [handleModalOpen, disabled],
  );

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);

    if (debouncedOnChangeRef.current) {
      debouncedOnChangeRef.current(newValue);
    }
  }, []);

  const inputContainerClasses = joinClasses(
    styles.inputContainer,
    styles[`inputContainer--${variant}`],
  );

  const inputClasses = joinClasses(
    styles.input,
    variant === "slim" ? typography.body2Regular : typography.body1Regular,
  );

  const placeholderText = placeholder || langDic.SearchInputPlaceHolder[lang];

  const ariaLabelText = ariaLabel || langDic.SearchInputAriaLabel[lang];

  return (
    <div
      data-testid="SearchBar_WRAPPER"
      className={styles.searchLayout}
      data-variant={variant}
      data-loading={loading}
      data-disabled={disabled}
    >
      <div
        data-testid="SearchBar_INPUT_CONTAINER_WRAPPER"
        className={inputContainerClasses}
      >
        <div className={styles.iconWrapper} data-testid="SearchBar_ICON_WRAP">
          {loading ? (
            <Icons.General.Loader
              className={styles.loadingIcon}
              data-testid="SearchBar_LOADING_ICON"
            />
          ) : (
            <Icons.General.Search
              className={styles.searchIcon}
              data-testid="SearchBar_SEARCH_ICON"
            />
          )}
        </div>
        <input
          ref={inputRef}
          data-testid="SearchBar_INPUT"
          value={value}
          onChange={handleChange}
          disabled={disabled}
          readOnly={!!handleModalOpen}
          aria-label={ariaLabelText}
          placeholder={placeholderText}
          onClick={handleInputClick}
          onKeyDown={handleKeyDown}
          className={inputClasses}
        />
        {showClearButton && value.length > 0 && !handleModalOpen && (
          <button
            data-testid="SearchBar_CLEAR_BUTTON"
            type="button"
            onClick={handleClear}
            className={styles.clearButton}
            aria-label={langDic.ClearSearch[lang]}
            disabled={disabled}
          >
            <Icons.General.Clear
              className={styles.clearIcon}
              data-testid="SearchBar_CLEAR_ICON"
            />
          </button>
        )}
      </div>
    </div>
  );
};
