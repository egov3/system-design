import type React from "react";
import { joinClasses } from "~utils/joinClasses";
import styles from "./Overlay.module.css";

export interface IOverlayProps {
  children: React.ReactNode;
  className?: string;
}

export const Overlay = ({ children, className }: IOverlayProps) => {
  return (
    <div
      className={
        className ? joinClasses(styles.overlay, className) : styles.overlay
      }
      data-testid="Overlay_WRAP"
    >
      {children}
    </div>
  );
};
