import type { Dispatch, SetStateAction } from "react";

import { joinClasses } from "~utils/joinClasses";

import styles from "./RadioToggle.module.css";

export interface IRadioToggleProps {
  lock: boolean;
  setLock: Dispatch<SetStateAction<boolean>>;
  disabled: boolean;
}

export const RadioToggle = ({ lock, setLock, disabled }: IRadioToggleProps) => (
  <button
    type="button"
    data-testid="RadioToggle_BUTTON"
    aria-pressed={lock}
    aria-label="Кнопка переключения"
    onClick={() => {
      setLock(!lock);
    }}
    disabled={disabled}
  >
    <div
      data-testid="RadioToggle_WRAP"
      className={joinClasses(styles.wrap, lock && styles.wrapLock, disabled && styles.disabled)}
    >
      <div data-testid="RadioToggle_ROUND" className={styles.round}></div>
    </div>
  </button>
);
