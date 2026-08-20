import { cloneElement, type JSX } from "react";
import { Typography } from "../../baseComponents/Typography";
import styles from "./SocialCard.module.css";

export interface ISocialCardProps {
  icon: JSX.Element;
  title: string;
  handleOrderService: () => void;
}

export const SocialCard = ({
  title,
  icon,
  handleOrderService,
}: ISocialCardProps) => (
  <button
    data-testid="SocialCard_BUTTON"
    onClick={handleOrderService}
    className={styles.socialCard}
    type="button"
  >
    {cloneElement(icon, {
      className: styles.icon,
    })}
    <Typography
      data-testid="SocialCardTitle_TEXT"
      aria-label={title}
      tag="span"
      className={styles.title}
      fontClass="caption1Regular"
    >
      {title}
    </Typography>
  </button>
);
