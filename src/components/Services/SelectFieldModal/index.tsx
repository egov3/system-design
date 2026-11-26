import { type ReactNode, useMemo, useState } from "react";

import type { ILangProps } from "~interfaces/common";

import { i18n } from "~constants/i18n";
import { joinClasses } from "~utils/joinClasses";

import { Modal } from "../../../baseComponents/Modal";
import {
  type IRadioGroupItem,
  RadioGroup,
} from "../../../baseComponents/RadioGroup";
import { SearchBar } from "../../../baseComponents/SearchBar";
import styles from "./SelectFieldModal.module.css";

export interface ISelectFieldModalProps extends ILangProps {
  title: string;
  name: string;
  options: IRadioGroupItem[];
  selected: string;
  isWithSearch?: boolean;
  isFixedHeight?: boolean;
  emptyState?: ReactNode;
  confirmLabel?: string;
  onConfirm: (value: string) => void;
  onClose: () => void;
}

export const SelectFieldModal = ({
  title,
  name,
  options,
  selected,
  isWithSearch,
  isFixedHeight,
  emptyState,
  confirmLabel,
  onConfirm,
  onClose,
  lang,
}: ISelectFieldModalProps) => {
  const [pending, setPending] = useState(selected);
  const [query, setQuery] = useState("");

  const filteredOptions = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return normalized
      ? options.filter((item) => item.label.toLowerCase().includes(normalized))
      : options;
  }, [options, query]);

  return (
    <Modal
      lang={lang}
      variant="small"
      isOpen={true}
      setIsOpen={onClose}
      isContentScroll={true}
      header={{ title, isClosable: true }}
      footerButtons={[
        {
          text: confirmLabel ?? i18n.Common.Select[lang],
          onClick: () => onConfirm(pending),
          isDisabled: !pending,
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
              variant="base"
              showClearButton={true}
              debounceDelay={0}
              handleOnChange={setQuery}
              handleOnClear={() => setQuery("")}
            />
          </div>
        )}
        <div
          className={joinClasses(
            styles.optionsWrapper,
            isFixedHeight && styles.optionsWrapperFixed,
            isFixedHeight &&
              filteredOptions.length === 0 &&
              styles.optionsWrapperEmpty,
          )}
          data-testid="SelectFieldModal_OPTIONS"
        >
          {filteredOptions.length > 0 ? (
            <RadioGroup
              name={name}
              legend={title}
              radioGroupItems={filteredOptions}
              selectedOption={pending}
              setSelectedOption={setPending}
            />
          ) : (
            (emptyState ?? i18n.Common.NoResults[lang])
          )}
        </div>
      </div>
    </Modal>
  );
};
