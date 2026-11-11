import { SearchIcon } from "@egov3/graphics/General/Search";
import { useEffect, useRef, useState } from "react";

import type { ILangProps } from "~interfaces/common";

import { i18n } from "~constants/i18n";
import { joinClasses } from "~utils/joinClasses";

import { RadioGroup } from "../RadioGroup";
import { SearchBar } from "../SearchBar";
import { SelectBoxButton } from "../SelectBoxButton";
import { Typography } from "../Typography";
import styles from "./DropdownSelect.module.css";

export interface IDropdownSelectItem {
  label: string;
  value: string;
  hintText?: string;
}

export interface IDropdownSelectProps extends ILangProps {
  labelText: string;
  name: string;
  options: IDropdownSelectItem[];
  selectedOption: string;
  setSelectedOption: (value: string) => void;
  disabled?: boolean;
  error?: boolean;
  isWithSearch?: boolean;
  isLoading?: boolean;
}

export const DropdownSelect = ({
  labelText,
  name,
  options,
  selectedOption,
  setSelectedOption,
  disabled = false,
  error = false,
  isWithSearch = false,
  isLoading = false,
  lang,
}: IDropdownSelectProps) => {
  const langDic = i18n.DropdownSelect;
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const wrapperRef = useRef<HTMLDivElement>(null);
  const selectedLabel =
    options.find((option) => option.value === selectedOption)?.label ?? "";

  const normalizedQuery = query.trim().toLowerCase();
  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(normalizedQuery),
  );
  const emptyText =
    isLoading || options.length === 0
      ? langDic.NoResults[lang]
      : langDic.NothingFound[lang];

  const close = () => {
    setIsOpen(false);
    setQuery("");
  };

  const handleSelect = (value: string) => {
    setSelectedOption(value);
    close();
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleOutsideClick = (event: MouseEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        close();
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div
      ref={wrapperRef}
      className={styles.wrapper}
      data-testid="DropdownSelect_WRAPPER"
    >
      <SelectBoxButton
        labelText={labelText}
        modalValue={selectedLabel}
        disabled={disabled}
        error={error}
        isOpen={isOpen}
        lang={lang}
        handleClick={() => {
          if (isOpen) {
            close();
            return;
          }
          setIsOpen(true);
        }}
      />
      {isOpen && isWithSearch && (
        <div className={styles.searchPanel} data-testid="DropdownSelect_PANEL">
          <div
            className={styles.searchWrapper}
            data-testid="DropdownSelect_SEARCH"
          >
            <SearchBar
              lang={lang}
              variant="base"
              loading={isLoading}
              debounceDelay={0}
              handleOnChange={setQuery}
            />
          </div>
          {!isLoading && filteredOptions.length > 0 ? (
            <div
              className={joinClasses(styles.list, styles.searchList)}
              data-testid="DropdownSelect_LIST"
            >
              <RadioGroup
                radioGroupItems={filteredOptions}
                selectedOption={selectedOption}
                setSelectedOption={handleSelect}
                name={name}
                legend={labelText}
              />
            </div>
          ) : (
            <div className={styles.empty} data-testid="DropdownSelect_EMPTY">
              <div
                className={styles.emptyIcon}
                data-testid="DropdownSelect_EMPTY_ICON"
              >
                <SearchIcon width={32} height={32} />
              </div>
              <Typography
                tag="span"
                fontClass="body2Regular"
                className={styles.emptyText}
                data-testid="DropdownSelect_EMPTY_TEXT"
              >
                {emptyText}
              </Typography>
            </div>
          )}
        </div>
      )}
      {isOpen && !isWithSearch && (
        <div className={styles.panel} data-testid="DropdownSelect_PANEL">
          <div className={styles.list}>
            <RadioGroup
              radioGroupItems={options}
              selectedOption={selectedOption}
              setSelectedOption={handleSelect}
              name={name}
              legend={labelText}
            />
          </div>
        </div>
      )}
    </div>
  );
};
