import React from "react";

import { joinClasses } from "~utils/joinClasses";

import styles from "./button.module.css";
import typography from "../../styles/typography.module.css";

export interface IButtonProps {
  ariaLabel?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  isRounded?: boolean;
  disabled?: boolean;
  variant?: "default" | "tinted" | "secondary" | "black";
  size?: "mini" | "small" | "medium" | "large";
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
  ariaLabel = "Кнопка",
  dataTestid = "Button_MAIN",
}: IButtonProps) => (
  <button
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
      className
    )}
    style={style}
  >
    {children}
  </button>
);
