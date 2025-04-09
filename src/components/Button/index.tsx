import React from "react";

import { joinClasses } from "~utils/joinClasses";

import styles from "./Button.module.css";

export interface IButtonProps {
  ariaLabel?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  isRounded?: boolean;
  isIcon?: boolean;
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
  isIcon = false,
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
      isRounded
        ? styles[`btn-rounded--${size}`]
        : styles[`btn-square--${size}`],
      isIcon ? styles[`btn-icon--${size}`] : null,
      disabled ? styles[`btn-${variant}--disabled`] : styles[`btn-${variant}`],
      styles.button,
      className
    )}
    style={style}
  >
    {children}
  </button>
);
