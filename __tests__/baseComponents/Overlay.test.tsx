import { render, screen } from "@testing-library/react";
import { BaseComponents } from "~baseComponents";

describe("Overlay", () => {
  it("(1) Should join provided className", () => {
    render(
      <BaseComponents.Overlay className="test">
        <div>Hello</div>
      </BaseComponents.Overlay>,
    );
    const overlay = screen.getByTestId("Overlay_WRAP");
    expect(overlay).toHaveClass("test");
  });
});
