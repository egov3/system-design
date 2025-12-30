import { Icons } from "@egov3/graphics";
import { useCallback, useEffect, useRef, useState } from "react";
import { i18n } from "~constants/i18n";
import type { ILangProps } from "~interfaces/common";
import { joinClasses } from "~utils/joinClasses";
import typography from "../../styles/typography.module.css";
import styles from "./SearchBar.module.css";

export interface ISearchBarProps extends ILangProps {
  handleModalOpen?: () => void;
  handleOnEnter?: (value: string) => void;
  variant?: "modal" | "chat" | "default";
  loading?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
  defaultValue?: string;
  className?: string;
  showClearButton?: boolean;
}

const langDic = i18n.MsgSearch;

export const SearchBar = ({
  lang,
  handleModalOpen,
  handleOnEnter,
  variant = "default",
  loading = false,
  disabled = false,
  autoFocus = true,
  defaultValue = "",
  className,
  showClearButton = true,
}: ISearchBarProps) => {
  const [value, setValue] = useState(defaultValue);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus && inputRef.current && variant !== "modal") {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [autoFocus, variant]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (disabled || loading) return;

      if (event.key === "Enter") {
        event.preventDefault();
        if (handleOnEnter && value.trim()) {
          handleOnEnter(value.trim());
        }
      }
    },
    [disabled, loading, handleOnEnter, value],
  );

  const handleClear = useCallback(() => {
    if (disabled || loading) return;

    setValue("");

    if (handleOnEnter) {
      handleOnEnter("");
    }

    inputRef.current?.focus();
  }, [disabled, loading, handleOnEnter]);

  const handleInputClick = useCallback(
    (event: React.MouseEvent<HTMLInputElement>) => {
      if (variant === "modal") {
        event.stopPropagation();
        if (handleModalOpen && !disabled && !loading) {
          handleModalOpen();
        }
      }
    },
    [variant, handleModalOpen, disabled, loading],
  );

  const inputContainerClasses = joinClasses(
    styles.inputContainer,
    styles[`inputContainer--${variant}`],
    variant === "chat" ? typography.body2Regular : typography.body1Regular,
  );

  const inputClasses = joinClasses(styles.input, styles[`input--${variant}`], {
    [styles.inputLoading]: loading,
    [styles.inputDisabled]: disabled,
    [styles.inputReadOnly]: variant === "modal",
  });

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
        {loading ? (
          <Icons.General.Loader
            className={styles.searchIcon}
            data-testid="SearchBar_LOADING_ICON"
          />
        ) : (
          <Icons.General.Search
            className={styles.searchIcon}
            data-testid="SearchBar_SEARCH_ICON"
          />
        )}
        <input
          ref={inputRef}
          data-testid="SearchBar_INPUT"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={disabled}
          readOnly={variant === "modal"}
          aria-label={langDic.MsgSearchInputPlaceHolder[lang]}
          placeholder={langDic.MsgSearchInputPlaceHolder[lang]}
          onClick={handleInputClick}
          onKeyDown={variant === "modal" ? undefined : handleKeyDown}
          onFocus={() => variant !== "modal" && setIsFocused(true)}
          onBlur={() => variant !== "modal" && setIsFocused(false)}
          className={inputClasses}
        />
        {showClearButton && value.length > 0 && variant !== "modal" && (
          <button
            data-testid="SearchBar_CLEAR_BUTTON"
            type="button"
            onClick={handleClear}
            className={styles.clearButton}
            aria-label="Clear search"
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
