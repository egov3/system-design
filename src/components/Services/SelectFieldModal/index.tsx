import type { ReactNode } from "react";

import type { ILangProps } from "~interfaces/common";

import {
  type IRadioGroupItem,
  Modal,
  RadioGroup,
  SearchBar,
} from "~baseComponents";
import { joinClasses } from "~utils/joinClasses";

import styles from "./SelectFieldModal.module.css";

export interface ISelectFieldModalProps extends ILangProps {
  title: string;
  name: string;
  options: IRadioGroupItem[];
  selectedValue: string;
  onSelect: (value: string) => void;
  isWithSearch?: boolean;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  isFixedHeight?: boolean;
  emptyState?: ReactNode;
  confirmLabel: string;
  onConfirm: () => void;
  onClose: () => void;
}

export const SelectFieldModal = ({
  title,
  name,
  options,
  selectedValue,
  onSelect,
  isWithSearch,
  searchValue,
  onSearchChange,
  isFixedHeight,
  emptyState,
  confirmLabel,
  onConfirm,
  onClose,
  lang,
}: ISelectFieldModalProps) => (
  <Modal
    lang={lang}
    variant="small"
    isOpen={true}
    setIsOpen={onClose}
    isContentScroll={true}
    header={{ title, isClosable: true }}
    footerButtons={[
      {
        text: confirmLabel,
        onClick: onConfirm,
        isDisabled: !selectedValue,
        dataTestid: "SelectFieldModal_CONFIRM_BTN",
      },
    ]}
  >
    <div
      className={joinClasses(
        styles.modalBody,
        isWithSearch && styles.modalBodyWithSearch,
      )}
      data-testid="SelectFieldModal_MODAL"
    >
      {isWithSearch && (
        <div
          className={styles.searchWrapper}
          data-testid="SelectFieldModal_SEARCH"
        >
          <SearchBar
            lang={lang}
            variant="default"
            showClearButton={true}
            debounceDelay={0}
            defaultValue={searchValue}
            handleOnChange={onSearchChange}
            handleOnClear={() => onSearchChange?.("")}
          />
        </div>
      )}
      <div
        className={joinClasses(
          styles.optionsWrapper,
          isFixedHeight && styles.optionsWrapperFixed,
          isFixedHeight && options.length === 0 && styles.optionsWrapperEmpty,
        )}
        data-testid="SelectFieldModal_OPTIONS"
      >
        {options.length > 0 ? (
          <RadioGroup
            name={name}
            legend={title}
            radioGroupItems={options}
            selectedOption={selectedValue}
            setSelectedOption={onSelect}
          />
        ) : (
          emptyState
        )}
      </div>
    </div>
  </Modal>
);
