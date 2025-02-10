"use client";

import type { Meta } from "@storybook/react";
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
    <Components.Typography tag="span" fontClass="Heading1">
      Heading1
    </Components.Typography>
    <Components.Typography tag="span" fontClass="Heading3">
      Heading3
    </Components.Typography>
    <Components.Typography tag="span" fontClass="Subtitles3">
      Subtitles3
    </Components.Typography>
    <Components.Typography tag="span" fontClass="Body1Medium">
      Body1Medium
    </Components.Typography>
    <Components.Typography tag="span" fontClass="Body1Regular">
      Body1Regular
    </Components.Typography>
    <Components.Typography tag="span" fontClass="Body2Medium">
      Body2Medium
    </Components.Typography>
    <Components.Typography tag="span" fontClass="Body2Regular">
      Body2Regular
    </Components.Typography>
    <Components.Typography tag="span" fontClass="Body3Regular">
      Body3Regular
    </Components.Typography>
    <Components.Typography tag="span" fontClass="Caption1Medium">
      Caption1Medium
    </Components.Typography>
    <Components.Typography tag="span" fontClass="Caption1Regular">
      Caption1Regular
    </Components.Typography>
    <Components.Typography tag="span" fontClass="Caption1Semibold">
      Caption1Semibold
    </Components.Typography>
    <Components.Typography tag="span" fontClass="Caption2Medium">
      Caption2Medium
    </Components.Typography>
    <Components.Typography tag="span" fontClass="Caption2Regular">
      Caption2Regular
    </Components.Typography>
  </CardWrapperItem>
);
