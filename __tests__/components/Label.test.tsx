import { render, screen } from "@testing-library/react";
import { BaseComponents } from "~baseComponents";

describe("Label", () => {
  it("(1) Should render single variant with main text", () => {
    render(
      <BaseComponents.Label variant="single" mainText="Main style text" />,
    );

    const mainText = screen.getByTestId("LabelText_MAIN");

    expect(mainText).toBeInTheDocument();
    expect(mainText).toHaveClass("mainText");
  });

  it("(2) Should render single variant with main text in inverse style", () => {
    render(
      <BaseComponents.Label
        variant="single"
        mainText="Secondary style text"
        inverseStyle={true}
      />,
    );

    const mainText = screen.getByTestId("LabelText_MAIN");

    expect(mainText).toBeInTheDocument();
    expect(mainText).toHaveClass("secondaryText");
  });

  it("(3) Should render double variant with main and secondary text", () => {
    render(
      <BaseComponents.Label
        variant="double"
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

  it("(4) Should render double variant with main and secondary text in inverse style", () => {
    render(
      <BaseComponents.Label
        variant="double"
        mainText="Secondary style text"
        secondaryText="Main style text"
        inverseStyle={true}
      />,
    );

    const mainText = screen.getByTestId("LabelText_MAIN");
    const secondaryText = screen.getByTestId("LabelText_SECONDARY");

    expect(mainText).toBeInTheDocument();
    expect(mainText).toHaveClass("secondaryText");

    expect(secondaryText).toBeInTheDocument();
    expect(secondaryText).toHaveClass("mainText");
  });
});
