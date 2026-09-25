import type { Meta } from "@storybook/react-webpack5";

import { Table, TableHead, TableHeadCell } from "~baseComponents";

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

export const Default = () => (
  <CardWrapperItem>
    <div style={{ width: 800 }}>
      <Table>
        <TableHead>
          <TableHeadCell>Организация</TableHeadCell>
          <TableHeadCell isNoEllipsis>
            Идентификатор факта госпитализации
          </TableHeadCell>
          <TableHeadCell>Идентификатор факта госпитализации</TableHeadCell>
        </TableHead>
      </Table>
    </div>
  </CardWrapperItem>
);
