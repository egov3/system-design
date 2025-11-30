import { fireEvent, render, screen } from "@testing-library/react";
import { Components } from "~components";

describe("NextStepComponent", () => {
  it("(1) Should call onNextStep when button is clicked", () => {
    const mockOnNextStep = jest.fn();
    render(
      <Components.NextStepComponent
        handleNextStepClick={mockOnNextStep}
        lang="ru"
        disabled={false}
      />,
    );

    const nextStepButton = screen.getByTestId("NextStepBtn");
    fireEvent.click(nextStepButton);

    expect(mockOnNextStep).toHaveBeenCalledTimes(1);
  });
});
