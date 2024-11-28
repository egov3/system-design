"use client";

import type { Meta } from "@storybook/react";
import React from "react";
import { Сomponents } from "~components";
import { CardWrapperItem } from "./CardWrapperItem";

const meta = {
  title: "Typography",
  component: Сomponents.Typography,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {},
} satisfies Meta<typeof Сomponents.Typography>;

export default meta;

export const Typography = () => (
  <CardWrapperItem>
    <Сomponents.Typography tag="span" fontClass="Heading1">
      Heading1
    </Сomponents.Typography>
    <Сomponents.Typography tag="span" fontClass="Heading3">
      Heading3
    </Сomponents.Typography>
    <Сomponents.Typography tag="span" fontClass="Subtitles3">
      Subtitles3
    </Сomponents.Typography>
    <Сomponents.Typography tag="span" fontClass="Body1Medium">
      Body1Medium
    </Сomponents.Typography>
    <Сomponents.Typography tag="span" fontClass="Body1Regular">
      Body1Regular
    </Сomponents.Typography>
    <Сomponents.Typography tag="span" fontClass="Body2Medium">
      Body2Medium
    </Сomponents.Typography>
    <Сomponents.Typography tag="span" fontClass="Body2Regular">
      Body2Regular
    </Сomponents.Typography>
    <Сomponents.Typography tag="span" fontClass="Body3Regular">
      Body3Regular
    </Сomponents.Typography>
    <Сomponents.Typography tag="span" fontClass="Caption1Medium">
      Caption1Medium
    </Сomponents.Typography>
    <Сomponents.Typography tag="span" fontClass="Caption1Regular">
      Caption1Regular
    </Сomponents.Typography>
    <Сomponents.Typography tag="span" fontClass="Caption1Semibold">
      Caption1Semibold
    </Сomponents.Typography>
    <Сomponents.Typography tag="span" fontClass="Caption2Medium">
      Caption2Medium
    </Сomponents.Typography>
    <Сomponents.Typography tag="span" fontClass="Caption2Regular">
      Caption2Regular
    </Сomponents.Typography>
  </CardWrapperItem>
);
