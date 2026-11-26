import { useState } from "react";

import { Modal, RadioGroup, SelectBoxButton } from "~baseComponents";
import { i18n } from "~constants/i18n";
import { ISelectRequestTypeUIProps } from "~interfaces/SelectRequestTypeUI";

import styles from "./SelectRequestTypeUI.module.css";

export const SelectRequestTypeUI = ({
  isDisabledModalSelectBtn,
  lang,
  selectedLabel,
  pendingRequestType,
  requestTypeOptions,
  handleClickSelectBox,
  onRequestTypeSelect,
  onRequestTypeChange,
}: ISelectRequestTypeUIProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const langDic = i18n.Common;

  const handleClick = () => {
    handleClickSelectBox();
    setIsOpen(true);
  };

  const handleSelect = () => {
    onRequestTypeSelect();
    setIsOpen(false);
  };

  return (
    <>
      <SelectBoxButton
        modalValue={selectedLabel}
        handleClick={handleClick}
        labelText={langDic.selectRequestType[lang]}
        disabled={false}
        lang={lang}
      />
      {isOpen && (
        <Modal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          isContentScroll={false}
          header={{
            title: langDic.selectRequestType[lang],
            isClosable: true,
          }}
          lang={lang}
          variant="small"
          data-testid="SelectRequestTypeUI_Modal_WRAPPER"
          footerButtons={[
            {
              text: langDic.select[lang],
              onClick: handleSelect,
              isDisabled: isDisabledModalSelectBtn,
              dataTestid: "SelectRequestTypeUI_RequestTypeSave_BTN",
            },
          ]}
        >
          <div
            className={styles.radioGroupPadding}
            data-testid="SelectRequestTypeUI_RadioGroupContent"
          >
            <RadioGroup
              name="requestType"
              legend={langDic.selectRequestType[lang]}
              setSelectedOption={onRequestTypeChange}
              selectedOption={pendingRequestType ?? ""}
              radioGroupItems={requestTypeOptions}
              data-testid="SelectRequestTypeUI_RadioGroup"
            />
          </div>
        </Modal>
      )}
    </>
  );
};
