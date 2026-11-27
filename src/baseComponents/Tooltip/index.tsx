import { cloneElement, useId, type ReactElement } from "react";

import { Typography } from "../Typography";
import styles from "./Tooltip.module.css";

export interface ITooltipProps {
  text: string;
  children: ReactElement<{ "aria-describedby"?: string }>;
}

export const Tooltip = ({ text, children }: ITooltipProps) => {
  const id = useId();
  const describedBy = [children.props["aria-describedby"], id]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={styles.wrapper} data-testid="Tooltip_TRIGGER">
      {cloneElement(children, { "aria-describedby": describedBy })}
      <span
        id={id}
        className={styles.tooltip}
        role="tooltip"
        data-testid="Tooltip"
      >
        <span className={styles.arrow} aria-hidden="true" />
        <Typography tag="span" fontClass="body2Medium" className={styles.text}>
          {text}
        </Typography>
      </span>
    </span>
  );
};
