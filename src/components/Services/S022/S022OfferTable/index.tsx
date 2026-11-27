import type { ILangProps } from "~interfaces/common";

import { i18n } from "~constants/i18n";
import { joinClasses } from "~utils/joinClasses";

import {
  Table,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "../../../../baseComponents/Table";
import styles from "./S022OfferTable.module.css";

export interface IS022OfferTableVacancy {
  id: string;
  organization: string;
  salary: string;
  educationLevel: string;
  workConditions: string;
  openedAt: string;
  ageRequirement: string;
  workNature: string;
}

export interface IS022OfferTableProps extends ILangProps {
  vacancies: IS022OfferTableVacancy[];
}

const langDic = i18n.S022OfferTable;

const columns: Exclude<keyof IS022OfferTableVacancy, "id">[] = [
  "organization",
  "salary",
  "educationLevel",
  "workConditions",
  "openedAt",
  "ageRequirement",
  "workNature",
];

export const S022OfferTable = ({ lang, vacancies }: IS022OfferTableProps) => (
  <div className={styles.wrapper} data-testid="S022OfferTable_WRAPPER">
    <Table className={styles.table} wrapperClassName={styles.tableWrapper}>
      <TableHead>
        {columns.map((column) => (
          <TableHeadCell
            key={column}
            className={joinClasses(styles.headCell, styles[column])}
            isNoEllipsis={true}
            fontClass="caption2Semibold"
          >
            {langDic[column][lang]}
          </TableHeadCell>
        ))}
      </TableHead>
      <tbody>
        {vacancies.map((vacancy) => (
          <TableRow key={vacancy.id}>
            {columns.map((column) => (
              <TableCell
                key={column}
                fontClass="caption1Regular"
                className={styles.cellText}
                isNoEllipsis={true}
              >
                {vacancy[column]}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </tbody>
    </Table>
  </div>
);
