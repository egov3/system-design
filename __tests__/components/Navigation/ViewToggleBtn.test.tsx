import { fireEvent, render, screen } from "@testing-library/react";
import { Components } from "~components";

describe("ViewToggleBtn", () => {
  it("(1) Should call setActiveView with correct viewType when button is clicked", () => {
    const mockSetActiveView = jest.fn();
    const mockIcon = () => <svg />;

    render(
      <Components.ViewToggleBtn
        viewType="serviceCardGrid"
        activeView="serviceCardList"
        setActiveView={mockSetActiveView}
        Icon={mockIcon}
      />,
    );

    const toggleButton = screen.getByTestId("ViewToggleBtn_BTN");
    fireEvent.click(toggleButton);

    expect(mockSetActiveView).toHaveBeenCalledWith("serviceCardGrid");
  });

  it("(2) Should render icon with primary color when active", () => {
    const mockSetActiveView = jest.fn();
    const mockIcon = (props: React.SVGProps<SVGSVGElement>) => (
      <svg {...props} />
    );

    render(
      <Components.ViewToggleBtn
        viewType="serviceCardList"
        activeView="serviceCardList"
        setActiveView={mockSetActiveView}
        Icon={mockIcon}
      />,
    );

    const icon = screen.getByTestId("serviceCardList_ICON");
    expect(icon).toHaveAttribute("fill", "var(--icon-primary-color)");
  });
});
