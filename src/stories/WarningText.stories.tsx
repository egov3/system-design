"use client";

import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { BaseComponents } from "../baseComponents";

const meta = {
  title: "WarningText",
  component: BaseComponents.WarningText,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {},
} satisfies Meta<typeof BaseComponents.WarningText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithIconLeftAlign: Story = {
  args: {
    isNeedIcon: true,
    align: "left",
    errorText:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam...",
  },
};

export const WithoutIconLeftAlign: Story = {
  args: {
    isNeedIcon: false,
    align: "left",
    errorText:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam...",
  },
};

export const WithIconCenterAlign: Story = {
  args: {
    isNeedIcon: true,
    align: "center",
    errorText:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam...",
  },
};

export const WithoutIconCenterAlign: Story = {
  args: {
    isNeedIcon: false,
    align: "center",
    errorText:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam...",
  },
};
