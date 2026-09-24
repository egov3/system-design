import type { ReactNode } from "react";

import { generateTabs } from "~utils/generateTabs";

import { TabButtons } from "../TabButtons";
import styles from "./Pagination.module.css";

export interface IPaginationProps {
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  setPage: (page: number) => void;
  actions?: ReactNode;
}

export const Pagination = ({
  itemsPerPage,
  totalItems,
  currentPage,
  setPage,
  actions,
}: IPaginationProps) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const tabs = generateTabs(currentPage, totalPages);

  return (
    <div
      className={styles.paginationWrapper}
      data-testid="Pagination_SECTION_WRAPPER"
    >
      {actions}
      <div className={styles.pagination} data-testid="Pagination_WRAP">
        <TabButtons
          tabDocLabels={tabs}
          activeTab={String(currentPage)}
          handleClick={(tabKey) => {
            if (tabKey.includes("dots")) return;
            setPage(Number(tabKey));
          }}
        />
      </div>
    </div>
  );
};
