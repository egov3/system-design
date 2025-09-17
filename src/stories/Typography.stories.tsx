"use client";

import type { Meta } from "@storybook/react-webpack5";
import React from "react";
import { Components } from "~components";
import { CardWrapperItem } from "./CardWrapperItem";

const meta = {
  title: "Typography",
  component: Components.Typography,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {},
} satisfies Meta<typeof Components.Typography>;

export default meta;

export const Typography = () => (
  <CardWrapperItem>
    <Components.Typography tag="span" fontClass="heading1">
      heading1
    </Components.Typography>
    <Components.Typography tag="span" fontClass="heading3">
      heading3
    </Components.Typography>
    <Components.Typography tag="span" fontClass="subtitles3">
      subtitles3
    </Components.Typography>
    <Components.Typography tag="span" fontClass="body1Medium">
      body1Medium
    </Components.Typography>
    <Components.Typography tag="span" fontClass="body1Regular">
      body1Regular
    </Components.Typography>
    <Components.Typography tag="span" fontClass="body2Medium">
      body2Medium
    </Components.Typography>
    <Components.Typography tag="span" fontClass="body2Regular">
      body2Regular
    </Components.Typography>
    <Components.Typography tag="span" fontClass="body3Regular">
      body3Regular
    </Components.Typography>
    <Components.Typography tag="span" fontClass="caption1Medium">
      caption1Medium
    </Components.Typography>
    <Components.Typography tag="span" fontClass="caption1Regular">
      caption1Regular
    </Components.Typography>
    <Components.Typography tag="span" fontClass="caption1Semibold">
      caption1Semibold
    </Components.Typography>
    <Components.Typography tag="span" fontClass="caption2Medium">
      caption2Medium
    </Components.Typography>
    <Components.Typography tag="span" fontClass="caption2Regular">
      caption2Regular
    </Components.Typography>
    <Components.Typography tag="span" fontClass="caption2Semibold">
      caption2Regular
    </Components.Typography>
  </CardWrapperItem>
);
