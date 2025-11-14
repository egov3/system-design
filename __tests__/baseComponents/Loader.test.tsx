import { render, screen } from "@testing-library/react";
import { BaseComponents } from "~baseComponents";

const { Loader } = BaseComponents;

describe("Loader", () => {
  it("(1) Should have correct CSS classes", () => {
    render(<Loader />);

    const mainElement = screen.getByTestId("Loader_MAIN");
    const circleElement = screen.getByTestId("Loader_CIRCLE");

    expect(mainElement).toHaveClass("backdrop");
    expect(circleElement).toHaveClass("circularProgress");
  });
});
