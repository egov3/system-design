"use client";

import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { PhotoCutter } from "src/baseComponents/PhotoCutter";
import photoSrc from "../assets/photo.jpg";
import { CardWrapperItem } from "../CardWrapperItem";

const PERSONAL_ID_RATIO = 35 / 45;
const SIGNATURE_RATIO = 350 / 100;

const meta = {
  title: "BaseComponents/PhotoCutter",
  component: PhotoCutter,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <CardWrapperItem>
        <div style={{ backgroundColor: "#ffffff", width: "400px" }}>
          <Story />
        </div>
      </CardWrapperItem>
    ),
  ],
  tags: ["autodocs"],
  args: {
    src: photoSrc,
    ratio: PERSONAL_ID_RATIO,
  },
  argTypes: {
    ratio: { control: "number" },
  },
} satisfies Meta<typeof PhotoCutter>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Signature: Story = {
  args: {
    ratio: SIGNATURE_RATIO,
  },
};

export const Square: Story = {
  args: {
    ratio: 1,
  },
};
