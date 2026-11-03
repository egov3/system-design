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
  align?: "left" | "center" | "right";
}

export const TableHeadCell = ({
  children,
  className,
  style,
  colSpan,
  scope,
  isNoEllipsis = false,
  align = "left",
}: ITableHeadCellProps) => (
  <th
    className={joinClasses(
      styles.headTitle,
      styles[`align-${align}`],
      className,
    )}
    style={style}
    data-testid="TableHead_HEADER"
    colSpan={colSpan}
    scope={scope}
  >
    <Typography
      tag="div"
      fontClass="body3Medium"
      className={joinClasses(
        isNoEllipsis ? styles.headCellNoEllipsis : styles.headCell,
        styles[`align-${align}`],
      )}
      data-testid="TableHead_CELL"
    >
      {children}
    </Typography>
  </th>
);
