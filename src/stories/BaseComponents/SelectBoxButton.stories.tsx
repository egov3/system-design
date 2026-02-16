"use client";

import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { useState } from "react";
import { fn } from "storybook/internal/test";
import { BaseComponents } from "../../baseComponents";
import { CardWrapperItem } from "../CardWrapperItem";

const meta = {
  title: "BaseComponents/SelectBoxButton",
  component: BaseComponents.SelectBoxButton,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <CardWrapperItem>
        <div
          style={{
            height: "300px",
            width: "300px",
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
  args: { handleClick: fn() },
} satisfies Meta<typeof BaseComponents.SelectBoxButton>;

export default meta;

type Story = StoryObj<typeof meta>;

const InteractiveSelectBoxButton = (
  args: typeof SelectBoxButtonPreselectedValue.args & {
    isPreselected: boolean;
  },
) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const radioGroupItems = [
    {
      label: "Very long SelectBox value that might overflow",
      value: "Very long SelectBox value that might overflow",
    },
    { label: "Option 2", value: "option2" },
  ];
  const [selectedOption, setSelectedOption] = useState<string>(
    args.isPreselected ? radioGroupItems[0].value : "",
  );

  return (
    <>
      <BaseComponents.SelectBoxButton
        labelText={args.labelText}
        disabled={args.disabled}
        error={args.error}
        modalValue={selectedOption}
        lang={args.lang}
        handleClick={() => {
          setIsOpen(!isOpen);
        }}
      />
      {isOpen && (
        <BaseComponents.Modal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          header={{
            title: "Select an Option",
            isClosable: true,
          }}
          lang="en"
          variant="small"
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "20px",
            }}
          >
            <BaseComponents.RadioGroup
              radioGroupItems={radioGroupItems}
              setSelectedOption={(value: string) => {
                setSelectedOption(value);
                setIsOpen(!isOpen);
              }}
              selectedOption={selectedOption}
            />
          </div>
        </BaseComponents.Modal>
      )}
    </>
  );
};

export const SelectBoxButtonPreselectedValue: Story = {
  args: {
    disabled: false,
    error: false,
    lang: "ru",
    labelText: "Very long Select Box Button label text that might overflow",
  },
  render: (args) => (
    <InteractiveSelectBoxButton isPreselected={true} {...args} />
  ),
};

export const SelectBoxButtonWithError: Story = {
  args: {
    disabled: false,
    error: true,
    lang: "ru",
    labelText: "Select Box Button",
  },
  render: (args) => (
    <InteractiveSelectBoxButton isPreselected={true} {...args} />
  ),
};

export const SelectBoxButtonEmptyValue: Story = {
  args: {
    disabled: false,
    error: false,
    lang: "ru",
    labelText: "Select Box Button",
  },
  render: (args) => (
    <InteractiveSelectBoxButton isPreselected={false} {...args} />
  ),
};

export const SelectBoxButtonDisabled: Story = {
  args: {
    disabled: true,
    error: false,
    lang: "ru",
    labelText: "Select Box Button",
  },
  render: (args) => (
    <InteractiveSelectBoxButton isPreselected={true} {...args} />
  ),
};
