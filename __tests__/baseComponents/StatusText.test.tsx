import { render, screen } from "@testing-library/react";
import { BaseComponents } from "~baseComponents";

describe("StatusText", () => {
  it("(1) Should not render icon if isNeedIcon is false", () => {
    render(
      <BaseComponents.StatusText
        isAlignedCenter={true}
        text="Some error text"
      />,
    );

    expect(screen.queryByTestId("StatusTextError_ICON")).not.toBeInTheDocument();
  });

  it("(2) Should render icon if isNeedIcon is true", () => {
    render(
      <BaseComponents.StatusText isNeedIcon={true} text="Some error text" />,
    );

    expect(screen.getByTestId("StatusTextError_ICON")).toBeInTheDocument();
  });
});
