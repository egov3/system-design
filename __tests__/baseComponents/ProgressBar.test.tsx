import { render, screen } from "@testing-library/react";
import { ProgressBar } from "~baseComponents";

describe("ProgressBar", () => {
  it("(1) Should display 0 percent by default", () => {
    render(<ProgressBar />);

    expect(screen.getByTestId("ProgressBar_VALUE")).toHaveTextContent("0%");
    expect(screen.getByTestId("ProgressBar")).not.toHaveClass(
      "circularProgressCompleted",
    );
  });

  it("(2) Should display the current progress value", () => {
    render(<ProgressBar progress={50} />);
    expect(screen.getByTestId("ProgressBar_VALUE")).toHaveTextContent("50%");
  });

  it("(3) Should not display a value below 0 percent", () => {
    render(<ProgressBar progress={-10} />);
    expect(screen.getByTestId("ProgressBar_VALUE")).toHaveTextContent("0%");
  });

  it("(4) Should not display a value above 100 percent", () => {
    render(<ProgressBar progress={150} />);
    expect(screen.getByTestId("ProgressBar_VALUE")).toHaveTextContent("100%");
  });

  it("(5) Should apply completed class at 100 percent", () => {
    render(<ProgressBar progress={100} />);
    expect(screen.getByTestId("ProgressBar")).toHaveClass(
      "circularProgressCompleted",
    );
  });
});
