import { cloneElement, type JSX } from "react";
import { Typography } from "../../../baseComponents/Typography";
import styles from "./UsefulServiceCard.module.css";

export interface IUsefulServiceCardProps {
  handleOrderService: () => void;
  title: string;
  label: string;
  icon: JSX.Element;
}

export const UsefulServiceCard = ({
  title,
  label,
  icon,
  handleOrderService,
}: IUsefulServiceCardProps) => (
  <button
    data-testid="UsefulServiceCard_BUTTON"
    onClick={handleOrderService}
    className={styles.usefulServiceCard}
    type="button"
  >
    {cloneElement(icon, {
      className: styles.icon,
    })}
    <div
      data-testid="UsefulServiceCardText_WRAPPER"
      className={styles.textWrapper}
    >
      <Typography
        data-testid="UsefulServiceCardTitle_TEXT"
        aria-label={title}
        tag="span"
        className={styles.title}
        fontClass="body2Regular"
      >
        {title}
      </Typography>
      <Typography
        aria-label={label}
        data-testid="UsefulServiceCardLabel_TEXT"
        tag="span"
        className={styles.label}
        fontClass="caption2Regular"
      >
        {label}
      </Typography>
    </div>
  </button>
);
