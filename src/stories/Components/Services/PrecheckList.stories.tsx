import type { Meta, StoryObj } from "@storybook/react-webpack5";

import { PrecheckList } from "~components";

const meta = {
  title: "Components/Services/PrecheckList",
  component: PrecheckList,
  tags: ["autodocs"],
  args: {
    checks: [
      {
        status: "PASSED",
        statusText: "Проверка пройдена",
        title: "Проверка гражданства",
      },
      {
        status: "FAILED",
        statusText: "Проверка не пройдена",
        title: "Проверка в базе МЦРИАП",
      },
      {
        status: "IN_PROGRESS",
        statusText: "Идет проверка",
        title: "Проверка активной заявки",
      },
    ],
    hint: "Проверка может занять до одной минуты",
  },
} satisfies Meta<typeof PrecheckList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
