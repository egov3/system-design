import React, { type JSX } from "react";
import { Typography } from "~baseComponents";
import styles from "./ServiceCardComponent.module.css";

export interface IServiceCardComponentProps {
  handleOrderService: () => void;
  title: string;
  badge: {
    category: { icon: JSX.Element };
    subcategory?: { icon: JSX.Element };
  };
  isNew: boolean;
}

export const ServiceCardComponent = ({
  handleOrderService,
  badge,
  isNew,
  title,
}: IServiceCardComponentProps) => (
  <button
    data-testid="ServiceCardComponent_BUTTON"
    onClick={handleOrderService}
    className={styles.popularServiceCard}
    type="button"
  >
    <div
      data-testid="ServiceCardComponent_WRAPPER"
      className={styles.TopServicesIconWrapper}
    >
      {React.cloneElement(badge.category.icon, {
        className: styles.category,
      })}
    </div>
    {isNew ? (
      <Typography
        data-testid="ServiceCardComponent_NEW"
        tag="span"
        className={styles.tagNew}
        fontClass="caption2Semibold"
      >
        NEW
      </Typography>
    ) : (
      badge.subcategory && (
        <div
          data-testid="ServiceCardComponent_CATEGORY"
          className={styles.tagsBackground}
        >
          {React.cloneElement(badge.subcategory.icon, {
            className: styles.subcategory,
          })}
        </div>
      )
    )}
    <Typography
      aria-label={title}
      data-testid="ServiceCardComponent_LABEL"
      tag="span"
      fontClass="caption1Regular"
      className={styles.TopServicesCardText}
    >
      {title}
    </Typography>
  </button>
);
