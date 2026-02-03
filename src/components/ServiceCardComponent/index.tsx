import React, { type JSX } from "react";
import { BaseComponents } from "~baseComponents";
import styles from "./ServiceCardComponent.module.css";

export interface IServiceDetailsItem {
  categoryName: string;
  id: number;
  isNew: boolean;
  isPopular: boolean;
  link: string;
}

export interface IServiceCardComponentProps {
  handleOrderService: () => void;
  title: string;
  badge?: {
    category: { icon: JSX.Element };
    subcategory: { icon: JSX.Element };
  };
  serviceDetails: IServiceDetailsItem;
}

export const ServiceCardComponent = ({
  handleOrderService,
  badge,
  serviceDetails,
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
      {badge &&
        React.cloneElement(badge.category.icon, {
          className: styles.category,
        })}
    </div>
    {serviceDetails.isNew && (
      <BaseComponents.Typography
        data-testid="ServiceCardComponent_NEW"
        tag="span"
        className={styles.tagNew}
        fontClass="caption2Semibold"
      >
        NEW
      </BaseComponents.Typography>
    )}
    {serviceDetails.categoryName.length > 0 && !serviceDetails.isNew && (
      <div
        data-testid="ServiceCardComponent_CATEGORY"
        className={styles.tagsBackground}
      >
        {badge &&
          React.cloneElement(badge.subcategory.icon, {
            className: styles.subcategory,
          })}
      </div>
    )}
    <BaseComponents.Typography
      aria-label={title}
      data-testid="ServiceCardComponent_LABEL"
      tag="span"
      fontClass="caption1Regular"
      className={styles.TopServicesCardText}
    >
      {title}
    </BaseComponents.Typography>
  </button>
);
