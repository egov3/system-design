import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Calendar } from "../../src/components/Calendar";
import React from "react";

describe("Calendar", () => {
  const setIsMock = jest.fn();
  const mockSelectedPeriod = {
    fromDate: "2025-02-01",
    toDate: "2025-02-01",
    allTime: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("(1) Should correctly switch between FROM/TO tabs and save when valid", () => {
    render(
      <Calendar
        selectedPeriod={mockSelectedPeriod}
        setSelectedPeriod={setIsMock}
        setIsModalOpen={setIsMock}
        setSelectedRadioOption={setIsMock}
        lang="ru"
      />
    );

    const saveButton = screen.getByTestId("CalendarSave_BUTTON");
    const toButton = screen.getByTestId("CalendarTabButton_TO");

    fireEvent.click(toButton);
    expect(toButton).toHaveClass(/titleActiv/);

    fireEvent.click(saveButton);

    expect(setIsMock).toHaveBeenCalledWith(false); 
    expect(setIsMock).toHaveBeenCalledWith("custom"); 
  });

  it("(3) Should handle date navigation button clicks correctly", () => {
    render(
      <Calendar
        selectedPeriod={mockSelectedPeriod}
        setSelectedPeriod={setIsMock}
        setIsModalOpen={setIsMock}
        setSelectedRadioOption={setIsMock}
        lang="ru"
      />
    );

    const upDay = screen.getByTestId("CalendarDayButton_UP");
    const downDay = screen.getByTestId("CalendarDayButton_DOWN");
    const upMonth = screen.getByTestId("CalendarMonthButton_UP");
    const downMonth = screen.getByTestId("CalendarMonthButton_DOWN");
    const upYear = screen.getByTestId("CalendarYearButton_UP");
    const downYear = screen.getByTestId("CalendarYearButton_DOWN");

    fireEvent.click(upDay);
    fireEvent.click(downDay);
    fireEvent.click(upMonth);
    fireEvent.click(downMonth);
    fireEvent.click(upYear);
    fireEvent.click(downYear);

    expect(upDay).toBeEnabled();
    expect(downDay).toBeEnabled();
  });

  it("(4) Should disable save button and show error for invalid date range", () => {
    const invalidPeriod = {
      fromDate: "2025-02-15", 
      toDate: "2025-02-10",
      allTime: false,
    };

    render(
      <Calendar
        selectedPeriod={invalidPeriod}
        setSelectedPeriod={setIsMock}
        setIsModalOpen={setIsMock}
        setSelectedRadioOption={setIsMock}
        lang="ru"
      />
    );

    const saveButton = screen.getByTestId("CalendarSave_BUTTON");
    const errorDescription = screen.getByTestId("CalendarError_DESCRIPTION");

    expect(saveButton).toBeDisabled();
    expect(errorDescription).toBeInTheDocument();
  });

  it("(5) Should normalize days when changing months", () => {
    render(
      <Calendar
        selectedPeriod={mockSelectedPeriod}
        setSelectedPeriod={setIsMock}
        setIsModalOpen={setIsMock}
        setSelectedRadioOption={setIsMock}
        lang="ru"
      />
    );

    const downMonth = screen.getByTestId("CalendarMonthButton_DOWN");

    fireEvent.click(downMonth); 
    fireEvent.click(downMonth); 
    const dayItems = screen.getAllByTestId("CalendarDay_ITEM");
    expect(dayItems.length).toBeGreaterThan(0);
  });

  it("(6) Should cycle through all months correctly", () => {
    render(
      <Calendar
        selectedPeriod={mockSelectedPeriod}
        setSelectedPeriod={setIsMock}
        setIsModalOpen={setIsMock}
        setSelectedRadioOption={setIsMock}
        lang="ru"
      />
    );

    const downMonth = screen.getByTestId("CalendarMonthButton_DOWN");

    for (let i = 0; i < 6; i++) {
      fireEvent.click(downMonth);
    }
    const monthItems = screen.getAllByTestId("CalendarMonth_ITEM");
    expect(monthItems.length).toBeGreaterThan(0);
  });

  it("(7) Should handle drag-to-scroll functionality", async () => {
    render(
      <Calendar
        selectedPeriod={mockSelectedPeriod}
        setSelectedPeriod={setIsMock}
        setIsModalOpen={setIsMock}
        setSelectedRadioOption={setIsMock}
        lang="ru"
      />
    );

    const dayButton = screen.getByTestId("CalendarDay_BUTTON");

    await act(async () => {
      fireEvent.mouseDown(dayButton, { clientY: 100 });
      fireEvent.mouseMove(document, { clientY: 50 }); 
      fireEvent.mouseUp(document);
    });

    const dayItems = screen.getAllByTestId("CalendarDay_ITEM");
    expect(dayItems.length).toBeGreaterThan(0);
  });

  it("(8) Should maintain valid day boundaries", () => {
    render(
      <Calendar
        selectedPeriod={mockSelectedPeriod}
        setSelectedPeriod={setIsMock}
        setIsModalOpen={setIsMock}
        setSelectedRadioOption={setIsMock}
        lang="ru"
      />
    );

    const downDay = screen.getByTestId("CalendarDayButton_DOWN");

    for (let i = 0; i < 10; i++) {
      fireEvent.click(downDay);
    }

    const dayItems = screen.getAllByTestId("CalendarDay_ITEM");
    const activeDay = dayItems.find((item) =>
      item.className.includes("currentText")
    );
    expect(activeDay).toBeInTheDocument();
  });

  it("(9) Should handle year changes with day normalization", () => {
    render(
      <Calendar
        selectedPeriod={mockSelectedPeriod}
        setSelectedPeriod={setIsMock}
        setIsModalOpen={setIsMock}
        setSelectedRadioOption={setIsMock}
        lang="ru"
      />
    );

    const upYear = screen.getByTestId("CalendarYearButton_UP");
    const downMonth = screen.getByTestId("CalendarMonthButton_DOWN");

    fireEvent.click(upYear);
    fireEvent.click(downMonth);

    const yearItems = screen.getAllByTestId("CalendarYear_ITEM");
    expect(yearItems.length).toBeGreaterThan(0);
  });

  it("(10) Should update CSS classes based on scroll position", () => {
    render(
      <Calendar
        selectedPeriod={mockSelectedPeriod}
        setSelectedPeriod={setIsMock}
        setIsModalOpen={setIsMock}
        setSelectedRadioOption={setIsMock}
        lang="ru"
      />
    );

    const yearSelect = screen.getByTestId("CalendarYear_SELECT");
    expect(yearSelect).toHaveClass(/start/);

    const upYear = screen.getByTestId("CalendarYearButton_UP");
    for (let i = 0; i < 8; i++) {
      fireEvent.click(upYear);
    }

    expect(yearSelect).toHaveClass(/end/);
  });

  it("(11) Should handle wheel scrolling for date change", () => {
    render(
      <Calendar
        selectedPeriod={mockSelectedPeriod}
        setSelectedPeriod={setIsMock}
        setIsModalOpen={setIsMock}
        setSelectedRadioOption={setIsMock}
        lang="ru"
      />
    );

    const dayButton = screen.getByTestId("CalendarDay_BUTTON");
    fireEvent.wheel(dayButton, { deltaY: 100 });
    fireEvent.wheel(dayButton, { deltaY: -100 });
    expect(screen.getByTestId("Calendar_MODAL")).toBeInTheDocument();
  });

  it("(12) Should maintain separate state for FROM and TO periods", async () => {
    render(
      <Calendar
        selectedPeriod={mockSelectedPeriod}
        setSelectedPeriod={setIsMock}
        setIsModalOpen={setIsMock}
        setSelectedRadioOption={setIsMock}
        lang="ru"
      />
    );

    const initialFromDays = screen.getAllByTestId("CalendarDay_ITEM");
    const initialActiveDay = initialFromDays.find((item) =>
      item.className.includes("currentText")
    );

    const toButton = screen.getByTestId("CalendarTabButton_TO");
    await userEvent.click(toButton);

    const upDay = screen.getByTestId("CalendarDayButton_UP");
    await userEvent.click(upDay);

    const fromButton = screen.getByTestId("CalendarTabButton_FROM");
    await userEvent.click(fromButton);

    const currentFromDays = screen.getAllByTestId("CalendarDay_ITEM");
    const currentActiveDay = currentFromDays.find((item) =>
      item.className.includes("currentText")
    );

    expect(currentActiveDay?.textContent).toBe(initialActiveDay?.textContent);
  });
});
