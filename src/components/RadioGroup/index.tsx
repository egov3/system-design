import React, { useState } from "react";

export interface RadioGroupItem {
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
  RadioGroupItems: RadioGroupItem[];
  invokeCustomOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

import styles from "./RadioGroup.module.scss";

export const CustomRadioButton = ({
  label,
  name,
  checked,
  onChange,
  value,
}: ICustomRadioButtonProps) => {
  return (
    <label data-testid="RadioGroupItem_LABEL" className={styles.radio}>
      <input
        data-testid="RadioGroupItem_INPUT"
        value={value}
        type="radio"
        name={name}
        checked={checked}
        onChange={onChange}
      />
      <span
        data-testid="RadioGroupItem_RADIO"
        className={styles.radioBtn}
      ></span>
      <span data-testid="RadioGroupItem_TEXT" className={styles.radioBtnText}>
        {label}
      </span>
    </label>
  );
};

export const RadioGroup = ({
  RadioGroupItems,
  invokeCustomOnChange,
}: IRadioGroupProps) => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
    invokeCustomOnChange(event);
  };
  return (
    <fieldset data-testid="RadioGroup_FIELDSET">
      {RadioGroupItems.map((item) => (
        <CustomRadioButton
          key={item.label}
          label={item.label}
          name="radio"
          checked={selectedOption === item.value}
          onChange={handleChange}
          value={item.value}
        />
      ))}
    </fieldset>
  );
};
