import type { ILangProps } from "~interfaces/common";

import { Modal } from "../../../baseComponents/Modal";
import {
  type IRadioGroupItem,
  RadioGroup,
} from "../../../baseComponents/RadioGroup";
import styles from "./SelectFieldModal.module.css";

export interface ISelectFieldModalProps extends ILangProps {
  title: string;
  name: string;
  options: IRadioGroupItem[];
  selectedValue: string;
  onSelect: (value: string) => void;
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
    <div className={styles.modalBody} data-testid="SelectFieldModal_MODAL">
      <div
        className={styles.optionsWrapper}
        data-testid="SelectFieldModal_OPTIONS"
      >
        <RadioGroup
          name={name}
          legend={title}
          radioGroupItems={options}
          selectedOption={selectedValue}
          setSelectedOption={onSelect}
        />
      </div>
    </div>
  </Modal>
);
