import { render, screen } from "@testing-library/react";
import { BaseComponents } from "~baseComponents";

describe("WarningText", () => {
  it("(1) Should not render icon if isNeedIcon is false", () => {
    render(
      <BaseComponents.WarningText
        isNeedIcon={false}
        centerAlign={true}
        errorText="Some error text"
      />,
    );

    expect(screen.queryByTestId("Warning_ICON")).not.toBeInTheDocument();
  });

  it("(2) Should render icon if isNeedIcon is true", () => {
    render(
      <BaseComponents.WarningText
        isNeedIcon={true}
        centerAlign={false}
        errorText="Some error text"
      />,
    );

    expect(screen.getByTestId("Warning_ICON")).toBeInTheDocument();
  });
});
