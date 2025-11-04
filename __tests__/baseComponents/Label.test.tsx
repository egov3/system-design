import { render, screen } from "@testing-library/react";
import { BaseComponents } from "~baseComponents";

describe("Label", () => {
  it("(1) Should render single variant with main text", () => {
    render(<BaseComponents.Label mainText="Main style text" />);

    const mainText = screen.getByTestId("LabelText_MAIN");

    expect(mainText).toBeInTheDocument();
    expect(mainText).toHaveClass("mainText");
  });

  it("(2) Should render double variant with main and secondary text", () => {
    render(
      <BaseComponents.Label
        mainText="Main style text"
        secondaryText="Secondary style text"
      />,
    );

    const mainText = screen.getByTestId("LabelText_MAIN");
    const secondaryText = screen.getByTestId("LabelText_SECONDARY");

    expect(mainText).toBeInTheDocument();
    expect(mainText).toHaveClass("mainText");

    expect(secondaryText).toBeInTheDocument();
    expect(secondaryText).toHaveClass("secondaryText");
  });
});
