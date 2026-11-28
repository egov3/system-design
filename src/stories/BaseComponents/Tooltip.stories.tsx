import type { Meta, StoryObj } from "@storybook/react-webpack5";

import { Button, Tooltip } from "~baseComponents";

const meta = {
  title: "BaseComponents/Tooltip",
  component: Tooltip,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: { children: { control: false } },
  args: {
    text: "Мы улучшаем поиск,\nждите в следующем релизе!",
    children: <Button disabled>Госуслуги</Button>,
  },
  render: (args) => (
    <div
      style={{
        width: 277,
        height: 220,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "flex-end",
      }}
    >
      <Tooltip {...args} />
    </div>
  ),
} satisfies Meta<typeof Tooltip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
