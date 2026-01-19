import { Icons } from "@egov3/graphics";
import { useCallback, useRef, useState } from "react";
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
  defaultValue?: string;
  showClearButton?: boolean;
  placeholder?: string;
  "aria-label"?: string;
}

const langDic = i18n.MsgSearch;

export const SearchBar = ({
  lang,
  handleModalOpen,
  handleOnEnter,
  variant = "default",
  loading = false,
  disabled = false,
  defaultValue = "",
  showClearButton = true,
  placeholder = "",
  "aria-label": ariaLabel = "",
}: ISearchBarProps) => {
  const [value, setValue] = useState(defaultValue);
  const inputRef = useRef<HTMLInputElement>(null);

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
        if (handleModalOpen && !disabled) {
          handleModalOpen();
        }
      }
    },
    [variant, handleModalOpen, disabled],
  );

  const inputContainerClasses = joinClasses(
    styles.inputContainer,
    styles[`inputContainer--${variant}`],
  );

  const inputClasses = joinClasses(
    styles.input,
    variant === "chat" ? typography.body2Regular : typography.body1Regular,
  );

  const placeholderText =
    placeholder || langDic.MsgSearchInputPlaceHolder[lang];

  const ariaLabelText = ariaLabel || langDic.MsgSearchInputPlaceHolder[lang];

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
        <div className={styles.iconWrapper}>
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
          onChange={(e) => setValue(e.target.value)}
          disabled={disabled}
          readOnly={variant === "modal"}
          aria-label={ariaLabelText}
          placeholder={placeholderText}
          onClick={handleInputClick}
          onKeyDown={variant === "modal" ? undefined : handleKeyDown}
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
