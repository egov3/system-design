import { fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";

import type { ISelectedPeriod } from "~interfaces/Calendar";

import { Calendar } from "~components";
import { i18n } from "~constants/i18n";
import { formatCalendarDate } from "~utils/calendar";
import { getMonthNameProper } from "~utils/date/getMonthNameProper";

const lang = "ru";
const sameDay = new Date(2024, 0, 10);
const fromDay = new Date(2024, 1, 1);
const toDay = new Date(2024, 1, 5);
const saveButtonText = i18n.Calendar.SaveButton[lang];
const selectPeriodTitle = i18n.Calendar.SelectPeriodTitle[lang];
const periodFromLabel = i18n.Calendar.PeriodFrom[lang];
const periodToLabel = i18n.Calendar.PeriodTo[lang];
const customCalendarTitle = "Мой календарь";

const getDayTestId = (date: Date) =>
  `CalendarBody_DAY_${new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  )
    .toISOString()
    .slice(0, 10)}`;

const getFirstEnabledCalendarDay = () =>
  screen
    .getAllByRole("button")
    .find(
      (button) =>
        button instanceof HTMLButtonElement &&
        button.dataset.testid?.startsWith("CalendarBody_DAY_") &&
        !button.disabled,
    );

describe("Calendar", () => {
  beforeEach(() => {
    Object.defineProperty(HTMLElement.prototype, "scrollIntoView", {
      configurable: true,
      value: jest.fn(),
    });
  });

  it("(1) Should be in default mode", () => {
    const onDateChange = jest.fn();
    const onSave = jest.fn();
    const setIsOpen = jest.fn();

    const CalendarWrapper = () => {
      const [selectedDate, setSelectedDate] = useState<Date | null>(sameDay);
      return (
        <Calendar
          lang={lang}
          mode="default"
          title={customCalendarTitle}
          selectedDate={selectedDate}
          setIsOpen={setIsOpen}
          onDateChange={(date) => {
            onDateChange(date);
            setSelectedDate(date);
          }}
          onSave={onSave}
        />
      );
    };

    render(<CalendarWrapper />);

    expect(screen.getByTestId("Modal_TITLE")).toHaveTextContent(
      customCalendarTitle,
    );
    expect(screen.queryByTestId("CalendarTab_WRAP")).not.toBeInTheDocument();

    fireEvent.click(screen.getByTestId(getDayTestId(sameDay)));
    expect(onDateChange).toHaveBeenLastCalledWith(null);
    expect(screen.getByRole("button", { name: saveButtonText })).toBeDisabled();

    fireEvent.click(getFirstEnabledCalendarDay() as HTMLElement);
    expect(onDateChange).toHaveBeenLastCalledWith(expect.any(Date));
    expect(
      screen.getByRole("button", { name: saveButtonText }),
    ).not.toBeDisabled();

    fireEvent.click(screen.getByRole("button", { name: saveButtonText }));
    expect(onSave).toHaveBeenCalledWith(expect.any(Date));

    fireEvent.click(screen.getByTestId("ModalHeaderBtn_CLOSE"));
    expect(setIsOpen).toHaveBeenCalledWith(false);
  });

  it("(2) Should be in period mode", () => {
    const onPeriodChange = jest.fn();
    const onSave = jest.fn();

    const CalendarWrapper = () => {
      const [selectedPeriod, setSelectedPeriod] = useState<ISelectedPeriod>({
        fromDate: fromDay,
        toDate: toDay,
        periodSelected: false,
      });

      return (
        <Calendar
          lang={lang}
          selectedPeriod={selectedPeriod}
          onPeriodChange={(period) => {
            onPeriodChange(period);
            setSelectedPeriod(period);
          }}
          onSave={onSave}
        />
      );
    };

    render(<CalendarWrapper />);

    expect(screen.getByTestId("Modal_TITLE")).toHaveTextContent(
      selectPeriodTitle,
    );
    expect(screen.getByTestId("CalendarTabTitle_FROM")).toHaveTextContent(
      `${periodFromLabel} ${formatCalendarDate(fromDay)}`,
    );
    expect(screen.getByTestId("CalendarTabTitle_TO")).toHaveTextContent(
      `${periodToLabel} ${formatCalendarDate(toDay)}`,
    );

    fireEvent.click(screen.getByTestId("CalendarTabButton_TO"));
    fireEvent.click(screen.getByTestId(getDayTestId(new Date(2024, 1, 4))));

    expect(onPeriodChange).toHaveBeenLastCalledWith({
      fromDate: fromDay,
      toDate: new Date(2024, 1, 4),
      periodSelected: true,
    });

    fireEvent.click(screen.getByRole("button", { name: saveButtonText }));
    expect(onSave).toHaveBeenCalledWith({
      fromDate: fromDay,
      toDate: new Date(2024, 1, 4),
      periodSelected: true,
    });
  });

  it("(3) Should disable period save when range is incomplete or exceeds maxDate", () => {
    const CalendarWrapper = () => {
      return <Calendar lang={lang} selectedPeriod={undefined} />;
    };

    const { rerender } = render(<CalendarWrapper />);

    expect(screen.getByRole("button", { name: saveButtonText })).toBeDisabled();

    rerender(
      <Calendar
        lang={lang}
        selectedPeriod={{
          fromDate: fromDay,
          toDate: toDay,
          periodSelected: true,
        }}
        maxDate={sameDay}
      />,
    );

    expect(screen.getByRole("button", { name: saveButtonText })).toBeDisabled();
  });

  it("(4) Should restrict period by minDate, maxDate and maxPeriodMonths", () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(2017, 0, 20));

    const onPeriodChange = jest.fn();
    const minDate = new Date(2017, 0, 1);
    const maxDate = new Date(2017, 11, 31);

    const CalendarWrapper = () => {
      const [selectedPeriod, setSelectedPeriod] = useState<ISelectedPeriod>({
        fromDate: new Date(2017, 0, 15),
        toDate: null,
        periodSelected: false,
      });

      return (
        <Calendar
          lang={lang}
          selectedPeriod={selectedPeriod}
          minDate={minDate}
          maxDate={maxDate}
          maxPeriodMonths={3}
          defaultPeriodInterval="to"
          onPeriodChange={(period) => {
            onPeriodChange(period);
            setSelectedPeriod(period);
          }}
        />
      );
    };

    render(<CalendarWrapper />);

    expect(screen.getByTestId("CalendarBody_MONTH_YEAR")).toHaveTextContent(
      getMonthNameProper(3, lang),
    );
    expect(screen.getByTestId("Calendar_NEXT_MONTH_BTN")).toBeDisabled();

    fireEvent.click(screen.getByTestId("Calendar_CHOOSE_YEAR_BTN"));
    expect(screen.getByTestId("CalendarBody_YEAR_2017")).toBeInTheDocument();
    expect(
      screen.queryByTestId("CalendarBody_YEAR_2016"),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId("CalendarBody_YEAR_2018"),
    ).not.toBeInTheDocument();
    fireEvent.click(screen.getByTestId("Calendar_CLOSE_YEAR_PICKER_BTN"));

    expect(
      screen.getByTestId(getDayTestId(new Date(2017, 3, 16))),
    ).toBeDisabled();
    expect(
      screen.getByTestId(getDayTestId(new Date(2017, 3, 15))),
    ).not.toBeDisabled();

    fireEvent.click(screen.getByTestId(getDayTestId(new Date(2017, 3, 15))));
    expect(onPeriodChange).toHaveBeenLastCalledWith({
      fromDate: new Date(2017, 0, 15),
      toDate: new Date(2017, 3, 15),
      periodSelected: true,
    });
    expect(
      screen.getByRole("button", { name: saveButtonText }),
    ).not.toBeDisabled();

    jest.useRealTimers();
  });

  it("(5) Should open the end period tab on the max available date within maxPeriodMonths", () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(2026, 9, 20));

    const minDate = new Date(2026, 5, 14);

    const CalendarWrapper = () => {
      const [selectedPeriod, setSelectedPeriod] = useState<ISelectedPeriod>({
        fromDate: minDate,
        toDate: null,
        periodSelected: false,
      });

      return (
        <Calendar
          lang={lang}
          selectedPeriod={selectedPeriod}
          minDate={minDate}
          maxDate={new Date()}
          maxPeriodMonths={3}
          onPeriodChange={setSelectedPeriod}
        />
      );
    };

    render(<CalendarWrapper />);

    fireEvent.click(screen.getByTestId("CalendarTabButton_TO"));

    expect(screen.getByTestId("CalendarBody_MONTH_YEAR")).toHaveTextContent(
      getMonthNameProper(8, lang),
    );
    expect(screen.getByTestId("Calendar_NEXT_MONTH_BTN")).toBeDisabled();
    expect(
      screen.getByTestId(getDayTestId(new Date(2026, 8, 14))),
    ).not.toBeDisabled();
    expect(
      screen.getByTestId(getDayTestId(new Date(2026, 8, 15))),
    ).toBeDisabled();

    jest.useRealTimers();
  });

  it("(6) Should keep current month on the end period tab without maxPeriodMonths", () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(2026, 9, 20));

    const minDate = new Date(2026, 5, 14);

    const CalendarWrapper = () => {
      const [selectedPeriod, setSelectedPeriod] = useState<ISelectedPeriod>({
        fromDate: minDate,
        toDate: null,
        periodSelected: false,
      });

      return (
        <Calendar
          lang={lang}
          selectedPeriod={selectedPeriod}
          minDate={minDate}
          maxDate={new Date(2026, 11, 31)}
          onPeriodChange={setSelectedPeriod}
        />
      );
    };

    render(<CalendarWrapper />);

    fireEvent.click(screen.getByTestId("CalendarTabButton_TO"));

    expect(screen.getByTestId("CalendarBody_MONTH_YEAR")).toHaveTextContent(
      getMonthNameProper(9, lang),
    );
    expect(
      screen.getByTestId(getDayTestId(new Date(2026, 9, 20))),
    ).not.toBeDisabled();

    jest.useRealTimers();
  });

  it("(7) Should not open the start period tab on global minDate when only end date is selected", () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(2026, 9, 20));

    render(
      <Calendar
        lang={lang}
        selectedPeriod={{
          fromDate: null,
          toDate: new Date(2026, 8, 14),
          periodSelected: false,
        }}
        minDate={new Date(2010, 0, 1)}
        maxDate={new Date(2026, 11, 31)}
        maxPeriodMonths={3}
        defaultPeriodInterval="from"
      />,
    );

    expect(screen.getByTestId("CalendarBody_MONTH_YEAR")).toHaveTextContent(
      getMonthNameProper(8, lang),
    );
    expect(screen.getByTestId("Calendar_CURRENT_YEAR")).toHaveTextContent(
      "2026",
    );
    expect(
      screen.getByTestId(getDayTestId(new Date(2026, 8, 14))),
    ).not.toBeDisabled();

    jest.useRealTimers();
  });

  it("(8) Should disable save when period exceeds maxPeriodMonths or starts before minDate", () => {
    const { rerender } = render(
      <Calendar
        lang={lang}
        selectedPeriod={{
          fromDate: new Date(2017, 0, 15),
          toDate: new Date(2017, 4, 1),
          periodSelected: true,
        }}
        maxPeriodMonths={3}
      />,
    );

    expect(screen.getByRole("button", { name: saveButtonText })).toBeDisabled();

    rerender(
      <Calendar
        lang={lang}
        selectedPeriod={{
          fromDate: new Date(2016, 11, 31),
          toDate: new Date(2017, 0, 15),
          periodSelected: true,
        }}
        minDate={new Date(2017, 0, 1)}
      />,
    );

    expect(screen.getByRole("button", { name: saveButtonText })).toBeDisabled();

    rerender(
      <Calendar
        lang={lang}
        mode="default"
        selectedDate={new Date(2016, 11, 31)}
        minDate={new Date(2017, 0, 1)}
      />,
    );

    expect(screen.getByRole("button", { name: saveButtonText })).toBeDisabled();
  });
});
