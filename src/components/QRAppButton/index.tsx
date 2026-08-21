import { cloneElement, type JSX } from "react";
import styles from "./QRAppButton.module.css";

export interface IQRAppButtonProps {
  icon: JSX.Element;
  qrImage: JSX.Element;
  handleOrderService: () => void;
}

export const QRAppButton = ({
  qrImage,
  icon,
  handleOrderService,
}: IQRAppButtonProps) => (
  <button
    data-testid="QRAppButton_BUTTON"
    onClick={handleOrderService}
    className={styles.wrap}
    type="button"
  >
    {cloneElement(qrImage, {
      className: styles.qrImage,
    })}
    {cloneElement(icon, {
      className: styles.icon,
    })}
  </button>
);
