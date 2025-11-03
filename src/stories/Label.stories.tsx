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

export const Single = () => (
  <CardWrapperItem>
    <BaseComponents.Label variant="single" mainText="Main style text" />
  </CardWrapperItem>
);

export const SingleInverseStyle = () => (
  <CardWrapperItem>
    <BaseComponents.Label
      variant="single"
      mainText="Secondary style text"
      inverseStyle={true}
    />
  </CardWrapperItem>
);

export const Double = () => (
  <CardWrapperItem>
    <BaseComponents.Label
      variant="double"
      mainText="Main style text"
      secondaryText="Secondary style text"
    />
  </CardWrapperItem>
);

export const DoubleInverseStyle = () => (
  <CardWrapperItem>
    <BaseComponents.Label
      variant="double"
      mainText="Secondary style text"
      secondaryText="Main style text"
      inverseStyle={true}
    />
  </CardWrapperItem>
);
