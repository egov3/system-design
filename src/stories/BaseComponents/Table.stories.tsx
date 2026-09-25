"use client";

import type { Meta } from "@storybook/react-webpack5";

import { useState } from "react";

import {
  PageSizeSelector,
  Pagination,
  Table,
  TableCell,
  TableFooter,
  TableHead,
  TableHeadCell,
  TableRow,
  type TPageSize,
} from "~baseComponents";

import { CardWrapperItem } from "../CardWrapperItem";

const meta = {
  title: "BaseComponents/Table",
  component: Table,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {},
} satisfies Meta<typeof Table>;

export default meta;

const columns = ["Диагноз", "Препарат", "ID-рецепта", "Дата выписки"];

const rows = Array.from({ length: 48 }, (_, index) => ({
  id: String(166184060 + index),
  diagnosis: "Артериальная гипертензия I10-I15",
  drug: "Стопресс, таблетки, 8 мг",
  date: "01.01.2026",
}));

export const Default = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<TPageSize>(5);
  const [isOpenPageSize, setIsOpenPageSize] = useState(false);
  const pageRows = rows.slice((page - 1) * pageSize, page * pageSize);

  return (
    <CardWrapperItem>
      <div
        style={{ position: "relative", width: 800, display: "grid", gap: 16 }}
      >
        <Table>
          <TableHead>
            {columns.map((column) => (
              <TableHeadCell key={column} isNoEllipsis>
                {column}
              </TableHeadCell>
            ))}
          </TableHead>
          <tbody>
            {pageRows.map((row) => (
              <TableRow key={row.id}>
                <TableCell isNoEllipsis>{row.diagnosis}</TableCell>
                <TableCell isNoEllipsis>{row.drug}</TableCell>
                <TableCell isNoEllipsis>{row.id}</TableCell>
                <TableCell isNoEllipsis>{row.date}</TableCell>
              </TableRow>
            ))}
          </tbody>
          <TableFooter
            colSpan={columns.length}
            pageSize={pageSize}
            isPageSizeOpen={isOpenPageSize}
            onTogglePageSize={() => setIsOpenPageSize((prev) => !prev)}
            pageSizeSelector={
              <PageSizeSelector
                pageSize={pageSize}
                setPageSize={(value) => {
                  setPageSize(value);
                  setPage(1);
                }}
                setIsOpenPageSize={setIsOpenPageSize}
              />
            }
            lang="ru"
          />
        </Table>
        <Pagination
          itemsPerPage={pageSize}
          totalItems={rows.length}
          currentPage={page}
          setPage={setPage}
        />
      </div>
    </CardWrapperItem>
  );
};
