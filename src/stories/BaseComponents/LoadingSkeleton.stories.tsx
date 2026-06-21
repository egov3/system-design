import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { BaseComponents } from "~baseComponents";

const meta = {
  title: "BaseComponents/LoadingSkeleton",
  component: BaseComponents.LoadingSkeleton,
  tags: ["autodocs"],
  args: {
    title: "??????",
  },
} satisfies Meta<typeof BaseComponents.LoadingSkeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithVisibleTitle: Story = {
  args: {
    isTitleVisible: true,
  },
};
