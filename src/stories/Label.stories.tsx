"use client";

import type { Meta } from "@storybook/react-webpack5";
import { BaseComponents } from "../baseComponents";
import { CardWrapperItem } from "./CardWrapperItem";

const meta = {
  title: "Label",
  component: BaseComponents.Label,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {},
} satisfies Meta<typeof BaseComponents.Label>;

export default meta;

export const Double = () => (
  <CardWrapperItem>
    <BaseComponents.Label
      variant="double"
      mainText="Main text"
      footerText="Footer text"
    />
  </CardWrapperItem>
);

export const Single = () => (
  <CardWrapperItem>
    <BaseComponents.Label variant="single" mainText="Main text" />
  </CardWrapperItem>
);

export const Overline = () => (
  <CardWrapperItem>
    <BaseComponents.Label
      variant="overline"
      mainText="Main text"
      headerText="Header text"
    />
  </CardWrapperItem>
);
