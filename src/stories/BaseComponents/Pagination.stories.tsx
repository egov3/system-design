"use client";

import type { Meta } from "@storybook/react-webpack5";

import { useState } from "react";

import { Pagination } from "~baseComponents";

import { CardWrapperItem } from "../CardWrapperItem";

const meta = {
  title: "BaseComponents/Pagination",
  component: Pagination,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {},
} satisfies Meta<typeof Pagination>;

export default meta;

export const Default = () => {
  const [page, setPage] = useState(1);

  return (
    <CardWrapperItem>
      <Pagination
        itemsPerPage={5}
        totalItems={50}
        currentPage={page}
        setPage={setPage}
      />
    </CardWrapperItem>
  );
};
