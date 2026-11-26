import type { Meta, StoryObj } from "@storybook/react-webpack5";

import { fn } from "storybook/test";

import { SelectFieldModal } from "~components";

const meta = {
  title: "Components/Services/SelectFieldModal",
  component: SelectFieldModal,
  decorators: [
    (Story) => (
      <div style={{ height: "640px", transform: "translateZ(0)" }}>
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
  args: {
    lang: "ru",
    title: "Выберите госномер",
    name: "vehicle",
    options: [
      { value: "1", label: "123ABC02", hintText: "Действующий" },
      { value: "2", label: "456DEF02", hintText: "Снят с учёта" },
    ],
    selected: "",
    onConfirm: fn(),
    onClose: fn(),
  },
} satisfies Meta<typeof SelectFieldModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { name: "vehicleDefault" },
};

export const LongList: Story = {
  args: {
    name: "vehicleLongList",
    options: Array.from({ length: 16 }, (_, i) => ({
      value: String(i + 1),
      label: `${100 + i}ABC02`,
      hintText: i % 2 ? "Снят с учёта" : "Действующий",
    })),
  },
};
