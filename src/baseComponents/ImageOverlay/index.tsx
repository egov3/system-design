import type React from "react";

import { joinClasses } from "~utils/joinClasses";

import { Button } from "../Button";
import styles from "./ImageOverlay.module.css";

export interface IImageOverlayButton {
  icon: React.ReactNode;
  ariaLabel: string;
  onClick: () => void;
}

export interface IImageOverlayProps {
  src: string;
  alt: string;
  button: IImageOverlayButton;
  className?: string;
}

export const ImageOverlay = ({
  src,
  alt,
  button,
  className,
}: IImageOverlayProps) => (
  <div
    className={joinClasses(styles.wrapper, className)}
    data-testid="ImageOverlay_WRAPPER"
  >
    <img
      className={styles.image}
      src={src}
      alt={alt}
      data-testid="ImageOverlay_IMAGE"
    />
    <div className={styles.overlay} data-testid="ImageOverlay_OVERLAY">
      <Button
        variant="alternative"
        size="large"
        aria-label={button.ariaLabel}
        onClick={(event) => {
          if (event.detail > 0) event.currentTarget.blur();
          button.onClick();
        }}
        data-testid="ImageOverlay_BUTTON"
      >
        {button.icon}
      </Button>
    </div>
  </div>
);
