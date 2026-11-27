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

export interface IS022OfferTableLesson {
  id: string;
  organization: string;
  learnForm: string;
  learnLanguage: string;
  openedAt: string;
}

export interface IS022OfferTableProps extends ILangProps {
  vacancies: IS022OfferTableVacancy[];
  lessons: IS022OfferTableLesson[];
}

type TS022OfferTableColumn = Exclude<
  keyof IS022OfferTableVacancy | keyof IS022OfferTableLesson,
  "id"
>;

type TS022OfferTableRow = Partial<Record<TS022OfferTableColumn, string>> &
  Pick<IS022OfferTableVacancy, "id">;

const langDic = i18n.S022OfferTable;

const vacancyColumns: TS022OfferTableColumn[] = [
  "organization",
  "salary",
  "educationLevel",
  "workConditions",
  "openedAt",
  "ageRequirement",
  "workNature",
];

const lessonColumns: TS022OfferTableColumn[] = [
  "organization",
  "learnForm",
  "learnLanguage",
  "openedAt",
];

export const S022OfferTable = ({
  lang,
  vacancies,
  lessons,
}: IS022OfferTableProps) => {
  const isLessonTable = lessons.length > 0;
  const columns = isLessonTable ? lessonColumns : vacancyColumns;
  const rows: TS022OfferTableRow[] = isLessonTable ? lessons : vacancies;

  return (
    <div className={styles.wrapper} data-testid="S022OfferTable_WRAPPER">
      <Table
        className={joinClasses(styles.table, isLessonTable && styles.lessons)}
        wrapperClassName={styles.tableWrapper}
      >
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
          {rows.map((row) => (
            <TableRow key={row.id}>
              {columns.map((column) => (
                <TableCell
                  key={column}
                  fontClass="caption1Regular"
                  className={styles.cellText}
                  isNoEllipsis={true}
                >
                  {row[column]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
