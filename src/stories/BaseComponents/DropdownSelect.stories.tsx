"use client";

import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { useState } from "react";
import { fn } from "storybook/internal/test";
import { DropdownSelect } from "../../baseComponents";
import { CardWrapperItem } from "../CardWrapperItem";

const options = [
  { label: "Option 1", value: "option1" },
  { label: "Option 2", value: "option2" },
  {
    label: "Very long option label that might overflow onto a second line",
    value: "option3",
  },
  { label: "Option 4", value: "option4" },
  { label: "Option 5", value: "option5" },
];

const meta = {
  title: "BaseComponents/DropdownSelect",
  component: DropdownSelect,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <CardWrapperItem>
        <div
          style={{
            height: "400px",
            width: "400px",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <Story />
        </div>
      </CardWrapperItem>
    ),
  ],
  tags: ["autodocs"],
  args: { setSelectedOption: fn() },
} satisfies Meta<typeof DropdownSelect>;

export default meta;

type Story = StoryObj<typeof meta>;

const InteractiveDropdownSelect = (args: typeof DropdownSelectDefault.args) => {
  const [selectedOption, setSelectedOption] = useState(args.selectedOption);

  return (
    <DropdownSelect
      {...args}
      selectedOption={selectedOption}
      setSelectedOption={setSelectedOption}
    />
  );
};

export const DropdownSelectDefault: Story = {
  args: {
    labelText: "Dropdown Select label",
    options,
    selectedOption: "",
    disabled: false,
    error: false,
    lang: "ru",
  },
  render: (args) => <InteractiveDropdownSelect {...args} />,
};

export const DropdownSelectPreselected: Story = {
  args: {
    ...DropdownSelectDefault.args,
    selectedOption: "option1",
  },
  render: (args) => <InteractiveDropdownSelect {...args} />,
};

export const DropdownSelectWithError: Story = {
  args: {
    ...DropdownSelectDefault.args,
    error: true,
  },
  render: (args) => <InteractiveDropdownSelect {...args} />,
};

export const DropdownSelectDisabled: Story = {
  args: {
    ...DropdownSelectDefault.args,
    disabled: true,
  },
  render: (args) => <InteractiveDropdownSelect {...args} />,
};
