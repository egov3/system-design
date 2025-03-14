import React, { Dispatch, JSX } from "react";
import Icons from "@egov3/graphics";

import styles from "./SelectBoxButton.module.css";
import { Components } from "~components";

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
    data-testid="SelectBoxModal_BUTTON"
    className={styles.selectContainer}
    onClick={() => !disabled && setIsOpen(true)}
  >
    <div data-testid="SelectBoxModal_TITLE">
      <Components.Typography
        tag="label"
        fontClass="Caption1Regular"
        data-testid="SelectBoxModal_LABEL"
        className={error ? styles.errorLabel : styles.label}
        aria-label={labelText}
      >
        {labelText}
      </Components.Typography>
      {modalValue && modalValue.length > 0 && (
        <Components.Typography
          tag="div"
          fontClass="Body2Regular"
          data-testid="SelectBoxModal_VALUE"
          className={styles.selectText}
          aria-label={modalValue}
        >
          {modalValue}
        </Components.Typography>
      )}
    </div>
    <Icons.Basic.ChevronDownSmall
      aria-label="кнопка развернуть"
      fill="#758393"
      className={styles.clearIcon}
    />
  </button>
);
