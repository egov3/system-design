import type { ILangProps } from "~interfaces/common";

import { RadioGroup, SelectBoxButton, Typography } from "~baseComponents";

import styles from "./SelectOrRadioField.module.css";

export interface ISelectOrRadioFieldItem {
  value: string;
  label: string;
  hintText?: string;
}

export interface ISelectOrRadioFieldProps extends ILangProps {
  isModalMode: boolean;
  name: string;
  legend: string;
  placeholderText: string;
  hintText?: string;
  items: ISelectOrRadioFieldItem[];
  selectedValue: string;
  onSelect: (value: string) => void;
  onOpenModal: () => void;
}

export const SelectOrRadioField = ({
  isModalMode,
  name,
  legend,
  placeholderText,
  hintText,
  items,
  selectedValue,
  onSelect,
  onOpenModal,
  lang,
}: ISelectOrRadioFieldProps) => {
  const selectedLabel = items.find(
    (item) => item.value === selectedValue,
  )?.label;

  return (
    <div className={styles.wrapper} data-testid="SelectOrRadioField_WRAPPER">
      {isModalMode ? (
        <SelectBoxButton
          lang={lang}
          disabled={false}
          labelText={placeholderText}
          modalValue={selectedLabel}
          handleClick={onOpenModal}
        />
      ) : (
        <RadioGroup
          name={name}
          legend={legend}
          radioGroupItems={items}
          selectedOption={selectedValue}
          setSelectedOption={onSelect}
        />
      )}
      {hintText && (
        <Typography
          tag="p"
          fontClass="body2Regular"
          className={styles.hint}
          data-testid="SelectOrRadioField_HINT"
        >
          {hintText}
        </Typography>
      )}
    </div>
  );
};
