"use client";

import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { TextPair } from "src/baseComponents/TextPair";

const meta = {
  title: "BaseComponents/TextPair",
  component: TextPair,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {},
} satisfies Meta<typeof TextPair>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Double: Story = {
  args: {
    mainText: "Main style text",
    secondaryText: "Secondary style text",
  },
};

export const Single: Story = {
  args: {
    mainText: "Main style text",
  },
};
