import {
  Table,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "../../baseComponents/Table";
import styles from "./SelectableTable.module.css";

export interface ISelectableTableColumn {
  key: string;
  title: string;
  width?: number;
}

export interface ISelectableTableRow {
  id: string;
  values: Record<string, string | null>;
}

export interface ISelectableTableProps {
  columns: ISelectableTableColumn[];
  rows: ISelectableTableRow[];
}

export const SelectableTable = ({ columns, rows }: ISelectableTableProps) => {
  return (
    <div className={styles.wrapper} data-testid="SelectableTable_WRAPPER">
      <Table className={styles.table} wrapperClassName={styles.tableWrapper}>
        <TableHead>
          {columns.map((column) => (
            <TableHeadCell
              key={column.key}
              className={styles.headCell}
              style={{ width: column.width }}
              isNoEllipsis={true}
              fontClass="caption2Semibold"
            >
              {column.title}
            </TableHeadCell>
          ))}
        </TableHead>
        <tbody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              {columns.map((column) => (
                <TableCell
                  key={column.key}
                  fontClass="caption1Regular"
                  isNoEllipsis={true}
                >
                  {row.values[column.key] ?? "-"}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
