import type { TReleasedServices } from "~interfaces/PresaleTemplate";
import type { TSubmenuNavFlKey } from "../interfaces/Navigation";

export interface IServiceItem {
  categoryName: TSubmenuNavFlKey;
  id: number;
  isNew: boolean;
  isPopular: boolean;
  link: string;
}

export const SERVICES_LIST: Record<TReleasedServices, IServiceItem> = {
  P601: {
    categoryName: "socialWelfare.pension",
    id: 1,
    isNew: false,
    isPopular: true,
    link: "/services/presale/P601",
  },
  P305: {
    categoryName: "estate.buyRent",
    id: 2,
    isNew: false,
    isPopular: true,
    link: "/services/presale/P305",
  },
  P2203: {
    categoryName: "estate.buyRent",
    id: 9,
    isNew: true,
    isPopular: true,
    link: "/services/presale/P2203",
  },
  P608: {
    categoryName: "socialWelfare.invalid",
    id: 10,
    isNew: true,
    isPopular: true,
    link: "/services/presale/P608",
  },
  P3061: {
    categoryName: "estate.buyRent",
    id: 3,
    isNew: false,
    isPopular: true,
    link: "/services/presale/P3061",
  },
};
