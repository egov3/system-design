import Icons from "@egov3/icons";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import React from "react";
import { Сomponents } from "~components";

const meta = {
  title: "InputField",
  component: Сomponents.InputField,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {
    onChange: fn(),
    ariaLabel: "",
  },
} satisfies Meta<typeof Сomponents.InputField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: "text",
    id: "Default",
    labelText: "",
  },
};

export const LeftIcon: Story = {
  args: {
    value: "text",
    inputLeftIcon: (
      <Icons.General.Search
        width={23}
        height={23}
        fill={"#9CA3AF"}
        style={{
          paddingRight: "10px",
        }}
      />
    ),
    id: "LeftIcon",
    labelText: "",
  },
};

export const IsClearable: Story = {
  args: {
    value: "text",
    isClearable: true,
    inputLeftIcon: (
      <Icons.General.Search
        width={23}
        height={23}
        fill={"#9CA3AF"}
        style={{
          paddingRight: "10px",
        }}
      />
    ),
    id: "IsClearable",
    labelText: "",
  },
};

export const Label: Story = {
  args: {
    type: "text",
    placeholder: "000-000-000-000",
    value: "",
    id: "Label",
    labelText: "ИИН*",
    ariaLabel: "поле ввода ИИН",
  },
};
