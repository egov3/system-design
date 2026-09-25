import type { ReactNode } from "react";

import { ChevronDownSmallIcon } from "@egov3/graphics/Basic/ChevronDownSmall";

import type { ILangProps } from "~interfaces/common";

import { i18n } from "~constants/i18n";
import { joinClasses } from "~utils/joinClasses";

import { Typography } from "../../Typography";
import styles from "../Table.module.css";

export interface ITableFooterProps extends ILangProps {
  colSpan: number;
  children?: ReactNode;
  className?: string;
  tdClassName?: string;
  pageSize: number;
  isPageSizeOpen: boolean;
  onTogglePageSize: () => void;
  pageSizeSelector: ReactNode;
  testId?: string;
}

export const TableFooter = ({
  colSpan,
  children,
  className,
  tdClassName,
  pageSize,
  isPageSizeOpen,
  onTogglePageSize,
  pageSizeSelector,
  testId = "Table_FOOTER",
  lang,
}: ITableFooterProps) => (
  <tfoot className={className} data-testid={testId}>
    <tr data-testid="TableFooter_ROW">
      <td
        colSpan={colSpan}
        className={joinClasses(styles.footer, tdClassName)}
        data-testid="TableFooter_DATA"
      >
        <div className={styles.footerBody} data-testid="TableFooter_BODY">
          {children}
          <div
            className={styles.footerTextWrap}
            data-testid="TableFooterText_WRAP"
          >
            <Typography
              fontClass="caption1Regular"
              tag="span"
              className={styles.footerText}
              data-testid="TableFooter_TEXT"
            >
              {i18n.Table.PageSize[lang]}&nbsp;
            </Typography>
            <Typography
              fontClass="caption1Regular"
              tag="span"
              data-testid="footerTable_pageSize"
            >
              {pageSize}
            </Typography>
            <button
              type="button"
              aria-expanded={isPageSizeOpen}
              aria-label={i18n.Table.PageSize[lang]}
              onClick={onTogglePageSize}
              data-testid="footerTable_pageSize_BTN"
            >
              <ChevronDownSmallIcon width={16} height={16} />
            </button>
          </div>
        </div>
        {isPageSizeOpen && pageSizeSelector}
      </td>
    </tr>
  </tfoot>
);
