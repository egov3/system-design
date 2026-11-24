import type { Meta, StoryObj } from "@storybook/react-webpack5";

import { useState } from "react";
import { fn } from "storybook/internal/test";

import type { ISelectOrRadioFieldProps } from "~components";

import { SelectOrRadioField } from "~components";

import { CardWrapperItem } from "../../CardWrapperItem";

const plateItems = [
  { value: "1", label: "123ABC02", hintText: "Действующий" },
  { value: "2", label: "456DEF02", hintText: "Снят с учёта" },
  { value: "3", label: "789GHI02", hintText: "Действующий" },
];

const SelectOrRadioFieldComponent = (props: ISelectOrRadioFieldProps) => {
  const [selectedValue, setSelectedValue] = useState(props.selectedValue);

  return (
    <CardWrapperItem>
      <div
        style={{
          padding: "16px",
          background: "#fff",
          borderRadius: "12px",
          width: "500px",
        }}
      >
        <SelectOrRadioField
          {...props}
          selectedValue={selectedValue}
          onSelect={(value) => {
            setSelectedValue(value);
            props.onSelect(value);
          }}
        />
      </div>
    </CardWrapperItem>
  );
};

const meta = {
  title: "Components/Services/SelectOrRadioField",
  component: SelectOrRadioField,
  render: (args) => <SelectOrRadioFieldComponent {...args} />,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    lang: "ru",
    isModalMode: false,
    name: "vehicle",
    legend: "Выберите госномер",
    placeholderText: "Госномер",
    hintText:
      "Старый номер будет снят с учёта после получения нового.\nПроверьте данные перед продолжением.",
    items: plateItems,
    selectedValue: "",
    onSelect: fn(),
    onOpenModal: fn(),
  },
} satisfies Meta<typeof SelectOrRadioField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const RadioMode: Story = {};

export const ModalMode: Story = {
  args: {
    isModalMode: true,
  },
};

export const ModalModeSelected: Story = {
  args: {
    isModalMode: true,
    selectedValue: "2",
  },
};

export const WithoutHint: Story = {
  args: {
    hintText: undefined,
  },
};
