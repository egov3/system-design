import { render, screen } from "@testing-library/react";
import { BaseComponents } from "~baseComponents";

const { Loader } = BaseComponents;

describe("Loader", () => {
  it("(1) Should not render when open is false", () => {
    render(<Loader open={false} />);

    expect(screen.queryByTestId("Loader_MAIN")).not.toBeInTheDocument();
    expect(screen.queryByTestId("Loader_CIRCLE")).not.toBeInTheDocument();
  });

  it("(2) Should render when open is true", () => {
    render(<Loader open={true} />);

    expect(screen.getByTestId("Loader_MAIN")).toBeInTheDocument();
    expect(screen.getByTestId("Loader_CIRCLE")).toBeInTheDocument();
  });

  it("(3) Should have correct CSS classes", () => {
    render(<Loader open={true} />);

    const mainElement = screen.getByTestId("Loader_MAIN");
    const circleElement = screen.getByTestId("Loader_CIRCLE");

    expect(mainElement).toHaveClass("backdrop");
    expect(circleElement).toHaveClass("circularProgress");
  });

  it("(4) Should toggle rendering based on open prop", () => {
    const { rerender } = render(<Loader open={false} />);

    expect(screen.queryByTestId("Loader_MAIN")).not.toBeInTheDocument();

    rerender(<Loader open={true} />);

    expect(screen.getByTestId("Loader_MAIN")).toBeInTheDocument();
    expect(screen.getByTestId("Loader_CIRCLE")).toBeInTheDocument();

    rerender(<Loader open={false} />);

    expect(screen.queryByTestId("Loader_MAIN")).not.toBeInTheDocument();
    expect(screen.queryByTestId("Loader_CIRCLE")).not.toBeInTheDocument();
  });
});
