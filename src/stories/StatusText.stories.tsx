"use client";

import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { BaseComponents } from "../baseComponents";
import { CardWrapperItem } from "./CardWrapperItem";

const text =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam...";

const meta = {
  title: "StatusText",
  component: BaseComponents.StatusText,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <CardWrapperItem>
        <div
          style={{
            backgroundColor: "#ffffff",
            height: "200px",
            width: "400px",
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Story />
        </div>
      </CardWrapperItem>
    ),
  ],
  tags: ["autodocs"],
  args: { text: text },
} satisfies Meta<typeof BaseComponents.StatusText>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithIconLeftAlignError: Story = {
  args: {
    isNeedIcon: true,
    isAlignedCenter: false,
    variant: "ERROR",
  },
};

export const WithIconLeftAlignSuccess: Story = {
  args: {
    isNeedIcon: true,
    isAlignedCenter: false,
    variant: "SUCCESS",
  },
};

export const WithIconLeftAlignInfo: Story = {
  args: {
    isNeedIcon: true,
    isAlignedCenter: false,
    variant: "INFO",
  },
};

export const WithoutIconLeftAlign: Story = {
  args: {
    isNeedIcon: false,
    isAlignedCenter: false,
  },
};

export const WithIconCenterAlign: Story = {
  args: {
    isNeedIcon: true,
    isAlignedCenter: true,
  },
};

export const WithoutIconCenterAlign: Story = {
  args: {
    isNeedIcon: false,
    isAlignedCenter: true,
  },
};
