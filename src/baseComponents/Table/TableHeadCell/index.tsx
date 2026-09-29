import type { CSSProperties, ReactNode, ThHTMLAttributes } from "react";

import { joinClasses } from "~utils/joinClasses";

import { Typography } from "../../Typography";
import styles from "../Table.module.css";

export interface ITableHeadCellProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  colSpan?: number;
  scope?: ThHTMLAttributes<HTMLTableCellElement>["scope"];
  isNoEllipsis?: boolean;
}

export const TableHeadCell = ({
  children,
  className,
  style,
  colSpan,
  scope,
  isNoEllipsis = false,
}: ITableHeadCellProps) => (
  <th
    className={joinClasses(styles.headTitle, className)}
    style={style}
    data-testid="TableHead_HEADER"
    colSpan={colSpan}
    scope={scope}
  >
    <Typography
      tag="div"
      fontClass="caption2Semibold"
      className={isNoEllipsis ? styles.headCellNoEllipsis : styles.headCell}
      data-testid="TableHead_CELL"
    >
      {children}
    </Typography>
  </th>
);
