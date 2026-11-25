import type { Meta, StoryObj } from "@storybook/react-webpack5";

import { PrecheckList } from "~components";

const meta = {
  title: "Components/Services/PrecheckList",
  component: PrecheckList,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    checks: [
      {
        title: "Проверка гражданства",
        status: "loading",
        description: "Выполняется",
      },
      {
        title: "Проверка сведений",
        status: "success",
        description: "Проверка пройдена",
      },
      {
        title: "Проверка данных",
        status: "error",
        description: "Необходимые сведения не найдены",
      },
    ],
  },
} satisfies Meta<typeof PrecheckList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithHint: Story = {
  args: {
    hint: "Дождитесь завершения проверок.\nНе закрывайте страницу.",
  },
};
