import { useEffect, useRef, useState } from "react";
import type { ILangProps } from "~interfaces/common";
import { RadioGroup } from "../RadioGroup";
import { SelectBoxButton } from "../SelectBoxButton";
import styles from "./DropdownSelect.module.css";

export interface IDropdownSelectItem {
  label: string;
  value: string;
  hintText?: string;
}

export interface IDropdownSelectProps extends ILangProps {
  labelText: string;
  options: IDropdownSelectItem[];
  selectedOption: string;
  setSelectedOption: (value: string) => void;
  disabled?: boolean;
  error?: boolean;
}

export const DropdownSelect = ({
  labelText,
  options,
  selectedOption,
  setSelectedOption,
  disabled = false,
  error = false,
  lang,
}: IDropdownSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const selectedLabel =
    options.find((option) => option.value === selectedOption)?.label ?? "";

  const handleSelect = (value: string) => {
    setSelectedOption(value);
    setIsOpen(false);
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleOutsideClick = (event: MouseEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
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
          setIsOpen(!isOpen);
        }}
      />
      {isOpen && (
        <div className={styles.panel} data-testid="DropdownSelect_PANEL">
          <div className={styles.list}>
            <RadioGroup
              radioGroupItems={options}
              selectedOption={selectedOption}
              setSelectedOption={handleSelect}
            />
          </div>
        </div>
      )}
    </div>
  );
};
