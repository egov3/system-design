import { fireEvent, render, screen, within } from "@testing-library/react";
import { Components } from "~components";

describe("Components.Calendar", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

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

  it("(3) Should open year picker, select a year, and close the picker", () => {
    render(<Components.Calendar {...props} />);

    const choseYear = screen.getByTestId("Calendar_CHOOSE_YEAR_BTN");
    fireEvent.click(choseYear);

    const year = screen.getByTestId("Calendar_YEAR_1970");
    expect(year).toHaveTextContent("1970");

    fireEvent.click(year);
    expect(screen.getByTestId("Calendar_CURRENT_YEAR")).toHaveTextContent(
      "1970",
    );

    fireEvent.click(choseYear);

    const closeBtn = screen.getByTestId("Calendar_CLOSE_YEAR_PICKER_BTN");
    fireEvent.click(closeBtn);

    expect(screen.queryByTestId("Calendar_YEAR_LIST")).not.toBeInTheDocument();
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

  it("(7) Should select a single day and save in default variant", () => {
    const mockSetSelectedDate = jest.fn();
    render(
      <Components.Calendar
        {...props}
        variant="default"
        yearRange={yearRange}
        selectedDate={dateStart}
        setSelectedDate={mockSetSelectedDate}
      />,
    );

    const day = screen.getByTestId("day-2020-1-14");
    expect(day).toHaveClass(/day/);

    fireEvent.click(day);
    expect(day).toHaveClass(/daySelected/);

    const saveBtn = screen.getByTestId("Calendar_SAVE_BTN");
    fireEvent.click(saveBtn);

    expect(mockSetSelectedDate).toHaveBeenCalled();
  });

  it("(8) Should select a date range and save in period variant", () => {
    const mockSetSelectedPeriod = jest.fn();
    render(
      <Components.Calendar
        {...props}
        variant="period"
        yearRange={yearRange}
        selectedPeriod={{
          from: dateStart,
          to: dateEnd,
        }}
        setSelectedPeriod={mockSetSelectedPeriod}
      />,
    );

    const fromDay = screen.getByTestId("day-2020-1-14");
    expect(fromDay).toHaveClass(/day/);

    fireEvent.click(fromDay);
    expect(fromDay).toHaveClass(/daySelected/);

    const periodTo = screen.getByTestId("PeriodHeader_BUTTON_TO");
    fireEvent.click(periodTo);

    const toDay = screen.getByTestId("day-2020-1-16");
    fireEvent.click(toDay);
    expect(toDay).toHaveClass(/daySelected/);

    const saveBtn = screen.getByTestId("Calendar_SAVE_BTN");
    fireEvent.click(saveBtn);
    expect(mockSetSelectedPeriod).toHaveBeenCalled();
    expect(mockSetSelectedPeriod).toHaveBeenCalledWith({
      from: { day: 14, month: 2, year: 2020 },
      to: { day: 16, month: 2, year: 2020 },
    });
  });

  it("(9) Should ignore click if day is not available", () => {
    render(<Components.Calendar {...props} availableDays={["2026-03-15"]} />);

    const dayUnavailable = screen.getByTestId("day-2026-2-14");
    fireEvent.click(dayUnavailable);
    expect(dayUnavailable).not.toHaveClass(/daySelected/);

    const dayAvailable = screen.getByTestId("day-2026-2-15");
    fireEvent.click(dayAvailable);
    expect(dayAvailable).toHaveClass(/daySelected/);
  });

  it("(10) Should render hint text", () => {
    render(<Components.Calendar {...props} hintText="hintText" />);
    expect(screen.getByTestId("hint")).toHaveTextContent("hintText");
  });

  it("(11) Should show error for invalid period range", () => {
    render(
      <Components.Calendar
        {...props}
        variant="period"
        selectedPeriod={{
          from: { day: 8, month: 3, year: 2026 },
          to: { day: 1, month: 3, year: 2020 },
        }}
      />,
    );
    expect(screen.getByTestId("PeriodHeader_BUTTON_FROM")).toHaveClass(
      "titleError",
    );
  });

  it("(12) Should disable weekend days when isWeekdaysOnly is true", () => {
    render(<Components.Calendar {...props} isWeekdaysOnly={true} />);
    expect(screen.getByTestId("day-2026-2-7")).toHaveClass("dayDisabled");
  });

  it("(13) Should not show period error by default", () => {
    render(<Components.Calendar {...props} variant="period" />);

    expect(screen.getByTestId("PeriodHeader_BUTTON_FROM")).not.toHaveClass(
      "titleError",
    );
  });

  it("(14) Should call setSelectedDate with null when save is clicked and no date is selected", () => {
    const mockSetSelectedPeriod = jest.fn();
    render(
      <Components.Calendar
        {...props}
        setSelectedDate={mockSetSelectedPeriod}
      />,
    );

    const saveBtn = screen.getByTestId("Calendar_SAVE_BTN");
    fireEvent.click(saveBtn);
    expect(mockSetSelectedPeriod).toHaveBeenCalled();
    expect(mockSetSelectedPeriod).toHaveBeenCalledWith(null);
  });

  it("(15) Should set same date for from and to when only one day is selected in period variant", () => {
    const mockSetSelectedPeriod = jest.fn();
    render(
      <Components.Calendar
        {...props}
        variant="period"
        setSelectedPeriod={mockSetSelectedPeriod}
      />,
    );

    const fromDay = screen.getByTestId("day-2026-2-7");
    expect(fromDay).toHaveClass(/day/);

    fireEvent.click(fromDay);
    expect(fromDay).toHaveClass(/daySelected/);

    const periodTo = screen.getByTestId("PeriodHeader_BUTTON_TO");
    fireEvent.click(periodTo);

    expect(fromDay).toHaveClass(/daySelected/);

    const saveBtn = screen.getByTestId("Calendar_SAVE_BTN");
    fireEvent.click(saveBtn);
    expect(mockSetSelectedPeriod).toHaveBeenCalled();
    expect(mockSetSelectedPeriod).toHaveBeenCalledWith({
      from: { day: 7, month: 3, year: 2026 },
      to: { day: 7, month: 3, year: 2026 },
    });
  });

  it("(16) Should scroll to selected year when year picker opens", () => {
    const scrollMock = jest.fn();
    Element.prototype.scrollIntoView = scrollMock;

    jest.spyOn(globalThis, "requestAnimationFrame").mockImplementation((cb) => {
      cb(0);
      return 1;
    });

    render(<Components.Calendar {...props} />);

    const choseYear = screen.getByTestId("Calendar_CHOOSE_YEAR_BTN");
    fireEvent.click(choseYear);

    expect(globalThis.requestAnimationFrame).toHaveBeenCalled();
    expect(scrollMock).toHaveBeenCalledWith({
      block: "center",
      behavior: "smooth",
    });
  });
});
