import type { CSSProperties, ReactNode } from "react";

import { joinClasses } from "~utils/joinClasses";

import { Typography } from "../../Typography";
import styles from "../Table.module.css";

export interface ITableCellProps {
  children: ReactNode;
  fontClass?: "body3Medium" | "body3Regular";
  className?: string;
  cellClassName?: string;
  style?: CSSProperties;
  isNoEllipsis?: boolean;
  title?: string;
  align?: "left" | "center" | "right";
}

export const TableCell = ({
  children,
  fontClass = "body3Regular",
  className,
  cellClassName,
  style,
  isNoEllipsis = false,
  title,
  align = "left",
}: ITableCellProps) => (
  <td
    className={joinClasses(
      isNoEllipsis ? styles.bodyCellNoEllipsis : styles.bodyCell,
      styles[`align-${align}`],
      cellClassName,
    )}
    style={style}
    data-testid="TableData_CELL"
    title={title}
  >
    <Typography
      tag="span"
      fontClass={fontClass}
      className={className}
      data-testid="TableCell_TITLE"
    >
      {children}
    </Typography>
  </td>
);
