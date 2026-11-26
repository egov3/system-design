import type { Meta, StoryObj } from "@storybook/react-webpack5";

import { TableEmpty } from "~baseComponents";

const meta = {
  title: "BaseComponents/Table/TableEmpty",
  component: TableEmpty,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    description:
      "Оборудование не добавлено.\nДобавьте хотя бы одну запись, чтобы продолжить.",
  },
  decorators: [
    (Story) => (
      <div style={{ width: 656 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TableEmpty>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithAction: Story = {
  args: {
    buttonText: "Добавить оборудование",
    onButtonClick: () => undefined,
  },
};
