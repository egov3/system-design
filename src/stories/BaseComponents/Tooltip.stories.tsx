import type { Meta, StoryObj } from "@storybook/react-webpack5";

import { Tooltip } from "~baseComponents";

const meta = {
  title: "BaseComponents/Tooltip",
  component: Tooltip,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: { text: "Мы улучшаем поиск,\nждите в следующем релизе!" },
  render: (args) => (
    <div style={{ position: "relative", width: 277, height: 160 }}>
      <div style={{ position: "absolute", top: 28, width: "100%" }}>
        <Tooltip {...args} />
      </div>
    </div>
  ),
} satisfies Meta<typeof Tooltip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
