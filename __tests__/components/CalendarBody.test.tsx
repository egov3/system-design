import { fireEvent, render, screen } from "@testing-library/react";
import { i18n } from "~constants/i18n";
import { getMonthNameProper } from "~utils/date/getMonthNameProper";
import { CalendarBody } from "../../src/components/Calendar/Body";

const lang = "ru";
const weekDays = i18n.Calendar.WeekDays[lang];

const getDayId = (date: Date) =>
  `CalendarBody_DAY_${new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  )
    .toISOString()
    .slice(0, 10)}`;

describe("CalendarBody", () => {
  beforeEach(() => {
    Object.defineProperty(HTMLElement.prototype, "scrollIntoView", {
      configurable: true,
      value: jest.fn(),
    });
  });

  it("(1) Should render month grid and calls onDayClick only for enabled current month day", () => {
    const onDayClick = jest.fn();

    render(
      <CalendarBody
        lang={lang}
        month={0}
        year={2024}
        selectedDate={new Date(2024, 0, 10)}
        rangeEnd={new Date(2024, 0, 15)}
        maxDate={new Date(2024, 0, 20)}
        onDayClick={onDayClick}
      />,
    );

    expect(screen.getByTestId("CalendarBody_MONTH_YEAR")).toHaveTextContent(
      getMonthNameProper(0, lang),
    );
    expect(screen.getByText(weekDays[0])).toBeInTheDocument();
    expect(screen.getByText(weekDays[6])).toBeInTheDocument();

    const selectedDay = screen.getByTestId(getDayId(new Date(2024, 0, 10)));
    const disabledDay = screen.getByTestId(getDayId(new Date(2024, 0, 16)));
    const hiddenDay = screen.getByTestId(getDayId(new Date(2024, 1, 1)));

    expect(selectedDay).toHaveClass("selected");
    expect(disabledDay).toBeDisabled();
    expect(hiddenDay).toBeDisabled();

    fireEvent.click(selectedDay);
    fireEvent.click(disabledDay);
    fireEvent.click(hiddenDay);

    expect(onDayClick).toHaveBeenCalledTimes(1);
    expect(onDayClick).toHaveBeenCalledWith(new Date(2024, 0, 10));
  });

  it("(2) Should use default date props, mark today and ignore synthetic click on hidden day", () => {
    const onDayClick = jest.fn();
    const today = new Date();

    render(<CalendarBody lang={lang} onDayClick={onDayClick} />);

    expect(screen.getByTestId("Calendar_CURRENT_YEAR")).toHaveTextContent(
      String(today.getFullYear()),
    );
    expect(screen.getByTestId(getDayId(today))).toHaveClass("today");

    const hiddenDay = screen
      .getAllByRole("button")
      .find(
        (button) =>
          button instanceof HTMLButtonElement &&
          button.dataset.testid?.startsWith("CalendarBody_DAY_") &&
          button.disabled &&
          button.textContent === "",
      ) as HTMLButtonElement;

    hiddenDay.removeAttribute("disabled");
    fireEvent.click(hiddenDay);
    expect(onDayClick).not.toHaveBeenCalled();
  });

  it("(3) Should change months and disable next month at maxDate boundary", () => {
    const onMonthChange = jest.fn();
    const { rerender } = render(
      <CalendarBody
        lang={lang}
        month={0}
        year={2023}
        maxDate={new Date(2024, 0, 31)}
        onMonthChange={onMonthChange}
      />,
    );

    fireEvent.click(screen.getByTestId("Calendar_PREV_MONTH_BTN"));
    fireEvent.click(screen.getByTestId("Calendar_NEXT_MONTH_BTN"));

    expect(onMonthChange).toHaveBeenNthCalledWith(1, new Date(2022, 11, 1));
    expect(onMonthChange).toHaveBeenNthCalledWith(2, new Date(2023, 0, 1));

    rerender(
      <CalendarBody
        lang={lang}
        month={0}
        year={2024}
        maxDate={new Date(2024, 0, 31)}
        onMonthChange={onMonthChange}
      />,
    );

    expect(screen.getByTestId("Calendar_NEXT_MONTH_BTN")).toBeDisabled();
  });

  it("(4) Should open, close and pick a year from the real year picker", () => {
    const onMonthChange = jest.fn();

    render(
      <CalendarBody
        lang={lang}
        month={0}
        year={2023}
        maxDate={new Date(2024, 0, 31)}
        onMonthChange={onMonthChange}
      />,
    );

    fireEvent.click(screen.getByTestId("Calendar_CHOOSE_YEAR_BTN"));
    expect(screen.getByTestId("Calendar_YEARS_LIST")).toBeInTheDocument();
    expect(HTMLElement.prototype.scrollIntoView).toHaveBeenCalled();

    fireEvent.click(screen.getByTestId("Calendar_CLOSE_YEAR_PICKER_BTN"));
    expect(screen.queryByTestId("Calendar_YEARS_LIST")).not.toBeInTheDocument();

    fireEvent.click(screen.getByTestId("Calendar_CHOOSE_YEAR_BTN"));
    fireEvent.click(screen.getByRole("button", { name: "2024" }));

    expect(onMonthChange).toHaveBeenLastCalledWith(new Date(2024, 0, 1));
    expect(screen.queryByTestId("Calendar_YEARS_LIST")).not.toBeInTheDocument();
    expect(screen.getByTestId("Calendar_CURRENT_YEAR")).toHaveTextContent(
      "2024",
    );
  });
});
