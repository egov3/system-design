import type { Meta, StoryObj } from "@storybook/react-webpack5";

import { useState } from "react";

import { SelectableTable } from "~components";
import {
  SELECTABLE_TABLE_LESSON_COLUMNS,
  SELECTABLE_TABLE_LESSON_ROWS,
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
  render: (args) => {
    const [selectedId, setSelectedId] = useState<string>();

    return (
      <CardWrapperItem>
        <div style={{ width: 748 }}>
          <SelectableTable
            {...args}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
        </div>
      </CardWrapperItem>
    );
  },
} satisfies Meta<typeof SelectableTable>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Selectable: Story = {};

export const FitsWidth: Story = {
  args: {
    columns: SELECTABLE_TABLE_LESSON_COLUMNS,
    rows: SELECTABLE_TABLE_LESSON_ROWS,
  },
};

export const ReadOnly: Story = {
  render: (args) => (
    <CardWrapperItem>
      <div style={{ width: 748 }}>
        <SelectableTable
          {...args}
          rows={SELECTABLE_TABLE_VACANCY_ROWS.slice(0, 1)}
        />
      </div>
    </CardWrapperItem>
  ),
};
