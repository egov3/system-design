// src/baseComponents/Button/index.tsx
import type React from "react";
import type { IHTMLAttributesDataProps } from "~interfaces/common";import type { TButtonSize, TButtonVariant } from "~interfaces/Button";
import { joinClasses } from "~utils/joinClasses";

import typography from "../../styles/typography.module.css";
import styles from "./button.module.css";

export interface IButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    IHTMLAttributesDataProps {
  isRounded?: boolean;
  disabled?: boolean;
  variant?: TButtonVariant;
  size?: TButtonSize;
  style?: React.CSSProperties;
  dataTestid?: string;
}

const btnTypography = {
  mini: typography.caption2Medium,
  small: typography.caption1Medium,
  medium: typography.body2Medium,
  large: typography.body1Medium,
};

export const Button = ({
  onClick,
  children,
  style,
  className = "",
  isRounded = false,
  disabled = false,
  variant = "default",
  size = "medium",
  "aria-label": ariaLabel = "Кнопка",
  "data-testid": dataTestid = "Button_MAIN",
  ...rest
}: IButtonProps) => (
  <button
    type="button"
    data-testid={dataTestid}
    aria-label={ariaLabel}
    disabled={disabled}
    aria-disabled={disabled}
    onClick={onClick}
    className={joinClasses(
      styles[`btn--${size}`],
      btnTypography[size],
      isRounded
        ? styles[`btn-rounded--${size}`]
        : styles[`btn-square--${size}`],
      disabled ? styles[`btn-${variant}--disabled`] : styles[`btn-${variant}`],
      styles.button,
      className,
    )}
    style={style}
    {...rest}
  >
    {children}
  </button>
);
