"use client";

import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { BaseComponents } from "../baseComponents";

const meta = {
  title: "Label",
  component: BaseComponents.Label,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {},
} satisfies Meta<typeof BaseComponents.Label>;

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
