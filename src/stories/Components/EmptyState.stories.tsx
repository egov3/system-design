import type { Meta, StoryObj } from "@storybook/react-webpack5";

import { InfoStrokeIcon } from "@egov3/graphics/General/InfoStroke";
import { fn } from "storybook/test";

import { EmptyState } from "~components";

const meta = {
  title: "Components/EmptyState",
  component: EmptyState,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    description: "Ничего не найдено",
  },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithButton: Story = {
  args: {
    description: "Отсутствуют результаты для выбора",
    buttonText: "Сбросить поиск",
    onButtonClick: fn(),
  },
};

export const CustomIcon: Story = {
  args: {
    description: "Клиент не найден",
    icon: (
      <InfoStrokeIcon
        width={32}
        height={32}
        fill="var(--icon-secondary-color)"
      />
    ),
  },
};
