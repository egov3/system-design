import type { CSSProperties, ReactNode } from "react";

import { joinClasses } from "~utils/joinClasses";

import styles from "../Table.module.css";

export interface ITableRowProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export const TableRow = ({ children, className, style }: ITableRowProps) => (
  <tr
    className={joinClasses(styles.bodyRow, className)}
    style={style}
    data-testid="TableRow_WRAPPER"
  >
    {children}
  </tr>
);
