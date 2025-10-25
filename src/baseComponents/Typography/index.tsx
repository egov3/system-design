// Typography.tsx
import React, { type ElementType, type FC } from "react";
import { joinClasses } from "~utils/joinClasses";

import typography from "../../styles/typography.module.css";

type TFontClass =
  | "heading1"
  | "heading3"
  | "subtitles3"
  | "body1Medium"
  | "body1Regular"
  | "body2Medium"
  | "body2Regular"
  | "body3Regular"
  | "caption1Medium"
  | "caption1Regular"
  | "caption1Semibold"
  | "caption2Medium"
  | "caption2Regular"
  | "caption2Semibold";

export interface ITypographyProps extends React.HTMLAttributes<HTMLElement> {
  tag: ElementType;
  fontClass: TFontClass;
}

export const Typography: FC<ITypographyProps> = ({
  tag,
  fontClass,
  className,
  children,
  style,
  ...restProps
}) =>
  React.createElement(
    tag,
    {
      ...restProps,
      className: joinClasses(typography[fontClass] ?? "", className),
      style,
    },
    children,
  );
