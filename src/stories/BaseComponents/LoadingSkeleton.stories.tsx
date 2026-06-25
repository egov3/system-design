import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { LoadingSkeleton } from "~baseComponents";
import { i18n } from "~constants/i18n";

const meta = {
  title: "BaseComponents/LoadingSkeleton",
  component: LoadingSkeleton,
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
      <LoadingSkeleton {...args} />
    </div>
  ),
} satisfies Meta<typeof LoadingSkeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithLoadingTitle: Story = {
  args: {
    isTitleLoading: true,
  },
};
