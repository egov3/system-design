import type { Meta, StoryObj } from "@storybook/react-webpack5";

import { SelectableTable } from "~components";
import {
  SELECTABLE_TABLE_VACANCY_COLUMNS,
  SELECTABLE_TABLE_VACANCY_ROWS,
} from "~constants/mock/SelectableTable";

import { CardWrapperItem } from "../CardWrapperItem";

const meta = {
  title: "Components/SelectableTable",
  component: SelectableTable,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    columns: SELECTABLE_TABLE_VACANCY_COLUMNS,
    rows: SELECTABLE_TABLE_VACANCY_ROWS,
  },
  render: (args) => (
    <CardWrapperItem>
      <div style={{ width: 748 }}>
        <SelectableTable {...args} />
      </div>
    </CardWrapperItem>
  ),
} satisfies Meta<typeof SelectableTable>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ReadOnly: Story = {};
