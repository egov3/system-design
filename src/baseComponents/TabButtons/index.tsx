import type { Dispatch, SetStateAction } from "react";

import { joinClasses } from "~utils/joinClasses";
import { Typography } from "../Typography";
import styles from "./TabButtons.module.css";

export interface ITabItem {
  text: string;
  key: string;
}

export interface ITabButtonsProps {
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
  tabDocLabels: ITabItem[];
}

export const TabButtons = ({
  tabDocLabels,
  activeTab,
  setActiveTab,
}: ITabButtonsProps) => (
  <div className={styles.layout} data-testid="TabButtons_LAYOUT">
    {tabDocLabels.map((label) => (
      <button
        key={label.key}
        type="button"
        onClick={() => setActiveTab(label.key)}
        data-testid="TabButtons_BUTTON"
        className={joinClasses(
          styles.tabBtnText,
          activeTab === label.key ? styles.active : styles.notActive,
        )}
        aria-label={label.text}
      >
        <Typography tag="span" fontClass="caption1Medium">
          {label.text}
        </Typography>
      </button>
    ))}
  </div>
);
