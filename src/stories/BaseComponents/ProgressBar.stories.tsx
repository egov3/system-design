import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { ProgressBar } from "~baseComponents";

const meta = {
  title: "BaseComponents/ProgressBar",
  component: ProgressBar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    progress: {
      control: {
        type: "range",
        min: 0,
        max: 100,
        step: 1,
      },
    },
  },
} satisfies Meta<typeof ProgressBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    progress: 50,
  },
};

export const Empty: Story = {
  args: {
    progress: 0,
  },
};

export const Completed: Story = {
  args: {
    progress: 100,
  },
};
