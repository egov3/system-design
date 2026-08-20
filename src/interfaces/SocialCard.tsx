import type { JSX } from "react/jsx-runtime";

export interface ISocialCardProps {
  icon: JSX.Element;
  title: string;
  handleOrderService: () => void;
}
