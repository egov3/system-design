import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { fn } from "storybook/test";
import { Components } from "~components";

const meta = {
  title: "EdsSuccess",
  component: Components.EdsSuccess,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    lang: "ru",
    handleEdsOnclick: fn(),
  },
} satisfies Meta<typeof Components.EdsSuccess>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Russian: Story = {
  args: {
    lang: "ru",
  },
};

export const English: Story = {
  args: {
    lang: "en",
  },
};

export const Kazakh: Story = {
  args: {
    lang: "kk",
  },
};
