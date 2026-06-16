import type React from "react";
import { useMemo, useState } from "react";
import { joinClasses } from "~utils/joinClasses";
import typography from "../../styles/typography.module.css";
import styles from "./RadioGroup.module.css";

export interface IRadioGroupItem {
  label: string;
  value: string;
}

export interface ICustomRadioButtonProps {
  label: string;
  name: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

export interface IRadioGroupProps {
  radioGroupItems: IRadioGroupItem[];
  setSelectedOption: (value: string) => void;
  selectedOption: string;
}

export const CustomRadioButton = ({
  label,
  name,
  checked,
  onChange,
  value,
}: ICustomRadioButtonProps) => (
  <label data-testid="RadioGroupItem_LABEL" className={styles.radio}>
    <input
      data-testid="RadioGroupItem_INPUT"
      value={value}
      type="radio"
      name={name}
      checked={checked}
      onChange={onChange}
    />
    <span data-testid="RadioGroupItem_RADIO" className={styles.radioBtn}></span>
    <span
      data-testid="RadioGroupItem_TEXT"
      className={joinClasses(styles.radioBtnText, typography.body2Regular)}
    >
      {label}
    </span>
  </label>
);

export const RadioGroup = ({
  radioGroupItems,
  setSelectedOption,
  selectedOption,
}: IRadioGroupProps) => {
  const itemsWithIds = useMemo(
    () =>
      radioGroupItems.map((item) => ({
        ...item,
        uniqueId: `${crypto.randomUUID()}`,
      })),
    [radioGroupItems],
  );

  const [selectedIndex, setSelectedIndex] = useState<number>(() =>
    itemsWithIds.findIndex((item) => item.value === selectedOption),
  );

  const selectedUniqueId =
    selectedIndex >= 0 ? itemsWithIds[selectedIndex].uniqueId : null;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uniqueId = event.target.value;
    const index = itemsWithIds.findIndex((item) => item.uniqueId === uniqueId);
    const item = itemsWithIds[index];
    setSelectedIndex(index);
    setSelectedOption(item.value);
  };

  return (
    <fieldset
      className={styles.fieldsetGroup}
      data-testid="RadioGroup_FIELDSET"
    >
      {itemsWithIds.map((item) => (
        <CustomRadioButton
          key={item.uniqueId}
          label={item.label}
          name="radio"
          checked={selectedUniqueId === item.uniqueId}
          onChange={handleChange}
          value={item.uniqueId}
        />
      ))}
    </fieldset>
  );
};
