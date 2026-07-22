import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { joinClasses } from "~utils/joinClasses";
import styles from "./Overlay.module.css";

export interface IOverlayProps {
  children: React.ReactNode;
  className?: string;
}

const OverlayPortalContext = createContext<Element | DocumentFragment | null>(
  null,
);

export const OverlayPortalProvider = ({
  container,
  children,
}: {
  container: Element | DocumentFragment | null;
  children: React.ReactNode;
}) => (
  <OverlayPortalContext.Provider value={container}>
    {children}
  </OverlayPortalContext.Provider>
);

export const Overlay = ({ children, className }: IOverlayProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const portalContainer = useContext(OverlayPortalContext);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return createPortal(
    <div
      className={
        className ? joinClasses(styles.overlay, className) : styles.overlay
      }
      data-testid="Overlay_WRAP"
    >
      {children}
    </div>,
    portalContainer ?? document.body,
  );
};
