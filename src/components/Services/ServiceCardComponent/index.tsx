import { cloneElement } from "react";
import { Typography } from "~baseComponents";
import type { IServiceCardComponentProps } from "~interfaces/ServiceCardComponent";
import { joinClasses } from "~utils/joinClasses";
import styles from "./ServiceCardComponent.module.css";

export const ServiceCardComponent = ({
  handleOrderService,
  badge,
  isNew,
  title,
  variant = "default",
}: IServiceCardComponentProps) => {
  const isMobile = variant === "mobile";

  return (
    <button
      data-testid="ServiceCardComponent_BUTTON"
      onClick={handleOrderService}
      className={joinClasses(
        styles.popularServiceCard,
        isMobile && styles.mobile,
      )}
      type="button"
    >
      <div
        data-testid="ServiceCardComponent_WRAPPER"
        className={joinClasses(
          styles.TopServicesIconWrapper,
          isMobile && styles.mobile,
        )}
      >
        {badge.subcategory &&
          cloneElement(badge.subcategory.icon, {
            className: styles.subcategory,
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
        <div
          data-testid="ServiceCardComponent_CATEGORY"
          className={styles.tagsBackground}
        >
          {cloneElement(badge.category.icon, {
            className: styles.category,
          })}
        </div>
      )}
      <Typography
        aria-label={title}
        data-testid="ServiceCardComponent_LABEL"
        tag="span"
        fontClass={isMobile ? "body2Medium" : "caption1Regular"}
        className={styles.TopServicesCardText}
      >
        {title}
      </Typography>
    </button>
  );
};
