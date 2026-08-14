"use client";

import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Title } from "src/baseComponents/Title";
import { CardWrapperItem } from "../CardWrapperItem";

const title = "Внимание!";
const subtext = "Сведения о выбранном лице не найдены.";

const meta = {
  title: "BaseComponents/Title",
  component: Title,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <CardWrapperItem>
        <div style={{ backgroundColor: "#ffffff" }}>
          <Story />
        </div>
      </CardWrapperItem>
    ),
  ],
  tags: ["autodocs"],
  args: {
    title: title,
    subtext: subtext,
    size: "medium",
    isCentered: false,
  },
  argTypes: {
    title: { control: "text" },
    subtext: { control: "text" },
    size: { control: "select", options: ["small", "medium", "large"] },
    isCentered: { control: "boolean" },
  },
} satisfies Meta<typeof Title>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Small: Story = {
  args: {
    size: "small",
  },
};

export const Medium: Story = {
  args: {
    size: "medium",
  },
};

export const Large: Story = {
  args: {
    size: "large",
  },
};

export const WithoutSubtext: Story = {
  args: {
    subtext: undefined,
  },
};

export const Centered: Story = {
  args: {
    isCentered: true,
  },
};

export const CenteredWithoutSubtext: Story = {
  args: {
    isCentered: true,
    subtext: undefined,
  },
};

export const LongSubtext: Story = {
  args: {
    size: "large",
    isCentered: true,
    subtext:
      "Сведения о выбранном лице не найдены. Проверьте корректность введенных данных и попробуйте еще раз или актуализируйте сведения в базе данных.",
  },
};
