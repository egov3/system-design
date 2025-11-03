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
    variant: "double",
    mainText: "Main style text",
    secondaryText: "Secondary style text",
    inverseStyle: false,
  },
};

export const DoubleInverseStyle: Story = {
  args: {
    variant: "double",
    mainText: "Secondary style text",
    secondaryText: "Main style text",
    inverseStyle: true,
  },
};

export const Single: Story = {
  args: {
    variant: "single",
    mainText: "Main style text",
  },
};

export const SingleInverseStyle: Story = {
  args: {
    variant: "single",
    mainText: "Secondary style text",
    inverseStyle: true,
  },
};
