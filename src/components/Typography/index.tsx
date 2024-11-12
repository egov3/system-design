import React, { FC } from "react";
import { CombineClassNames } from "~utils/CombineClassNames";

import styles from "./Typography.module.scss";

type FontClass =
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
  fontClass?: FontClass;
}

export const Typography: FC<ITypographyProps> = ({
  tag,
  fontClass,
  className,
  children,
  ...restProps
}) =>
  React.createElement(
    tag,
    {
      ...restProps,
      className: CombineClassNames(className, fontClass ? styles[fontClass]: ''),
    },
    children
  );
