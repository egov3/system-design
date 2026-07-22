import type React from "react";
import { useEffect, useRef, useState } from "react";
import { OverlayPortalProvider } from "~baseComponents";

interface IStoryPortalFrameProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const StoryPortalFrame = ({
  children,
  className,
  style,
}: IStoryPortalFrameProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [portalContainer, setPortalContainer] = useState<HTMLDivElement | null>(
    null,
  );

  useEffect(() => {
    setPortalContainer(containerRef.current);
  }, []);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        position: "relative",
        transform: "translateZ(0)",
        overflow: "hidden",
        ...style,
      }}
    >
      {portalContainer ? (
        <OverlayPortalProvider container={portalContainer}>
          {children}
        </OverlayPortalProvider>
      ) : null}
    </div>
  );
};
