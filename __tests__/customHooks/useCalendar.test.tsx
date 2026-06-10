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
});
