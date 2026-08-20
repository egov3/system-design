import { cloneElement } from "react";
import type { ISocialCardProps } from "~interfaces/SocialCard";
import { Typography } from "../../baseComponents/Typography";
import styles from "./SocialCard.module.css";

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
