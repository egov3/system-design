import type { Meta, StoryObj } from "@storybook/react-webpack5";

import { fn } from "storybook/test";

import { ContentHeader } from "~components";

import { CardWrapperItem } from "../CardWrapperItem";

const meta = {
  title: "Components/ContentHeader",
  component: ContentHeader,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <CardWrapperItem>
        <div style={{ backgroundColor: "#ffffff", width: "600px" }}>
          <Story />
        </div>
      </CardWrapperItem>
    ),
  ],
  tags: ["autodocs"],
  argTypes: {
    lang: { control: "select", options: ["ru", "kk", "en"] },
    isUpdateBtn: { control: "boolean" },
    title: { control: "text" },
    updatedText: { control: "text" },
  },
  args: {
    lang: "ru",
    isUpdateBtn: true,
    title: "Заявки по услугам",
    handleUpdateData: fn(),
    updatedText: "Обновлено 25.11.2026",
  },
} satisfies Meta<typeof ContentHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Russian: Story = {};

export const Kazakh: Story = {
  args: {
    lang: "kk",
    title: "Қызметтер бойынша өтінімдер",
    updatedText: "Жаңартылды 25.11.2026",
  },
};

export const English: Story = {
  args: {
    lang: "en",
    title: "Service requests",
    updatedText: "Updated 11/25/2026",
  },
};

export const WithoutUpdateButton: Story = {
  args: {
    isUpdateBtn: false,
  },
};
