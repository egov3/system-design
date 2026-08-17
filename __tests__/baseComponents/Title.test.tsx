import { render, screen } from "@testing-library/react";
import { Title } from "~baseComponents";

describe("Title", () => {
  const defaultProps = { title: "Внимание!", size: "medium" as const };

  it("(1) Should render the title and the subtext", () => {
    render(<Title {...defaultProps} subtext="Подтекст" />);
    expect(screen.getByTestId("Title_TITLE")).toHaveTextContent("Внимание!");
    expect(screen.getByTestId("Title_SUBTEXT")).toHaveTextContent("Подтекст");
  });

  it("(2) Should not render the subtext when it is not provided", () => {
    render(<Title {...defaultProps} />);
    expect(screen.queryByTestId("Title_SUBTEXT")).not.toBeInTheDocument();
  });

  it("(3) Should apply the centered class only when isCentered is set", () => {
    const { rerender } = render(<Title {...defaultProps} />);
    expect(screen.getByTestId("Title_WRAPPER")).not.toHaveClass("centered");
    rerender(<Title {...defaultProps} isCentered={true} />);
    expect(screen.getByTestId("Title_WRAPPER")).toHaveClass("centered");
  });
});
