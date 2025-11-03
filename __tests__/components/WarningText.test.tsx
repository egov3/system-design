import { render, screen } from "@testing-library/react";
import { BaseComponents } from "~baseComponents";

describe("WarningText", () => {
  it("(1) Should render component if errorText is passed", () => {
    render(
      <BaseComponents.WarningText
        isNeedIcon={false}
        align="center"
        errorText="Some error text"
      />,
    );

    expect(screen.getByTestId("InputWarning_TEXT")).toBeInTheDocument();
  });

  it("(2) Should not render component if errorText is not passed", () => {
    render(
      <BaseComponents.WarningText
        isNeedIcon={false}
        align="left"
        errorText=""
      />,
    );

    expect(screen.queryByTestId("InputWarning_TEXT")).not.toBeInTheDocument();
  });

  it("(3) Should render icon if isNeedIcon is true", () => {
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
