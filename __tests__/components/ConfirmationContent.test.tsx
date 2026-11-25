import { fireEvent, render, screen } from "@testing-library/react";

import { ConfirmationContent } from "~components";

describe("ConfirmationContent", () => {
  const onConfirm = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("(1) Should render confirmation data", () => {
    render(
      <ConfirmationContent
        illustration={<svg data-testid="TestIllustration" />}
        title="Confirmation title"
        description="Confirmation description"
      />,
    );
    expect(screen.getByTestId("TestIllustration")).toBeInTheDocument();
    expect(screen.getByTestId("Title_TITLE")).toHaveTextContent(
      "Confirmation title",
    );
    expect(screen.getByTestId("Title_SUBTEXT")).toHaveTextContent(
      "Confirmation description",
    );
  });
  it("(2) Should handle footer button actions", () => {
    render(
      <ConfirmationContent
        illustration={<svg />}
        title="Confirmation title"
        footerButtons={[
          {
            text: "Confirm",
            onClick: onConfirm,
            dataTestid: "ConfirmationContent_CONFIRM_BTN",
          },
        ]}
      />,
    );
    fireEvent.click(screen.getByTestId("ConfirmationContent_CONFIRM_BTN"));
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });
});
