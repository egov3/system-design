import React from "react";

import { joinClasses } from "~utils/joinClasses";

import styles from "./button.module.css";
import typography from "~styles/typography.module.css";

const btnTypography = {
  mini: typography.Caption2Medium,
  small: typography.Caption1Medium,
  medium: typography.Body2Medium,
  large: typography.Body1Medium,
};

export interface IButtonProps {
  ariaLabel?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  isRounded?: boolean;
  disabled?: boolean;
  variant?: "default" | "tinted" | "secondary";
  size?: "mini" | "small" | "medium" | "large";
  style?: React.CSSProperties;
}

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
}: IButtonProps) => (
  <button
    data-testid="Button_MAIN"
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
