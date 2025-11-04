import { render, screen } from "@testing-library/react";
import { BaseComponents } from "~baseComponents";

describe("WarningText", () => {
  it("(1) Should not render icon if isNeedIcon is false", () => {
    render(
      <BaseComponents.WarningText
        isNeedIcon={false}
        align="center"
        errorText="Some error text"
      />,
    );

    expect(screen.queryByTestId("InputWarning_ICON")).not.toBeInTheDocument();
  });

  it("(2) Should render icon if isNeedIcon is true", () => {
    render(
      <BaseComponents.WarningText
        isNeedIcon={true}
        align="left"
        errorText="Some error text"
      />,
    );

    expect(screen.getByTestId("InputWarning_ICON")).toBeInTheDocument();
  });
});
