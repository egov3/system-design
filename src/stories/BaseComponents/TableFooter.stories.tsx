"use client";

import type { Meta } from "@storybook/react-webpack5";

import { useState } from "react";

import {
  PageSizeSelector,
  Table,
  TableFooter,
  type TPageSize,
} from "~baseComponents";

import { CardWrapperItem } from "../CardWrapperItem";

const meta = {
  title: "BaseComponents/TableFooter",
  component: TableFooter,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {},
} satisfies Meta<typeof TableFooter>;

export default meta;

export const Default = () => {
  const [pageSize, setPageSize] = useState<TPageSize>(5);
  const [isOpenPageSize, setIsOpenPageSize] = useState(false);

  return (
    <CardWrapperItem>
      <div style={{ position: "relative", width: 800, minHeight: 200 }}>
        <Table>
          <TableFooter
            colSpan={1}
            pageSize={pageSize}
            isPageSizeOpen={isOpenPageSize}
            onTogglePageSize={() => setIsOpenPageSize((prev) => !prev)}
            pageSizeSelector={
              <PageSizeSelector
                pageSize={pageSize}
                setPageSize={setPageSize}
                setIsOpenPageSize={setIsOpenPageSize}
              />
            }
            lang="ru"
          />
        </Table>
      </div>
    </CardWrapperItem>
  );
};
