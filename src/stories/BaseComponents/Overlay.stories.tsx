import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { useEffect, useRef, useState } from "react";
import { Overlay, OverlayPortalProvider } from "~baseComponents";

const OverlayDemo = () => {
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
      style={{
        width: "400px",
        height: "400px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        transform: "translateZ(0)",
        overflow: "hidden",
      }}
    >
      {portalContainer ? (
        <OverlayPortalProvider container={portalContainer}>
          <Overlay>
            <div
              style={{
                backgroundColor: "bisque",
                height: "100px",
                width: "100px",
              }}
            >
              Overlay test
            </div>
          </Overlay>
        </OverlayPortalProvider>
      ) : null}
    </div>
  );
};

const meta: Meta<typeof Overlay> = {
  title: "BaseComponents/Overlay",
  component: Overlay,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  render: () => <OverlayDemo />,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
