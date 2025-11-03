import { Icons } from "@egov3/graphics";
import type React from "react";
import type { Dispatch } from "react";
import { i18n } from "~constants/i18n";
import type { ILangProps } from "~interfaces/common";
import { Typography } from "../Typography";
import styles from "./SelectBoxButton.module.css";

export interface ISelectBoxProps extends ILangProps {
  labelText?: string;
  setIsOpen: Dispatch<React.SetStateAction<boolean>>;
  disabled: boolean;
  error?: boolean;
  modalValue?: string;
}

export const SelectBoxButton = ({
  setIsOpen,
  labelText,
  disabled,
  error,
  modalValue,
  lang,
}: ISelectBoxProps): React.ReactNode => {
  const hasValue = modalValue && modalValue.length > 0;

  return (
    <button
      type="button"
      data-testid="SelectBoxModal_BUTTON"
      className={styles.selectContainer}
      onClick={() => {!disabled && setIsOpen(true)}}
    >
      <div
        data-testid="SelectBoxModal_TITLE"
        className={styles.selectModalWrap}
      >
        <Typography
          tag="label"
          fontClass={hasValue ? "caption1Regular" : "body2Regular"}
          data-testid="SelectBoxModal_LABEL"
          className={error ? styles.errorLabel : styles.label}
          aria-label={labelText}
        >
          {labelText}
        </Typography>

        {hasValue && (
          <Typography
            tag="span"
            fontClass="body2Regular"
            data-testid="SelectBoxModal_VALUE"
            className={styles.selectText}
            aria-label={modalValue}
          >
            {modalValue}
          </Typography>
        )}
      </div>
      <Icons.Basic.ChevronDownSmall
        aria-label={i18n.SelectBoxButton.ariaExpandButton[lang]}
        className={styles.clearIcon}
        data-testid="SelectBoxModal_CHEVRON_ICON"
      />
    </button>
  );
};
