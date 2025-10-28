import { Icons } from "@egov3/graphics";
import type React from "react";
import type { Dispatch, JSX } from "react";

import { BaseComponents } from "..";

import styles from "./SelectBoxButton.module.css";

export interface ISelectBoxProps {
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
}: ISelectBoxProps): JSX.Element => (
  <button
    type="button"
    data-testid="SelectBoxModal_BUTTON"
    className={styles.selectContainer}
    onClick={() => !disabled && setIsOpen(true)}
  >
    <div data-testid="SelectBoxModal_TITLE">
      <BaseComponents.Typography
        tag="label"
        fontClass="caption1Regular"
        data-testid="SelectBoxModal_LABEL"
        className={error ? styles.errorLabel : styles.label}
        aria-label={labelText}
      >
        {labelText}
      </BaseComponents.Typography>
      {modalValue && modalValue.length > 0 && (
        <BaseComponents.Typography
          tag="div"
          fontClass="body2Regular"
          data-testid="SelectBoxModal_VALUE"
          className={styles.selectText}
          aria-label={modalValue}
        >
          {modalValue}
        </BaseComponents.Typography>
      )}
    </div>
    <Icons.Basic.ChevronDownSmall
      aria-label="кнопка развернуть"
      fill="#758393"
      className={styles.clearIcon}
    />
  </button>
);
