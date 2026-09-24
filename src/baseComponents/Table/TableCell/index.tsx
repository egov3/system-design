import type { CSSProperties, ReactNode } from "react";

import { joinClasses } from "~utils/joinClasses";

import { Typography } from "../../Typography";
import styles from "../Table.module.css";

export interface ITableCellProps {
  children: ReactNode;
  fontClass?: "caption1Regular" | "caption2Semibold";
  className?: string;
  cellClassName?: string;
  style?: CSSProperties;
  isNoEllipsis?: boolean;
  title?: string;
}

export const TableCell = ({
  children,
  fontClass = "caption1Regular",
  className,
  cellClassName,
  style,
  isNoEllipsis = false,
  title,
}: ITableCellProps) => (
  <td
    className={joinClasses(
      isNoEllipsis ? styles.bodyCellNoEllipsis : styles.bodyCell,
      cellClassName,
    )}
    data-testid="TableData_CELL"
    title={title}
  >
    <Typography
      tag="span"
      fontClass={fontClass}
      className={className}
      style={style}
      data-testid="TableCell_TITLE"
    >
      {children}
    </Typography>
  </td>
);
