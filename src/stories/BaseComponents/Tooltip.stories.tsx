import type { Meta, StoryObj } from "@storybook/react-webpack5";

import { Button, Tooltip } from "~baseComponents";

const meta = {
  title: "BaseComponents/Tooltip",
  component: Tooltip,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    text: "Мы улучшаем поиск,\nждите в следующем релизе!",
    children: <Button disabled>Госуслуги</Button>,
  },
} satisfies Meta<typeof Tooltip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
