import type { ReactNode } from "react";

import { Typography } from "../Typography";
import styles from "./DropDownMenu.module.css";

export interface IDropDownMenuItem {
  icon: ReactNode;
  text: string;
  action: () => void;
  disabled?: boolean;
}

export interface IDropDownMenuProps {
  items: IDropDownMenuItem[];
}

export const DropDownMenu = ({ items}: IDropDownMenuProps) => (
  <div
    className={styles.menu}
    role="menu"
    data-testid="DropDownMenu_WRAPPER"
  >
    {items.map(({ icon, text, action, disabled = false }) => (
      <button
        type="button"
        className={styles.item}
        role="menuitem"
        disabled={disabled}
        key={text}
        onClick={action}
        data-testid="DropDownMenu_ITEM"
      >
          {icon}
        <Typography data-testid="DropDownMenu_Text" tag="span" fontClass="body3Medium">
          {text}
        </Typography>
      </button>
    ))}
  </div>
);
