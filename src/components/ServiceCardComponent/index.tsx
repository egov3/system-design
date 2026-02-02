import React from "react";
import { BaseComponents } from "~baseComponents";
import { i18n } from "~constants/i18n";
import { SERVICES_LIST } from "~constants/ServicesList";
import type { ILangProps } from "~interfaces/common";
import type { TReleasedServices } from "~interfaces/PresaleTemplate";
import type { ICategoryUnion } from "../../interfaces/Navigation";
import styles from "./ServiceCardComponent.module.css";

export interface IServiceCardComponentProps extends ILangProps {
  handleOrderService: () => void;
  serviceId: TReleasedServices;
  badge:
    | {
        category: ICategoryUnion;
        subcategory: ICategoryUnion;
      }
    | undefined;
}

export const ServiceCardComponent = ({
  serviceId,
  handleOrderService,
  lang,
  badge,
}: IServiceCardComponentProps) => {
  const langDic = i18n.servicesListNames;
  const serviceDetails = SERVICES_LIST[serviceId];

  return (
    <button
      data-testid="ServiceCardComponent_BUTTON"
      onClick={handleOrderService}
      key={langDic[serviceId][lang]}
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
        arial-label={langDic[serviceId][lang]}
        data-testid="ServiceCardComponent_LABEL"
        tag="span"
        fontClass="caption1Regular"
        className={styles.TopServicesCardText}
      >
        {langDic[serviceId][lang]}
      </BaseComponents.Typography>
    </button>
  );
};
