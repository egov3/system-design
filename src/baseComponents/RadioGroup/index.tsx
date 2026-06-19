import { type ChangeEvent, useEffect, useId, useMemo, useState } from "react";
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
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

export interface IRadioGroupProps {
  radioGroupItems: IRadioGroupItem[];
  selectedDuplicateKey?: string;
  setSelectedDuplicateKey?: (value: string) => void;
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
  selectedDuplicateKey,
  setSelectedDuplicateKey,
  setSelectedOption,
  selectedOption,
}: IRadioGroupProps) => {
  const groupName = useId();
  const items = useMemo(() => {
    const valueCounts = new Map<string, number>();

    return radioGroupItems.map((item) => {
      const duplicateIndex = valueCounts.get(item.value) ?? 0;
      valueCounts.set(item.value, duplicateIndex + 1);

      return {
        ...item,
        inputValue: `${item.value}::${duplicateIndex}`,
      };
    });
  }, [radioGroupItems]);
  const [selectedInputValue, setSelectedInputValue] = useState("");
  const currentSelectedInputValue = selectedDuplicateKey ?? selectedInputValue;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextSelectedInputValue = event.target.value;
    const nextSelectedItem = items.find(
      (item) => item.inputValue === nextSelectedInputValue,
    );

    setSelectedInputValue(nextSelectedInputValue);

    if (nextSelectedItem) {
      setSelectedDuplicateKey?.(nextSelectedItem.inputValue);
      setSelectedOption(nextSelectedItem.value);
    }
  };

  useEffect(() => {
    const nextSelectedInputValue = (() => {
      const currentSelectedItem = items.find(
        (item) => item.inputValue === currentSelectedInputValue,
      );

      if (currentSelectedItem?.value === selectedOption) {
        return currentSelectedInputValue;
      }

      return (
        items.find((item) => item.value === selectedOption)?.inputValue ?? ""
      );
    })();

    setSelectedInputValue(nextSelectedInputValue);

    if (
      selectedDuplicateKey !== undefined &&
      nextSelectedInputValue !== selectedDuplicateKey
    ) {
      setSelectedDuplicateKey?.(nextSelectedInputValue);
    }
  }, [
    currentSelectedInputValue,
    items,
    selectedDuplicateKey,
    selectedOption,
    setSelectedDuplicateKey,
  ]);

  return (
    <fieldset
      className={styles.fieldsetGroup}
      data-testid="RadioGroup_FIELDSET"
    >
      {items.map((item) => (
        <CustomRadioButton
          key={item.inputValue}
          label={item.label}
          name={groupName}
          checked={currentSelectedInputValue === item.inputValue}
          onChange={handleChange}
          value={item.inputValue}
        />
      ))}
    </fieldset>
  );
};
