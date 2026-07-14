import { CheckboxEmptyIcon } from "@egov3/graphics/General/CheckboxEmpty";
import { CheckboxEmptyFilledIcon as CheckboxFilledIcon } from "@egov3/graphics/General/CheckboxEmptyFilled";
import type React from "react";
import { joinClasses } from "~utils/joinClasses";
import typography from "../../styles/typography.module.css";
import styles from "./Checkbox.module.css";

export interface ICheckboxProps {
  label: string;
  checked: boolean;
  setChecked: (checked: boolean) => void;
  disabled?: boolean;
}

const getIconColor = (checked: boolean, disabled: boolean) => {
  if (disabled) {
    return "var(--icon-disabled-color)";
  }
  if (checked) {
    return "var(--icon-accent-color)";
  }
  return "var(--icon-tertiary)";
};

export const Checkbox = ({
  label,
  checked,
  setChecked,
  disabled = false,
}: ICheckboxProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  const CheckboxIcon = checked ? CheckboxFilledIcon : CheckboxEmptyIcon;
  const iconColor = getIconColor(checked, disabled);

  return (
    <label
      data-testid="Checkbox_LABEL"
      className={joinClasses(
        styles.checkbox,
        disabled ? styles.disabled : undefined,
      )}
    >
      <input
        data-testid="Checkbox_INPUT"
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
      />
      <CheckboxIcon
        data-testid="Checkbox_CONTROL"
        className={styles.checkboxControl}
        aria-hidden="true"
        fill={iconColor}
      />
      <span data-testid="Checkbox_TEXT" className={typography.body2Regular}>
        {label}
      </span>
    </label>
  );
};
