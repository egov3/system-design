import React from "react";
import { userEvent } from "@storybook/test";
import { fireEvent, render, screen } from "@testing-library/react";

import { Components } from "~components";

describe("Calendar", () => {
  const setIsMock = jest.fn();
  const mockSelectedPeriod = {
    fromDate: "2025-02-01",
    toDate: "2025-02-01",
    periodSelected: false,
  };

  it("(1) Should render the correct calendar ", () => {
    render(
      <Components.Calendar.Main
        selectedPeriod={mockSelectedPeriod}
        setSelectedPeriod={setIsMock}
        setIsModalOpen={setIsMock}
        setSelectedRadioOption={setIsMock}
      />
    );

    expect(screen.getByText("Период с ...*")).toBeInTheDocument();
    expect(screen.getByText("Период до ...*")).toBeInTheDocument();
    expect(screen.getByTestId("CalendarDayButton_UP")).toBeInTheDocument();
  });

  it("(2) Should corectly click tabs and button save", () => {
    render(
      <Components.Calendar.Main
        selectedPeriod={mockSelectedPeriod}
        setSelectedPeriod={setIsMock}
        setIsModalOpen={setIsMock}
        setSelectedRadioOption={setIsMock}
      />
    );

    const mainButton = screen.getByTestId("Button_MAIN");
    const fromButton = screen.getByTestId("CalendarTabButton_FROM");
    fireEvent.click(fromButton);

    expect(mainButton).toHaveAttribute("aria-disabled", "false");

    const toButton = screen.getByTestId("CalendarTabButton_TO");
    fireEvent.click(toButton);

    fireEvent.click(mainButton);

    expect(mainButton).toBeEnabled();
  });

  it("(3) Should corectly click  up and down button ", () => {
    render(
      <Components.Calendar.Main
        selectedPeriod={mockSelectedPeriod}
        setSelectedPeriod={setIsMock}
        setIsModalOpen={setIsMock}
        setSelectedRadioOption={setIsMock}
      />
    );

    const upDay = screen.getByTestId("CalendarDayButton_UP");
    fireEvent.click(upDay);

    const downDay = screen.getByTestId("CalendarDayButton_DOWN");
    fireEvent.click(downDay);

    const upMonth = screen.getByTestId("CalendarMonthButton_UP");
    fireEvent.click(upMonth);

    const downMonth = screen.getByTestId("CalendarMonthButton_DOWN");
    fireEvent.click(downMonth);

    const upYear = screen.getByTestId("CalendarYearButton_UP");
    fireEvent.click(upYear);

    const downYear = screen.getByTestId("CalendarYearButton_DOWN");
    fireEvent.click(downYear);
  });

  it.skip("(4) Should display when an incorrect date is entered ", () => {
    render(
      <Components.Calendar.Main
        selectedPeriod={mockSelectedPeriod}
        setSelectedPeriod={setIsMock}
        setIsModalOpen={setIsMock}
        setSelectedRadioOption={setIsMock}
      />
    );

    const tab = screen.getByTestId("CalendarTabTo_BUTTON");
    fireEvent.click(tab);
    const upYear = screen.getByTestId("CalendarYearButton_UP");
    fireEvent.click(upYear);

    expect(tab).toHaveClass("titleError");

    const mainButton = screen.getByTestId("Button_MAIN");
    expect(mainButton).toBeDisabled();
  });

  it.skip("(5) Should handle day change correctly when change month", () => {
    render(
      <Components.Calendar.Main
        selectedPeriod={mockSelectedPeriod}
        setSelectedPeriod={setIsMock}
        setIsModalOpen={setIsMock}
        setSelectedRadioOption={setIsMock}
      />
    );

    const downMonth = screen.getByTestId("CalendarMonthButton_DOWN");
    const downDay = screen.getByTestId("CalendarDayButton_DOWN");

    const numberOfClicks = 40;

    for (let i = 0; i < numberOfClicks; i++) {
      fireEvent.click(downDay);
    }

    const monthOfClicks = 12;

    for (let i = 0; i < monthOfClicks; i++) {
      fireEvent.click(downMonth);
    }

    expect(screen.getByText("29")).toBeInTheDocument();
    expect(screen.getByText("30")).toBeInTheDocument();

    fireEvent.click(downMonth);
    expect(screen.getByText("30")).toBeInTheDocument();
  });

  it.skip("(6) Should render months correctly", () => {
    render(
      <Components.Calendar.Main
        selectedPeriod={mockSelectedPeriod}
        setSelectedPeriod={setIsMock}
        setIsModalOpen={setIsMock}
        setSelectedRadioOption={setIsMock}
      />
    );

    const downMonth = screen.getByTestId("CalendarMonthButton_DOWN");

    const numberOfClicks = 12;
    for (let i = 0; i < numberOfClicks; i++) {
      fireEvent.click(downMonth);
    }
    expect(screen.getByText("Декабрь")).toBeInTheDocument();
  });

  it("(7) Should simulate holding the mouse and moving up", () => {
    render(
      <Components.Calendar.Main
        selectedPeriod={mockSelectedPeriod}
        setSelectedPeriod={setIsMock}
        setIsModalOpen={setIsMock}
        setSelectedRadioOption={setIsMock}
      />
    );

    const upDay = screen.getByTestId("CalendarDayButton_UP");

    const numberOfClicks = 31;

    for (let i = 0; i < numberOfClicks; i++) {
      fireEvent.click(upDay);
    }

    const element = screen.getByText("01");

    fireEvent.mouseDown(element, { clientX: 0, clientY: 0 });

    fireEvent.mouseMove(element, { clientX: 0, clientY: -100 });

    fireEvent.mouseUp(element);

    const upMonth = screen.getByTestId("CalendarMonthButton_UP");

    const monthOfClicks = 12;

    for (let i = 0; i < monthOfClicks; i++) {
      fireEvent.click(upMonth);
    }

    const elementMonth = screen.getByText("Январь");
    fireEvent.mouseDown(elementMonth, { clientX: 0, clientY: 0 });

    fireEvent.mouseMove(elementMonth, { clientX: 0, clientY: -100 });

    fireEvent.mouseUp(elementMonth);
  });

  it("(8) Should render correctly the days not be less than one", () => {
    render(
      <Components.Calendar.Main
        selectedPeriod={mockSelectedPeriod}
        setSelectedPeriod={setIsMock}
        setIsModalOpen={setIsMock}
        setSelectedRadioOption={setIsMock}
      />
    );

    const upDay = screen.getByTestId("CalendarDayButton_UP");

    const upnumberOfClicks = 0;
    for (let i = 31; i > upnumberOfClicks; i--) {
      fireEvent.click(upDay);
    }

    expect(screen.getByText("01")).toBeInTheDocument();

    const elements = screen.getAllByTestId("CalendarDay_BUTTON");

    const element = elements[0];

    fireEvent.mouseDown(element, { clientX: 0, clientY: 0 });

    fireEvent.mouseMove(element, { clientX: 0, clientY: 250 });

    fireEvent.mouseUp(element);

    expect(screen.getByText("01")).toBeInTheDocument();
  });

  it.skip("(9) Should render correctly change Day In Months", () => {
    render(
      <Components.Calendar.Main
        selectedPeriod={mockSelectedPeriod}
        setSelectedPeriod={setIsMock}
        setIsModalOpen={setIsMock}
        setSelectedRadioOption={setIsMock}
      />
    );

    const downDay = screen.getByTestId("CalendarDayButton_DOWN");

    expect(screen.getByText("2024")).toBeInTheDocument();

    const upMonth = screen.getByTestId("CalendarMonthButton_UP");

    const monthOfClicks = 12;

    for (let i = 0; i < monthOfClicks; i++) {
      fireEvent.click(upMonth);
    }

    const downMonth = screen.getByTestId("CalendarMonthButton_DOWN");
    fireEvent.click(downMonth);

    expect(screen.getByText("Февраль")).toBeInTheDocument();

    const upnumberOfClicks = 31;
    for (let i = 0; i < upnumberOfClicks; i++) {
      fireEvent.click(downDay);
    }

    expect(screen.getByText("28")).toBeInTheDocument();
    expect(screen.getByText("2025")).toBeInTheDocument();

    const Year = screen.getAllByTestId("CalendarYear_BUTTON");

    const moveYear = Year[0];

    fireEvent.mouseDown(moveYear, { clientX: 0, clientY: 0 });

    fireEvent.mouseMove(moveYear, { clientX: 0, clientY: 100 });

    fireEvent.mouseUp(moveYear);

    expect(screen.getByText("28")).toBeInTheDocument();
  });

  it("(10) Should render correctly classname", () => {
    render(
      <Components.Calendar.Main
        selectedPeriod={mockSelectedPeriod}
        setSelectedPeriod={setIsMock}
        setIsModalOpen={setIsMock}
        setSelectedRadioOption={setIsMock}
      />
    );

    const year = screen.getByTestId("CalendarYear_SELECT");
    fireEvent.click(year);

    expect(year).toHaveClass("start");
    const upYear = screen.getByTestId("CalendarYearButton_UP");
    fireEvent.click(upYear);
    fireEvent.click(upYear);
    fireEvent.click(upYear);
    fireEvent.click(upYear);
    fireEvent.click(upYear);
    fireEvent.click(upYear);
    expect(year).toHaveClass("end");
  });

  it("(11) Should stop scrolling when mouse is on button", async () => {
    render(
      <Components.Calendar.Main
        selectedPeriod={mockSelectedPeriod}
        setSelectedPeriod={setIsMock}
        setIsModalOpen={setIsMock}
        setSelectedRadioOption={setIsMock}
      />
    );

    const upYear = screen.getByText("2025");

    fireEvent.mouseDown(upYear, { clientY: 0 });

    const button = screen.getByTestId("Button_MAIN");

    await userEvent.hover(button);
  });

  it("(12) Should render wheel scrolling", async () => {
    render(
      <Components.Calendar.Main
        selectedPeriod={mockSelectedPeriod}
        setSelectedPeriod={setIsMock}
        setIsModalOpen={setIsMock}
        setSelectedRadioOption={setIsMock}
      />
    );

    const upDay = screen.getByTestId("CalendarDayButton_UP");

    const numberOfClicks = 31;

    for (let i = 0; i < numberOfClicks; i++) {
      fireEvent.click(upDay);
    }

    fireEvent.wheel(screen.getByText("01"), { deltaY: -1 });

    const upMonth = screen.getByTestId("CalendarMonthButton_UP");

    expect(screen.getByText("02")).toBeInTheDocument();
    fireEvent.wheel(screen.getByText("02"), { deltaY: 10 });

    const monthOfClicks = 12;

    for (let i = 0; i < monthOfClicks; i++) {
      fireEvent.click(upMonth);
    }

    fireEvent.wheel(screen.getByText("Февраль"), { deltaY: -10 });
    expect(screen.getByText("Март")).toBeInTheDocument();
    fireEvent.wheel(screen.getByText("Февраль"), { deltaY: 10 });

    fireEvent.wheel(screen.getByText("2023"), { deltaY: 10 });
    expect(screen.getByText("2024")).toBeInTheDocument();
    fireEvent.wheel(screen.getByText("2023"), { deltaY: -10 });
  });
});
