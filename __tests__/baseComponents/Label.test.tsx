import { render, screen } from "@testing-library/react";
import { BaseComponents } from "~baseComponents";

describe("TextPair", () => {
  it("(1) Should render double variant with main and secondary text", () => {
    render(
      <BaseComponents.TextPair
        mainText="Main style text"
        secondaryText="Secondary style text"
      />,
    );

    const mainText = screen.getByTestId("TextPair_MAIN");
    const secondaryText = screen.getByTestId("TextPair_SECONDARY");

    expect(mainText).toBeInTheDocument();
    expect(mainText).toHaveClass("textVariantRegular");

    expect(secondaryText).toBeInTheDocument();
    expect(secondaryText).toHaveClass("secondaryText");
  });

  it("(2) Should render single text default variant", () => {
    render(<BaseComponents.TextPair mainText="Main style text" />);

    const mainText = screen.getByTestId("TextPair_MAIN");

    expect(mainText).toBeInTheDocument();
    expect(mainText).toHaveClass("textVariantRegular");
  });

  it("(3) Should render single text variant='REGULAR'", () => {
    render(
      <BaseComponents.TextPair mainText="Main style text" variant="REGULAR" />,
    );

    const mainText = screen.getByTestId("TextPair_MAIN");

    expect(mainText).toBeInTheDocument();
    expect(mainText).toHaveClass("textVariantRegular");
  });

  it("(4) Should render single text variant='ERROR'", () => {
    render(
      <BaseComponents.TextPair mainText="Main style text" variant="ERROR" />,
    );

    const mainText = screen.getByTestId("TextPair_MAIN");

    expect(mainText).toBeInTheDocument();
    expect(mainText).toHaveClass("textVariantError");
  });

  it("(5) Should render single text variant='INFO'", () => {
    render(
      <BaseComponents.TextPair mainText="Main style text" variant="INFO" />,
    );

    const mainText = screen.getByTestId("TextPair_MAIN");

    expect(mainText).toBeInTheDocument();
    expect(mainText).toHaveClass("textVariantInfo");
  });

  it("(6) Should render single text variant='SUCCESS'", () => {
    render(
      <BaseComponents.TextPair mainText="Main style text" variant="SUCCESS" />,
    );

    const mainText = screen.getByTestId("TextPair_MAIN");

    expect(mainText).toBeInTheDocument();
    expect(mainText).toHaveClass("textVariantSuccess");
  });
});
