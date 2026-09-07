"use client";

import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { PhotoCutter } from "src/baseComponents/PhotoCutter";
import photoSrc from "../assets/photo.jpg";
import { CardWrapperItem } from "../CardWrapperItem";

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
  },
} satisfies Meta<typeof PhotoCutter>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
