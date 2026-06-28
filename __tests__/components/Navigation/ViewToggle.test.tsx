import { fireEvent, render, screen } from "@testing-library/react";
import { ViewToggle } from "~components";

describe("ViewToggleBtn", () => {
  it("(1) Should call setActiveView with correct viewType when button is clicked", () => {
    const mockSetActiveView = jest.fn();

    render(
      <ViewToggle
        activeView="serviceCardList"
        setActiveView={mockSetActiveView}
      />,
    );

    const serviceCardGridButton = screen.getByTestId("serviceCardGrid_ICON");
    fireEvent.click(serviceCardGridButton);

    expect(mockSetActiveView).toHaveBeenCalledWith("serviceCardGrid");
  });
});
