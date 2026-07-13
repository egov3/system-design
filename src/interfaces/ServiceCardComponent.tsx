import type { JSX } from "react";

export type TServiceCardVariant = "default" | "mobile";

export interface IServiceCardComponentProps {
  handleOrderService: () => void;
  title: string;
  badge: {
    category: { icon: JSX.Element };
    subcategory?: { icon: JSX.Element };
  };
  isNew: boolean;
  variant?: TServiceCardVariant;
}
