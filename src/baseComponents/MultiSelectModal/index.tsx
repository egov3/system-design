import { useState } from "react";
import { i18n } from "~constants/i18n";
import type { ILangProps } from "~interfaces/common";
import { Checkbox } from "../Checkbox";
import { Modal } from "../Modal";
import { SearchBar } from "../SearchBar";
import { SelectBoxButton } from "../SelectBoxButton";
import styles from "./MultiSelectModal.module.css";

export interface IMultiSelectModalItem {
  label: string;
  value: string;
}

export interface IMultiSelectModalProps extends ILangProps {
  labelText: string;
  modalTitle: string;
  options: IMultiSelectModalItem[];
  selectedOptions: string[];
  setSelectedOptions: (values: string[]) => void;
  disabled?: boolean;
  error?: boolean;
  searchPlaceholder?: string;
}

export const MultiSelectModal = ({
  labelText,
  modalTitle,
  options,
  selectedOptions,
  setSelectedOptions,
  disabled = false,
  error = false,
  searchPlaceholder,
  lang,
}: IMultiSelectModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [draftOptions, setDraftOptions] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState("");

  const selectedLabels = options
    .filter((option) => selectedOptions.includes(option.value))
    .map((option) => option.label)
    .join(", ");

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchValue.trim().toLowerCase()),
  );

  const handleOpen = () => {
    setDraftOptions(selectedOptions);
    setSearchValue("");
    setIsOpen(true);
  };

  const handleToggle = (value: string, checked: boolean) => {
    setDraftOptions(
      checked
        ? [...draftOptions, value]
        : draftOptions.filter((draftValue) => draftValue !== value),
    );
  };

  const handleSubmit = () => {
    setSelectedOptions(draftOptions);
    setIsOpen(false);
  };

  return (
    <>
      <SelectBoxButton
        labelText={labelText}
        modalValue={selectedLabels}
        disabled={disabled}
        error={error}
        lang={lang}
        handleClick={handleOpen}
      />
      {isOpen && (
        <Modal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          lang={lang}
          variant="small"
          header={{ title: modalTitle, isClosable: true }}
          footerButtons={[
            {
              text: i18n.MultiSelectModal.SubmitButton[lang],
              onClick: handleSubmit,
              isDisabled: draftOptions.length === 0,
              dataTestid: "MultiSelectModal_SUBMIT",
            },
          ]}
        >
          <div
            className={styles.content}
            data-testid="MultiSelectModal_CONTENT"
          >
            <SearchBar
              lang={lang}
              variant="base"
              placeholder={searchPlaceholder}
              handleOnChange={setSearchValue}
            />
            {filteredOptions.map((option) => (
              <Checkbox
                key={option.value}
                label={option.label}
                checked={draftOptions.includes(option.value)}
                setChecked={(checked) => {
                  handleToggle(option.value, checked);
                }}
              />
            ))}
          </div>
        </Modal>
      )}
    </>
  );
};
