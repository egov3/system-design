"use client";

import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Responses } from "src/baseComponents/Responses";
import { CardWrapperItem } from "../CardWrapperItem";

const meta = {
  title: "BaseComponents/Responses",
  component: Responses,
  decorators: [
    (Story) => (
      <CardWrapperItem>
        <div style={{ width: 480, padding: 16, background: "#fff" }}>
          <Story />
        </div>
      </CardWrapperItem>
    ),
  ],
  tags: ["autodocs"],
} satisfies Meta<typeof Responses>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DocResponseWithText: Story = {
  args: {
    documents: [
      {
        id: "decision",
        fileType: "SUCCESS",
        onClick: () => undefined,
        isDisabled: false,
        name: "Наименование выходного документа.pdf",
        ariaLabel: "Наименование выходного документа",
        hint: "Документ доступен к скачиванию до 00.00.0000",
      },
    ],
    label: "Детальный статус",
    text: "Информирующий текст от госоргана",
    textType: "INFO",
  },
};
