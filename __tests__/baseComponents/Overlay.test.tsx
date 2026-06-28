import { render, screen } from "@testing-library/react";
import { Overlay } from "~baseComponents";

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
});
