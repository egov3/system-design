import type { ComponentType, SVGProps } from "react";
import { joinClasses } from "~utils/joinClasses";
import typography from "../../styles/typography.module.css";
import styles from "./Label.module.css";

export interface ILabelProps {
  variant: "big" | "small" | "tiny";
  text: string;
  isSpaced: boolean;
  Icon?: ComponentType<SVGProps<SVGSVGElement>>;
  onAction?: () => void;
}

const labelTypography = {
  tiny: typography.caption1Semibold,
  small: typography.body2Medium,
  big: typography.body1Medium,
};

const iconFill = {
  big: "var(--text-primary)",
  small: "var(--text-secondary)",
  tiny: "",
};

export const Label = ({
  variant,
  text,
  isSpaced,
  Icon,
  onAction,
}: ILabelProps) => {
  return (
    <div
      data-testid="Label_WRAPPER"
      className={joinClasses(
        styles.wrapper,
        styles[variant],
        labelTypography[variant],
        isSpaced && styles.spaced,
      )}
    >
      <span data-testid="Label_TEXT">{text}</span>
      {Icon && variant !== "tiny" && (
        <Icon
          className={styles.icon}
          fill={iconFill[variant]}
          onClick={onAction}
          data-testid="Label_ICON"
        />
      )}
    </div>
  );
};
