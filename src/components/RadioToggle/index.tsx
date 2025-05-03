import React, { Dispatch, SetStateAction } from "react";

import { joinClasses } from "~utils/joinClasses";

import styles from "./RadioToggle.module.css";

export interface IRadioToggleProps {
  lock: boolean;
  setLock: Dispatch<SetStateAction<boolean>>;
}

export const RadioToggle = ({ lock, setLock }: IRadioToggleProps) => (
  <button
    data-testid="RadioToggle_BUTTON"
    aria-pressed={lock}
    aria-label="Кнопка переключения"
    onClick={() => {
      setLock(!lock);
    }}
  >
    <div
      data-testid="RadioToggle_WRAP"
      className={joinClasses(styles.wrap, lock && styles.wrapLock)}
    >
      <div data-testid="RadioToggle_ROUND" className={styles.round}></div>
    </div>
  </button>
);
