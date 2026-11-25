import { useState } from "react";

import type { ILangProps } from "~interfaces/common";

import { Checkbox, Modal, Typography } from "~baseComponents";

import styles from "./ConsentCheckbox.module.css";

export interface IConsentCheckboxProps extends ILangProps {
  label: string;
  actionLabel: string;
  isChecked: boolean;
  setIsChecked: (isChecked: boolean) => void;
  modalTitle: string;
  modalText: string;
  hintText?: string;
}

export const ConsentCheckbox = ({
  lang,
  label,
  actionLabel,
  isChecked,
  setIsChecked,
  modalTitle,
  modalText,
  hintText,
}: IConsentCheckboxProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <div className={styles.wrapper} data-testid="ConsentCheckbox_WRAPPER">
      <Checkbox
        label={label}
        actionLabel={actionLabel}
        checked={isChecked}
        setChecked={setIsChecked}
        onActionClick={() => setIsModalOpen(true)}
      />
      {hintText && (
        <Typography
          tag="p"
          fontClass="body2Regular"
          className={styles.hint}
          data-testid="ConsentCheckbox_HINT"
        >
          {hintText}
        </Typography>
      )}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          header={{ title: modalTitle, isClosable: true }}
          lang={lang}
          variant="small"
        >
          <div
            className={styles.modalContent}
            data-testid="ConsentCheckbox_MODAL_CONTENT"
          >
            <Typography
              tag="p"
              fontClass="body2Regular"
              data-testid="ConsentCheckbox_MODAL_TEXT"
            >
              {modalText}
            </Typography>
          </div>
        </Modal>
      )}
    </div>
  );
};
