"use client";

import type { Meta } from "@storybook/react-webpack5";
import { BaseComponents } from "../../baseComponents";
import { CardWrapperItem } from "../CardWrapperItem";

const meta = {
  title: "BaseComponents/Typography",
  component: BaseComponents.Typography,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {},
} satisfies Meta<typeof BaseComponents.Typography>;

export default meta;

export const Typography = () => (
  <CardWrapperItem>
    <BaseComponents.Typography tag="span" fontClass="heading1">
      heading1
    </BaseComponents.Typography>
    <BaseComponents.Typography tag="span" fontClass="heading3">
      heading3
    </BaseComponents.Typography>
    <BaseComponents.Typography tag="span" fontClass="subtitles3">
      subtitles3
    </BaseComponents.Typography>
    <BaseComponents.Typography tag="span" fontClass="body1Medium">
      body1Medium
    </BaseComponents.Typography>
    <BaseComponents.Typography tag="span" fontClass="body1Regular">
      body1Regular
    </BaseComponents.Typography>
    <BaseComponents.Typography tag="span" fontClass="body2Medium">
      body2Medium
    </BaseComponents.Typography>
    <BaseComponents.Typography tag="span" fontClass="body2Regular">
      body2Regular
    </BaseComponents.Typography>
    <BaseComponents.Typography tag="span" fontClass="body3Regular">
      body3Regular
    </BaseComponents.Typography>
    <BaseComponents.Typography tag="span" fontClass="caption1Medium">
      caption1Medium
    </BaseComponents.Typography>
    <BaseComponents.Typography tag="span" fontClass="caption1Regular">
      caption1Regular
    </BaseComponents.Typography>
    <BaseComponents.Typography tag="span" fontClass="caption1Semibold">
      caption1Semibold
    </BaseComponents.Typography>
    <BaseComponents.Typography tag="span" fontClass="caption2Medium">
      caption2Medium
    </BaseComponents.Typography>
    <BaseComponents.Typography tag="span" fontClass="caption2Regular">
      caption2Regular
    </BaseComponents.Typography>
    <BaseComponents.Typography tag="span" fontClass="caption2Semibold">
      caption2Regular
    </BaseComponents.Typography>
  </CardWrapperItem>
);
