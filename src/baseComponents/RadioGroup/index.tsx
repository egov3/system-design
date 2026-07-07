import type React from "react";
import { joinClasses } from "~utils/joinClasses";
import typography from "../../styles/typography.module.css";
import styles from "./RadioGroup.module.css";

export interface IRadioGroupItem {
  label: string;
  value: string;
  hintText?: string;
}

export interface ICustomRadioButtonProps {
  label: string;
  name: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  hintText?: string;
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
  hintText,
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
    <div
      className={styles.labelGroupWrap}
      data-testid="RadioGroupItem_LABEL_WRAP"
    >
      <span
        data-testid="RadioGroupItem_TEXT"
        className={joinClasses(styles.radioBtnText, typography.body2Regular)}
      >
        {label}
      </span>
      {hintText && (
        <span
          data-testid="RadioGroupItemHint_TEXT"
          className={joinClasses(styles.hintText, typography.caption1Regular)}
        >
          {hintText}
        </span>
      )}
    </div>
  </label>
);

export const RadioGroup = ({
  radioGroupItems,
  setSelectedOption,
  selectedOption,
}: IRadioGroupProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };
  return (
    <fieldset
      className={styles.fieldsetGroup}
      data-testid="RadioGroup_FIELDSET"
    >
      {radioGroupItems.map((item) => (
        <CustomRadioButton
          key={item.value}
          label={item.label}
          name="radio"
          checked={selectedOption === item.value}
          onChange={handleChange}
          value={item.value}
          hintText={item.hintText}
        />
      ))}
    </fieldset>
  );
};
