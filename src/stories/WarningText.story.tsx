"use client";

import type { Meta } from "@storybook/react-webpack5";
import { BaseComponents } from "../baseComponents";
import { CardWrapperItem } from "./CardWrapperItem";

const meta = {
  title: "WarningText",
  component: BaseComponents.WarningText,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {},
} satisfies Meta<typeof BaseComponents.WarningText>;

export default meta;

export const WithIconLeftAlign = () => (
  <CardWrapperItem>
    <div style={{ width: "400px" }}>
      <BaseComponents.WarningText
        isNeedIcon={true}
        align="left"
        errorText="Error text with icon, left aligned"
      />
    </div>
  </CardWrapperItem>
);

export const WithoutIconLeftAlign = () => (
  <CardWrapperItem>
    <div style={{ width: "400px" }}>
      <BaseComponents.WarningText
        isNeedIcon={false}
        align="left"
        errorText="Error text without icon, left aligned"
      />
    </div>
  </CardWrapperItem>
);

export const WithIconCenterAlign = () => (
  <CardWrapperItem>
    <div style={{ width: "400px" }}>
      <BaseComponents.WarningText
        isNeedIcon={true}
        align="center"
        errorText="Error text with icon, center aligned"
      />
    </div>
  </CardWrapperItem>
);

export const WithoutIconCenterAlign = () => (
  <CardWrapperItem>
    <div style={{ width: "400px" }}>
      <BaseComponents.WarningText
        isNeedIcon={false}
        align="center"
        errorText="Error text without icon, center aligned"
      />
    </div>
  </CardWrapperItem>
);
