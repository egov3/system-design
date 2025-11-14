import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Components } from "~components";

const meta = {
  title: "Feedback",
  component: Components.Feedback,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Components.Feedback>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
