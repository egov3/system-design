import { act, renderHook } from "@testing-library/react";

import { PERIOD_KEYS } from "~constants/calendar";
import { useCalendar } from "~customHooks/useCalendar";

describe("useCalendar", () => {
  it("(1) Should ignore next month change when visible date is already clamped by maxDate", () => {
    const onMonthChange = jest.fn();
    const maxDate = new Date(2024, 0, 31);

    const { result } = renderHook(() =>
      useCalendar({
        month: 0,
        year: 2024,
        selectedPeriodInterval: PERIOD_KEYS.from,
        maxDate,
        onMonthChange,
      }),
    );

    expect(result.current.visibleMonth).toBe(0);
    expect(result.current.visibleYear).toBe(2024);

    act(() => {
      result.current.changeMonth(1);
    });

    expect(onMonthChange).not.toHaveBeenCalled();
    expect(result.current.visibleMonth).toBe(0);
    expect(result.current.visibleYear).toBe(2024);
  });

  it("(2) Should clamp visible date, years list and prev month by minDate", () => {
    const onMonthChange = jest.fn();
    const minDate = new Date(2017, 0, 1);
    const maxDate = new Date(2024, 5, 15);

    const { result } = renderHook(() =>
      useCalendar({
        month: 5,
        year: 2015,
        selectedPeriodInterval: PERIOD_KEYS.from,
        minDate,
        maxDate,
        onMonthChange,
      }),
    );

    expect(result.current.visibleMonth).toBe(0);
    expect(result.current.visibleYear).toBe(2017);
    expect(result.current.isPrevMonthDisabled).toBe(true);
    expect(result.current.isNextMonthDisabled).toBe(false);
    expect(result.current.years).toEqual([
      2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017,
    ]);

    act(() => {
      result.current.changeMonth(-1);
    });
    expect(onMonthChange).not.toHaveBeenCalled();
    expect(result.current.visibleYear).toBe(2017);

    act(() => {
      result.current.changeMonth(1);
    });
    expect(onMonthChange).toHaveBeenLastCalledWith(new Date(2017, 1, 1));
    expect(result.current.isPrevMonthDisabled).toBe(false);

    act(() => {
      result.current.pickYear(2016);
    });
    expect(onMonthChange).toHaveBeenLastCalledWith(new Date(2017, 0, 1));
  });

  it("(3) Should disable days before minDate", () => {
    const minDate = new Date(2017, 0, 10);

    const { result } = renderHook(() =>
      useCalendar({
        month: 0,
        year: 2017,
        selectedPeriodInterval: PERIOD_KEYS.from,
        minDate,
      }),
    );

    const findDay = (day: number) =>
      result.current.days.find(
        (cell) => cell.isCurrentMonth && cell.day === day,
      );

    expect(findDay(9)?.isDisabled).toBe(true);
    expect(findDay(10)?.isDisabled).toBe(false);
  });

  it("(4) Should limit period length by maxPeriodMonths for both intervals", () => {
    const fromDate = new Date(2024, 0, 15);
    const toDate = new Date(2024, 3, 15);

    const toInterval = renderHook(() =>
      useCalendar({
        month: 3,
        year: 2024,
        selectedPeriodInterval: PERIOD_KEYS.to,
        rangeStart: fromDate,
        rangeEnd: null,
        maxPeriodMonths: 3,
      }),
    );
    const findToDay = (day: number) =>
      toInterval.result.current.days.find(
        (cell) => cell.isCurrentMonth && cell.day === day,
      );

    expect(findToDay(15)?.isDisabled).toBe(false);
    expect(findToDay(16)?.isDisabled).toBe(true);

    const fromInterval = renderHook(() =>
      useCalendar({
        month: 0,
        year: 2024,
        selectedPeriodInterval: PERIOD_KEYS.from,
        rangeStart: null,
        rangeEnd: toDate,
        maxPeriodMonths: 3,
      }),
    );
    const findFromDay = (day: number) =>
      fromInterval.result.current.days.find(
        (cell) => cell.isCurrentMonth && cell.day === day,
      );

    expect(findFromDay(14)?.isDisabled).toBe(true);
    expect(findFromDay(15)?.isDisabled).toBe(false);
    expect(findFromDay(31)?.isDisabled).toBe(false);
  });
});
