import { useId } from "react";

import { joinClasses } from "~utils/joinClasses";

import { CustomRadioButton } from "../../baseComponents/RadioGroup";
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
  selectedId?: string;
  onSelect?: (id: string) => void;
}

export const SelectableTable = ({
  columns,
  rows,
  selectedId,
  onSelect,
}: ISelectableTableProps) => {
  const radioName = useId();
  const isSelectable = onSelect !== undefined;

  return (
    <div className={styles.wrapper} data-testid="SelectableTable_WRAPPER">
      <Table className={styles.table} wrapperClassName={styles.tableWrapper}>
        <TableHead>
          {isSelectable && (
            <TableHeadCell
              className={joinClasses(styles.headCell, styles.radioCell)}
              isNoEllipsis={true}
            >
              {null}
            </TableHeadCell>
          )}
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
              {isSelectable && (
                <TableCell cellClassName={styles.radioCell} isNoEllipsis={true}>
                  <CustomRadioButton
                    name={radioName}
                    label={row.values[columns[0].key] ?? "-"}
                    value={row.id}
                    checked={row.id === selectedId}
                    onChange={() => {
                      onSelect(row.id);
                    }}
                    isLabelHidden={true}
                  />
                </TableCell>
              )}
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
