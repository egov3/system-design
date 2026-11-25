import { Dispatch, SetStateAction } from "react";

import { Modal, RadioGroup, SelectBoxButton } from "~baseComponents";
import { i18n } from "~constants/i18n";
import { ILangProps } from "~interfaces/common";

import styles from "./SelectRequestTypeUI.module.css";

export const requestType = {
  self: "self",
  thirdParty: "thirdParty",
} as const;

export type TRequestType = keyof typeof requestType;

export interface IRequestTypeOption {
  label: string;
  value: TRequestType;
}

interface ISelectRequestTypeUIProps extends ILangProps {
  isOpenModal: boolean;
  isCloseModal: Dispatch<SetStateAction<boolean>>;
  isDisabledModalSelectBtn: boolean | undefined;
  selectedLabel?: string;
  pendingRequestType: TRequestType | null;
  requestTypeOptions: IRequestTypeOption[];
  onOpen: () => void;
  onRequestTypeSelect: () => void;
  onRequestTypeChange: (value: string) => void;
}

export const SelectRequestTypeUI = ({
  isOpenModal,
  isCloseModal,
  isDisabledModalSelectBtn,
  lang,
  selectedLabel,
  pendingRequestType,
  requestTypeOptions,
  onOpen,
  onRequestTypeSelect,
  onRequestTypeChange,
}: ISelectRequestTypeUIProps) => {
  const langDic = i18n.Common;
  return (
    <>
      <SelectBoxButton
        modalValue={selectedLabel}
        handleClick={onOpen}
        labelText={langDic.selectRequestType[lang]}
        disabled={false}
        lang={lang}
        data-testid="P3301ModalRequestType_SelectBoxModal_BUTTON"
      />

      {isOpenModal && (
        <Modal
          isOpen={isOpenModal}
          setIsOpen={isCloseModal}
          isContentScroll={false}
          header={{
            title: langDic.selectRequestType[lang],
            isClosable: true,
          }}
          lang={lang}
          variant="small"
          data-testid="P3301ModalRequestType_Modal_WRAPPER"
          footerButtons={[
            {
              text: langDic.select[lang],
              onClick: onRequestTypeSelect,
              isDisabled: isDisabledModalSelectBtn,
              dataTestid: "P3301Steps_RequestTypeSave_BTN",
            },
          ]}
        >
          <div
            className={styles.radioGroupPadding}
            data-testid="P3301ModalRequestType_RadioGroupContent"
          >
            <RadioGroup
              name="requestType"
              legend={langDic.selectRequestType[lang]}
              setSelectedOption={onRequestTypeChange}
              selectedOption={pendingRequestType ?? ""}
              radioGroupItems={requestTypeOptions}
              data-testid="P3301ModalRequestType_RadioGroup"
            />
          </div>
        </Modal>
      )}
    </>
  );
};
