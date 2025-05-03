// Typography.tsx
import React, { FC, JSX } from "react";
import { joinClasses } from "~utils/joinClasses";

import typography from "~styles/typography.module.css";

type TFontClass =
  | "Heading1"
  | "Heading3"
  | "Subtitles3"
  | "Body1Medium"
  | "Body1Regular"
  | "Body2Medium"
  | "Body2Regular"
  | "Body3Regular"
  | "Caption1Medium"
  | "Caption1Regular"
  | "Caption1Semibold"
  | "Caption2Medium"
  | "Caption2Regular";

export interface ITypographyProps extends React.HTMLAttributes<HTMLElement> {
  tag: keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>;
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
      className: joinClasses(fontClass ? typography[fontClass] : "", className),
      style,
    },
    children
  );
