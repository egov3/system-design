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
  hintText?: string;
  actionLabel?: string;
  onActionClick?: React.MouseEventHandler<HTMLButtonElement>;
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
  hintText,
  actionLabel,
  onActionClick,
}: ICheckboxProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  const handleActionClick: React.MouseEventHandler<HTMLButtonElement> = (
    event,
  ) => {
    event.preventDefault();
    event.stopPropagation();
    onActionClick?.(event);
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
      <div className={styles.labelGroupWrap} data-testid="Checkbox_LABEL_WRAP">
        <div className={styles.labelWrap} data-testid="Checkbox_LABEL">
          <span data-testid="Checkbox_TEXT" className={typography.body2Regular}>
            {label}
          </span>
          {actionLabel && (
            <button
              type="button"
              className={styles.action}
              onClick={handleActionClick}
              data-testid="Checkbox_ACTION"
            >
              <span
                data-testid="Checkbox_ACTION_TEXT"
                className={typography.body2Regular}
              >
                {actionLabel}
              </span>
            </button>
          )}
        </div>

        {hintText && hintText.length > 0 && (
          <span
            data-testid="CheckboxHint_TEXT"
            className={joinClasses(styles.hintText, typography.caption1Regular)}
          >
            {hintText}
          </span>
        )}
      </div>
    </label>
  );
};
