import { Typography } from "../Typography";
import styles from "./Tooltip.module.css";

export interface ITooltipProps {
  id: string;
  text: string;
}

export const Tooltip = ({ id, text }: ITooltipProps) => (
  <div id={id} className={styles.tooltip} role="tooltip" data-testid="Tooltip">
    <span className={styles.arrow} aria-hidden="true" />
    <Typography tag="p" fontClass="body2Medium" className={styles.text}>
      {text}
    </Typography>
  </div>
);
