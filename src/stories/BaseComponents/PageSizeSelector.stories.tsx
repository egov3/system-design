"use client";

import type { Meta } from "@storybook/react-webpack5";

import { useState } from "react";

import { PageSizeSelector, type TPageSize } from "~baseComponents";

import { CardWrapperItem } from "../CardWrapperItem";

const meta = {
  title: "BaseComponents/PageSizeSelector",
  component: PageSizeSelector,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {},
} satisfies Meta<typeof PageSizeSelector>;

export default meta;

export const Default = () => {
  const [pageSize, setPageSize] = useState<TPageSize>(5);
  const [isOpenPageSize, setIsOpenPageSize] = useState(true);

  return (
    <CardWrapperItem>
      <div style={{ position: "relative", width: 240, height: 200 }}>
        <button
          type="button"
          onClick={() => setIsOpenPageSize((prev) => !prev)}
        >
          Размер страницы: {pageSize}
        </button>
        {isOpenPageSize && (
          <PageSizeSelector
            pageSize={pageSize}
            setPageSize={setPageSize}
            setIsOpenPageSize={setIsOpenPageSize}
          />
        )}
      </div>
    </CardWrapperItem>
  );
};
