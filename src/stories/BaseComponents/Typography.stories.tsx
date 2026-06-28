"use client";

import type { Meta } from "@storybook/react-webpack5";
import { Typography } from "~baseComponents";
import { CardWrapperItem } from "../CardWrapperItem";

const meta = {
  title: "BaseComponents/Typography",
  component: Typography,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {},
} satisfies Meta<typeof Typography>;

export default meta;

export const TypographySb = () => (
  <CardWrapperItem>
    <Typography tag="span" fontClass="heading1">
      heading1
    </Typography>
    <Typography tag="span" fontClass="heading3">
      heading3
    </Typography>
    <Typography tag="span" fontClass="subtitles3">
      subtitles3
    </Typography>
    <Typography tag="span" fontClass="body1Medium">
      body1Medium
    </Typography>
    <Typography tag="span" fontClass="body1Regular">
      body1Regular
    </Typography>
    <Typography tag="span" fontClass="body2Medium">
      body2Medium
    </Typography>
    <Typography tag="span" fontClass="body2Regular">
      body2Regular
    </Typography>
    <Typography tag="span" fontClass="body3Regular">
      body3Regular
    </Typography>
    <Typography tag="span" fontClass="caption1Medium">
      caption1Medium
    </Typography>
    <Typography tag="span" fontClass="caption1Regular">
      caption1Regular
    </Typography>
    <Typography tag="span" fontClass="caption1Semibold">
      caption1Semibold
    </Typography>
    <Typography tag="span" fontClass="caption2Medium">
      caption2Medium
    </Typography>
    <Typography tag="span" fontClass="caption2Regular">
      caption2Regular
    </Typography>
    <Typography tag="span" fontClass="caption2Semibold">
      caption2Regular
    </Typography>
  </CardWrapperItem>
);
