import { fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import { Components } from "~components";
import type { ISelectedPeriod } from "~interfaces/Calendar";

const sameDay = new Date(2024, 0, 10);
const fromDay = new Date(2024, 1, 1);
const toDay = new Date(2024, 1, 5);

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
        <Components.Calendar
          lang="ru"
          mode="default"
          title="Мой календарь"
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
      "Мой календарь",
    );
    expect(screen.queryByTestId("CalendarTab_WRAP")).not.toBeInTheDocument();

    fireEvent.click(screen.getByTestId(getDayTestId(sameDay)));
    expect(onDateChange).toHaveBeenLastCalledWith(null);
    expect(screen.getByRole("button", { name: "Сохранить" })).toBeDisabled();

    fireEvent.click(getFirstEnabledCalendarDay() as HTMLElement);
    expect(onDateChange).toHaveBeenLastCalledWith(expect.any(Date));
    expect(
      screen.getByRole("button", { name: "Сохранить" }),
    ).not.toBeDisabled();

    fireEvent.click(screen.getByRole("button", { name: "Сохранить" }));
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
        <Components.Calendar
          lang="ru"
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
      "Выберите период",
    );
    expect(screen.getByTestId("CalendarTabTitle_FROM")).toHaveTextContent(
      "Период с 01.02.2024",
    );
    expect(screen.getByTestId("CalendarTabTitle_TO")).toHaveTextContent(
      "Период до 05.02.2024",
    );

    fireEvent.click(screen.getByTestId("CalendarTabButton_TO"));
    fireEvent.click(screen.getByTestId(getDayTestId(new Date(2024, 1, 4))));

    expect(onPeriodChange).toHaveBeenLastCalledWith({
      fromDate: fromDay,
      toDate: new Date(2024, 1, 4),
      periodSelected: true,
    });

    fireEvent.click(screen.getByRole("button", { name: "Сохранить" }));
    expect(onSave).toHaveBeenCalledWith({
      fromDate: fromDay,
      toDate: new Date(2024, 1, 4),
      periodSelected: true,
    });
  });

  it("(3) Should disable period save when range is incomplete or exceeds maxDate", () => {
    const CalendarWrapper = () => {
      return <Components.Calendar lang="ru" selectedPeriod={undefined} />;
    };

    const { rerender } = render(<CalendarWrapper />);

    expect(screen.getByRole("button", { name: "Сохранить" })).toBeDisabled();

    rerender(
      <Components.Calendar
        lang="ru"
        selectedPeriod={{
          fromDate: fromDay,
          toDate: toDay,
          periodSelected: true,
        }}
        maxDate={sameDay}
      />,
    );

    expect(screen.getByRole("button", { name: "Сохранить" })).toBeDisabled();
  });
});
