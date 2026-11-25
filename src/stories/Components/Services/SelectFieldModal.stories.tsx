import type { Meta, StoryObj } from "@storybook/react-webpack5";

import { useState } from "react";
import { fn } from "storybook/internal/test";

import { SelectFieldModal } from "~components";

const meta = {
  title: "Components/Services/SelectFieldModal",
  component: SelectFieldModal,
  render: function Render(args) {
    const [selected, setSelected] = useState(args.selectedValue);
    return (
      <SelectFieldModal
        {...args}
        selectedValue={selected}
        onSelect={setSelected}
      />
    );
  },
  tags: ["autodocs"],
  args: {
    lang: "ru",
    title: "Выберите госномер",
    name: "vehicle",
    options: [
      { value: "1", label: "123ABC02", hintText: "Действующий" },
      { value: "2", label: "456DEF02", hintText: "Снят с учёта" },
    ],
    selectedValue: "",
    onSelect: fn(),
    confirmLabel: "Выбрать",
    onConfirm: fn(),
    onClose: fn(),
  },
} satisfies Meta<typeof SelectFieldModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
