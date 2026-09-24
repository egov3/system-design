import type { CSSProperties, ReactNode } from "react";

export interface ITableHeadProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export const TableHead = ({ children, className, style }: ITableHeadProps) => (
  <thead className={className} style={style} data-testid="TableHead_WRAPPER">
    <tr data-testid="TableHead_ROW">{children}</tr>
  </thead>
);
