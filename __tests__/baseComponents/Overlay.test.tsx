import { render, screen } from "@testing-library/react";
import { Overlay, OverlayPortalProvider } from "~baseComponents";

describe("Overlay", () => {
  it("(1) Should join provided className", () => {
    render(
      <Overlay className="test">
        <div>Hello</div>
      </Overlay>,
    );
    const overlay = screen.getByTestId("Overlay_WRAP");
    expect(overlay).toHaveClass("test");
  });

  it("(2) Should render into a custom portal container when provided", () => {
    const container = document.createElement("div");
    document.body.appendChild(container);

    render(
      <OverlayPortalProvider container={container}>
        <Overlay>
          <div>Hello</div>
        </Overlay>
      </OverlayPortalProvider>,
    );

    expect(
      container.querySelector('[data-testid="Overlay_WRAP"]'),
    ).not.toBeNull();
    expect(screen.getByTestId("Overlay_WRAP")).toHaveTextContent("Hello");

    container.remove();
  });
});
