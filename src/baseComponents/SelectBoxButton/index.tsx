// src/baseComponents/SelectBoxButton/index.tsx
import { Icons } from "@egov3/graphics";
import { i18n } from "~constants/i18n";
import type { ILangProps } from "~interfaces/common";
import { joinClasses } from "~utils/joinClasses";
import { Typography } from "../Typography";
import styles from "./SelectBoxButton.module.css";

export interface ISelectBoxProps extends ILangProps {
  labelText?: string;
  handleClick: () => void;
  disabled: boolean;
  error?: boolean;
  modalValue?: string;
}

export const SelectBoxButton = ({
  handleClick,
  labelText,
  disabled,
  error,
  modalValue,
  lang,
}: ISelectBoxProps) => {
  const hasValue = modalValue && modalValue.length > 0;

  return (
    <button
      type="button"
      data-testid="SelectBoxModal_BUTTON"
      className={styles.selectContainer}
      disabled={disabled}
      onClick={handleClick}
    >
      <div data-testid="SelectBoxModal_TITLE" className={styles.labelWrapper}>
        <Typography
          tag="label"
          fontClass={hasValue ? "caption1Regular" : "body2Regular"}
          data-testid="SelectBoxModal_LABEL"
          className={joinClasses(
            styles.textOverflow,
            error ? styles.errorLabel : styles.label,
          )}
          aria-label={labelText}
        >
          {labelText}
        </Typography>

        {hasValue && (
          <Typography
            tag="span"
            fontClass="body2Regular"
            data-testid="SelectBoxModal_VALUE"
            className={joinClasses(styles.selectText, styles.textOverflow)}
            aria-label={modalValue}
          >
            {modalValue}
          </Typography>
        )}
      </div>
      <Icons.Basic.ChevronDownSmall
        aria-label={i18n.SelectBoxButton.AriaExpandButton[lang]}
        className={styles.chevronIcon}
        fill="var(--icon-secondary-color)"
        data-testid="SelectBoxModal_CHEVRON_ICON"
      />
    </button>
  );
};
