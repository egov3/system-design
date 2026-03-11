import { fireEvent, render, screen, within } from "@testing-library/react";
import { Components } from "~components";

describe("Components.Calendar", () => {
  const props = {
    isOpen: true,
    setIsOpen: () => {},
    variant: "default" as const,
    lang: "ru" as const,
    selectedDate: null,
    setSelectedDate: jest.fn(),
    selectedPeriod: null,
    setSelectedPeriod: jest.fn(),
    isWeekdaysOnly: false,
    availableDays: [],
    hintText: "",
  };

  const yearRange = {
    from: { day: 1, month: 1, year: 2020 },
    to: { day: 31, month: 12, year: 2027 },
  };

  const selectedPeriod = {
    from: { day: 1, month: 3, year: 2026 },
    to: { day: 8, month: 3, year: 2026 },
  };

  const dateStart = { day: 1, month: 2, year: 2020 };
  const dateEnd = { day: 1, month: 11, year: 2027 };

  it("(1) Should highlight the start and end days of a selected period", () => {
    render(
      <Components.Calendar
        {...props}
        variant="period"
        selectedPeriod={selectedPeriod}
      />,
    );
    expect(screen.getByTestId("day-2026-2-1")).toHaveClass(/daySelected/);

    const periodTo = screen.getByTestId("PeriodHeader_BUTTON_TO");
    fireEvent.click(periodTo);
    expect(screen.getByTestId("day-2026-2-8")).toHaveClass(/daySelected/);
  });

  it("(2) Should not highlight selected day when calendar is closed", () => {
    render(
      <Components.Calendar
        {...props}
        isOpen={false}
        selectedDate={dateStart}
      />,
    );
    expect(screen.getByTestId("Calendar_CURRENT_MONTH")).toHaveTextContent(
      "Февраль",
    );
    expect(screen.getByTestId("day-2020-1-1")).not.toHaveClass(/daySelected/);
  });

  it("(3) Should select a year from the default range", () => {
    render(<Components.Calendar {...props} />);

    const choseYear = screen.getByTestId("Calendar_CHOOSE_YEAR_BTN");
    fireEvent.click(choseYear);

    const year = screen.getByTestId("Calendar_YEAR_1970");
    expect(year).toHaveTextContent("1970");

    fireEvent.click(year);
    expect(screen.getByTestId("Calendar_CURRENT_YEAR")).toHaveTextContent(
      "1970",
    );
  });

  it("(4) Should only show years within yearRange", () => {
    render(<Components.Calendar {...props} yearRange={yearRange} />);

    const choseYear = screen.getByTestId("Calendar_CHOOSE_YEAR_BTN");
    fireEvent.click(choseYear);
    expect(screen.getByTestId("Calendar_YEAR_2021")).toHaveTextContent("2021");

    const years = screen.getByTestId("Calendar_YEAR_LIST");
    const buttons = within(years).getAllByRole("button");

    expect(buttons).toHaveLength(8);
  });

  it("(5) Should go to next month but stay on last month if list ended", () => {
    render(
      <Components.Calendar
        {...props}
        yearRange={yearRange}
        selectedDate={dateEnd}
      />,
    );

    expect(screen.getByTestId("Calendar_CURRENT_MONTH")).toHaveTextContent(
      "Ноябрь",
    );

    const next = screen.getByTestId("Calendar_NEXT_MONTH_BTN");
    fireEvent.click(next);
    expect(screen.getByTestId("Calendar_CURRENT_MONTH")).toHaveTextContent(
      "Декабрь",
    );
    fireEvent.click(next);
    expect(screen.getByTestId("Calendar_CURRENT_MONTH")).toHaveTextContent(
      "Декабрь",
    );
  });

  it("(6) Should go to previous month but stay on first month if list ended", () => {
    render(
      <Components.Calendar
        {...props}
        yearRange={yearRange}
        selectedDate={dateStart}
      />,
    );

    expect(screen.getByTestId("Calendar_CURRENT_MONTH")).toHaveTextContent(
      "Февраль",
    );

    const prev = screen.getByTestId("Calendar_PREV_MONTH_BTN");
    fireEvent.click(prev);
    expect(screen.getByTestId("Calendar_CURRENT_MONTH")).toHaveTextContent(
      "Январь",
    );
    fireEvent.click(prev);
    expect(screen.getByTestId("Calendar_CURRENT_MONTH")).toHaveTextContent(
      "Январь",
    );
  });
});
