import type { Meta, StoryObj } from "@storybook/react-webpack5";

import { useState } from "react";
import { fn } from "storybook/internal/test";

import { SelectOrRadioField } from "~components";

const meta = {
  title: "Components/Services/SelectOrRadioField",
  component: SelectOrRadioField,
  render: function Render(args) {
    const [selected, setSelected] = useState(args.selectedValue);
    return (
      <div style={{ width: "500px", padding: "16px", background: "#fff" }}>
        <SelectOrRadioField
          {...args}
          selectedValue={selected}
          onSelect={setSelected}
        />
      </div>
    );
  },
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    lang: "ru",
    isModalMode: false,
    name: "vehicle",
    legend: "Выберите госномер",
    placeholderText: "Госномер",
    hintText: "Старый номер будет снят с учёта",
    items: [
      { value: "1", label: "123ABC02", hintText: "Действующий" },
      { value: "2", label: "456DEF02", hintText: "Снят с учёта" },
    ],
    selectedValue: "",
    onSelect: fn(),
    onOpenModal: fn(),
  },
} satisfies Meta<typeof SelectOrRadioField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const RadioMode: Story = {};

export const ModalMode: Story = {
  args: { isModalMode: true, selectedValue: "2" },
};
