import { fireEvent, render, screen } from "@testing-library/react";

import { NextStepComponent } from "~components";

describe("NextStepComponent", () => {
  it("(1) Should call onNextStep when button is clicked", () => {
    const mockOnNextStep = jest.fn();
    render(
      <NextStepComponent
        handleNextStepClick={mockOnNextStep}
        lang="ru"
        disabled={false}
      />,
    );

    const nextStepButton = screen.getByTestId("NextStepBtn");
    fireEvent.click(nextStepButton);

    expect(mockOnNextStep).toHaveBeenCalledTimes(1);
  });

  it("(2) Should render the mobile sticky wrapper when isMobile is true and behave as usual", () => {
    const mockOnNextStep = jest.fn();
    render(
      <NextStepComponent
        handleNextStepClick={mockOnNextStep}
        lang="ru"
        disabled={false}
        isMobile
      />,
    );

    expect(screen.getByTestId("NextStepBtn_WRAPPER")).toHaveClass(
      "mobileNextStep",
    );
    expect(screen.getByTestId("NextStepBtn")).toHaveClass("mobile");
    fireEvent.click(screen.getByTestId("NextStepBtn"));

    expect(mockOnNextStep).toHaveBeenCalledTimes(1);
  });
});
