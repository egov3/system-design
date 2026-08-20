import type { JSX } from "react/jsx-runtime";

export interface IUsefulServiceCardProps {
  handleOrderService: () => void;
  title: string;
  label: string;
  icon: JSX.Element;
}
