import {
  cloneElement,
  useEffect,
  useId,
  useState,
  type ReactElement,
} from "react";

import { Typography } from "../Typography";
import styles from "./Tooltip.module.css";

export interface ITooltipProps {
  text: string;
  children: ReactElement<{ "aria-describedby"?: string }>;
}

export const Tooltip = ({ text, children }: ITooltipProps) => {
  const id = useId();
  const [dismissed, setDismissed] = useState(false);
  const describedBy = [children.props["aria-describedby"], id]
    .filter(Boolean)
    .join(" ");

  useEffect(() => {
    const dismissOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setDismissed(true);
    };

    document.addEventListener("keydown", dismissOnEscape);
    return () => document.removeEventListener("keydown", dismissOnEscape);
  }, []);

  return (
    <span
      className={styles.wrapper}
      data-testid="Tooltip_WRAPPER"
      data-dismissed={dismissed}
      onMouseEnter={() => setDismissed(false)}
      onFocus={() => setDismissed(false)}
    >
      {cloneElement(children, { "aria-describedby": describedBy })}
      <span
        id={id}
        className={styles.tooltip}
        role="tooltip"
        data-testid="Tooltip_BUBBLE"
      >
        <span className={styles.arrow} aria-hidden="true" />
        <Typography tag="span" fontClass="body2Medium" className={styles.text}>
          {text}
        </Typography>
      </span>
    </span>
  );
};
