import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { BaseComponents } from "~baseComponents";
import { i18n } from "~constants/i18n";

const meta = {
  title: "BaseComponents/LoadingSkeleton",
  component: BaseComponents.LoadingSkeleton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    title: i18n.LoadingSkeleton.title.ru,
  },
  render: (args) => (
    <div
      style={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: 352,
      }}
    >
      <BaseComponents.LoadingSkeleton {...args} />
    </div>
  ),
} satisfies Meta<typeof BaseComponents.LoadingSkeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithVisibleTitle: Story = {
  args: {
    isTitleVisible: true,
  },
};
