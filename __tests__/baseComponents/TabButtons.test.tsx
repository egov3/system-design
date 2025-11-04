import { fireEvent, render, screen } from "@testing-library/react";
import { BaseComponents } from "~baseComponents";
import { tabLabelsArray } from "~constants/TabButtons";

describe("TabButtons", () => {
  it("(1) Should render the correct number of tab buttons", () => {
    const setActiveTab = jest.fn();
    const activeTab = "FIRST";

    render(
      <BaseComponents.TabButtons
        tabDocLabels={tabLabelsArray}
        activeTab={activeTab}
        handleClick={setActiveTab}
      />,
    );

    const tabButtons = screen.getAllByTestId("TabButtons_BUTTON");
    expect(tabButtons).toHaveLength(2);
  });

  it("(2) Should highlight the active tab button", () => {
    const setActiveTab = jest.fn();
    const activeTab = "SECOND";

    render(
      <BaseComponents.TabButtons
        tabDocLabels={tabLabelsArray}
        activeTab={activeTab}
        handleClick={setActiveTab}
      />,
    );

    const tabButtons = screen.getAllByTestId("TabButtons_BUTTON");
    expect(tabButtons[1]).toHaveClass("active");
  });

  it("(3) Should call setActiveTab when a tab button is clicked", () => {
    const setActiveTab = jest.fn();
    const activeTab = "FIRST";

    render(
      <BaseComponents.TabButtons
        tabDocLabels={tabLabelsArray}
        activeTab={activeTab}
        handleClick={setActiveTab}
      />,
    );

    const secondTabButton = screen.getByText("Second Tab");
    fireEvent.click(secondTabButton);

    expect(setActiveTab).toHaveBeenCalledWith("SECOND");
  });
});
