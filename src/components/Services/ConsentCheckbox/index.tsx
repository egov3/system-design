import { useState } from "react";

import type { ILangProps } from "~interfaces/common";

import { Checkbox, Modal, Typography } from "~baseComponents";
import { i18n } from "~constants/i18n";

import styles from "./ConsentCheckbox.module.css";

export interface IConsentCheckboxProps extends ILangProps {
  isChecked: boolean;
  setIsChecked: (isChecked: boolean) => void;
  modalText: string;
  label?: string;
  actionLabel?: string;
  isHintShown?: boolean;
}

const langDic = i18n.ConsentCheckbox;

export const ConsentCheckbox = ({
  lang,
  isChecked,
  setIsChecked,
  modalText,
  label = langDic.label[lang],
  actionLabel = langDic.actionLabel[lang],
  isHintShown = false,
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
      {isHintShown && (
        <Typography
          tag="p"
          fontClass="body2Regular"
          className={styles.hint}
          data-testid="ConsentCheckbox_HINT"
        >
          {langDic.hint[lang]}
        </Typography>
      )}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          header={{ title: langDic.title[lang], isClosable: true }}
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
