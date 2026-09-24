import type { ReactNode } from "react";

import { joinClasses } from "~utils/joinClasses";

import styles from "./Table.module.css";

export type { ITableFooterProps } from "./TableFooter";
export { TableFooter } from "./TableFooter";
export type { ITableHeadProps } from "./TableHead";
export { TableHead } from "./TableHead";
export type { ITableHeadCellProps } from "./TableHeadCell";
export { TableHeadCell } from "./TableHeadCell";

export interface ITableProps {
  children: ReactNode;
  className?: string;
}

export const Table = ({ children, className }: ITableProps) => (
  <div className={styles.tableWrapper} data-testid="Table_OUTER_WRAPPER">
    <table
      data-testid="Table_WRAPPER"
      className={joinClasses(styles.table, className)}
    >
      {children}
    </table>
  </div>
);
