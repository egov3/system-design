import { useState } from "react";

import type { ILangProps } from "~interfaces/common";

import { i18n } from "~constants/i18n";

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
  selected: string;
  confirmLabel?: string;
  onConfirm: (value: string) => void;
  onClose: () => void;
}

export const SelectFieldModal = ({
  title,
  name,
  options,
  selected,
  confirmLabel,
  onConfirm,
  onClose,
  lang,
}: ISelectFieldModalProps) => {
  const [pending, setPending] = useState(selected);

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
      <div className={styles.modalBody} data-testid="SelectFieldModal_MODAL">
        <div
          className={styles.optionsWrapper}
          data-testid="SelectFieldModal_OPTIONS"
        >
          <RadioGroup
            name={name}
            legend={title}
            radioGroupItems={options}
            selectedOption={pending}
            setSelectedOption={setPending}
          />
        </div>
      </div>
    </Modal>
  );
};
