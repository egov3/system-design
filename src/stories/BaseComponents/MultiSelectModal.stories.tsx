"use client";

import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { useState } from "react";
import { fn } from "storybook/internal/test";
import { MultiSelectModal } from "../../baseComponents";
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
  title: "BaseComponents/MultiSelectModal",
  component: MultiSelectModal,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <CardWrapperItem>
        <div
          style={{
            width: "400px",
            height: "400px",
            display: "flex",
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
  args: { setSelectedOptions: fn() },
} satisfies Meta<typeof MultiSelectModal>;

export default meta;

type Story = StoryObj<typeof meta>;

const InteractiveMultiSelectModal = (
  args: typeof MultiSelectModalDefault.args,
) => {
  const [selectedOptions, setSelectedOptions] = useState(args.selectedOptions);

  return (
    <MultiSelectModal
      {...args}
      selectedOptions={selectedOptions}
      setSelectedOptions={setSelectedOptions}
    />
  );
};

export const MultiSelectModalDefault: Story = {
  args: {
    labelText: "Multi Select Modal label",
    modalTitle: "Select options",
    options,
    selectedOptions: [],
    disabled: false,
    error: false,
    lang: "ru",
  },
  render: (args) => <InteractiveMultiSelectModal {...args} />,
};

export const MultiSelectModalPreselected: Story = {
  args: {
    ...MultiSelectModalDefault.args,
    selectedOptions: ["option1", "option2"],
  },
  render: (args) => <InteractiveMultiSelectModal {...args} />,
};

export const MultiSelectModalWithError: Story = {
  args: {
    ...MultiSelectModalDefault.args,
    error: true,
  },
  render: (args) => <InteractiveMultiSelectModal {...args} />,
};

export const MultiSelectModalDisabled: Story = {
  args: {
    ...MultiSelectModalDefault.args,
    disabled: true,
  },
  render: (args) => <InteractiveMultiSelectModal {...args} />,
};
