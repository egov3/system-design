import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { WarningText } from "../components/WarningText";

const meta: Meta<typeof WarningText> = {
  title: "WarningText",
  component: WarningText,
  tags: ["autodocs"],
  argTypes: {
    align: {
      control: "radio",
      options: ["left", "center"],
    },
    isNeedIcon: {
      control: "boolean",
    },
    errorText: {
      control: "text",
      description: "Single string or [string, string]",
    },
  },
};

export default meta;

type Story = StoryObj<typeof WarningText>;

export const Default: Story = {
  args: {
    align: "left",
    isNeedIcon: true,
    errorText: "This is a warning message",
  },
};

export const WithoutIcon: Story = {
  args: {
    align: "left",
    isNeedIcon: false,
    errorText: "Warning without icon",
  },
};

export const CenterAligned: Story = {
  args: {
    align: "center",
    isNeedIcon: true,
    errorText: "Center aligned warning",
  },
};

export const MultipleErrors: Story = {
  args: {
    align: "left",
    isNeedIcon: true,
    errorText: ["First warning message", "Second warning message"],
  },
};

export const CenterAlignedMultipleErrors: Story = {
  args: {
    align: "center",
    isNeedIcon: true,
    errorText: ["First center warning", "Second center warning"],
  },
};
