import type { Meta, StoryObj } from "@storybook/react-webpack5";

import { fn } from "storybook/test";

import { EmptyState } from "~components";

const meta = {
  title: "Components/EmptyState",
  component: EmptyState,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    description: "Ничего не найдено\nИзмените условия поиска",
  },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithAction: Story = {
  args: {
    buttonText: "Повторить",
    onButtonClick: fn(),
  },
};
