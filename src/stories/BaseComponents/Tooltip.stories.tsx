import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Button, Tooltip } from "~baseComponents";
import { i18n } from "~constants/i18n";

const meta = {
  title: "BaseComponents/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: false,
      table: {
        disable: true,
      },
    },
  },
  args: {
    text: i18n.SearchQualityFeedback.ratingTooltipLabels.smileFace.ru,
  },
  render: (args) => (
    <div style={{ display: "flex", justifyContent: "center", padding: 80 }}>
      <Tooltip {...args} />
    </div>
  ),
} satisfies Meta<typeof Tooltip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <Button>{i18n.Calendar.TabButtonAria.ru}</Button>,
  },
};
