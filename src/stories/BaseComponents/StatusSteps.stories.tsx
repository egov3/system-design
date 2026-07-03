"use client";

import { CheckIcon } from "@egov3/graphics/Basic/Check";
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { StatusSteps } from "src/baseComponents/StatusSteps";
import { CardWrapperItem } from "../CardWrapperItem";

const meta = {
  title: "BaseComponents/StatusSteps",
  component: StatusSteps,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <CardWrapperItem>
        <div
          style={{
            backgroundColor: "#ffffff",
            width: "320px",
            padding: "16px",
          }}
        >
          <Story />
        </div>
      </CardWrapperItem>
    ),
  ],
  tags: ["autodocs"],
} satisfies Meta<typeof StatusSteps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const InProgress: Story = {
  args: {
    steps: [
      {
        title: "Запрос отправлен",
        subtitle: "18 дек, в 18:23",
        state: "completed",
        completedVariant: "dot",
      },
      {
        title: "Ответ получен",
        subtitle: "В ожидании...",
        state: "current",
      },
      {
        title: "Результат услуги",
        subtitle: "В ожидании...",
        state: "pending",
        icon: <CheckIcon width={20} height={20} fill="#0581da" />,
      },
    ],
  },
};

export const AllPending: Story = {
  args: {
    steps: [
      {
        title: "Запрос отправлен",
        subtitle: "В ожидании...",
        state: "current",
      },
      {
        title: "Ответ получен",
        subtitle: "В ожидании...",
        state: "pending",
        icon: <CheckIcon width={20} height={20} fill="#0581da" />,
      },
      {
        title: "Результат услуги",
        subtitle: "В ожидании...",
        state: "pending",
        icon: <CheckIcon width={20} height={20} fill="#0581da" />,
      },
    ],
  },
};

export const AllCompleted: Story = {
  args: {
    steps: [
      {
        title: "Запрос отправлен",
        subtitle: "18 дек, в 18:23",
        state: "completed",
        completedVariant: "dot",
      },
      {
        title: "Ответ получен",
        subtitle: "18 дек, в 19:10",
        state: "completed",
        completedVariant: "dot",
      },
      { title: "Результат услуги", subtitle: "Успешно", state: "completed" },
    ],
  },
};
