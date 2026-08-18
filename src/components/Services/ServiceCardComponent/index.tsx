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
  direction = "horizontal",
}: IServiceCardComponentProps) => {
  const isMobile = variant === "mobile";
  const isHorizontal = direction === "horizontal";

  return (
    <button
      data-testid="ServiceCardComponent_BUTTON"
      onClick={handleOrderService}
      className={joinClasses(
        styles.popularServiceCard,
        isMobile && styles.mobile,
        isHorizontal && styles.horizontal,
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
            fill: "var(--icon-white-nonconvert-color)",
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
        badge.category?.icon && (
          <div
            data-testid="ServiceCardComponent_CATEGORY"
            className={styles.tagsBackground}
          >
            {cloneElement(badge.category.icon, {
              className: styles.category,
            })}
          </div>
        )
      )}
      <Typography
        aria-label={title}
        data-testid="ServiceCardComponent_LABEL"
        tag="span"
        fontClass={isMobile ? "body2Medium" : "caption1Regular"}
        className={joinClasses(
          styles.TopServicesCardText,
          isHorizontal && styles.horizontal,
        )}
      >
        {title}
      </Typography>
    </button>
  );
};
