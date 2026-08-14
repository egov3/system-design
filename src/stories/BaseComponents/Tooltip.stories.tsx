import { GrinIcon } from "@egov3/graphics/Emoji/Grin";
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Tooltip } from "~baseComponents";
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
    text: i18n.Feedback.GrinEmoji.ru,
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
    children: <GrinIcon fill="var(--icon-success)" />,
  },
};
