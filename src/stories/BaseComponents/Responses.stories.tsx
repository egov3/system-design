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

export const TextOnly: Story = {
  args: {
    documents: [],
    text: "Информирующий текст о каких либо действиях и т.д.",
    textType: "INFO",
  },
};

export const MultipleFiles: Story = {
  args: {
    label: "Документы",
    documents: [
      {
        id: "decision",
        fileType: "SUCCESS",
        onClick: () => undefined,
        isDisabled: false,
        name: "Наименование выходного документа.pdf",
        ariaLabel: "file1",
      },
      {
        id: "attachment",
        onClick: () => undefined,
        isDisabled: false,
        name: "Наименование выходного документа в отказе или отклонении услуги.pdf",
        ariaLabel: "file2",
        fileType: "ERROR",
      },
    ],
  },
};

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
