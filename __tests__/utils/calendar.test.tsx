import { PERIOD_KEYS } from "~constants/calendar";
import {
  clampCalendarVisibleDate,
  formatCalendarDate,
  getCalendarDateWithoutTime,
  getPeriodDateKey,
  isCalendarDateAfter,
  isCalendarMonthAfterDate,
  isSameCalendarDate,
  normalizeCalendarDate,
  updateSelectedPeriod,
} from "~utils/calendar";

describe("calendar utils", () => {
  it("(1) Should format calendar date and return empty string for empty value", () => {
    expect(formatCalendarDate()).toBe("");
    expect(formatCalendarDate(null)).toBe("");
    expect(formatCalendarDate(new Date(2025, 0, 5))).toBe("05.01.2025");
  });

  it("(2) Should normalize supported values and return null for empty or invalid value", () => {
    const date = new Date(2025, 4, 10, 15, 30);
    const normalizedFromDate = normalizeCalendarDate(date);
    const normalizedFromString = normalizeCalendarDate(
      "2025-05-10T00:00:00.000Z",
    );
    const normalizedFromNumber = normalizeCalendarDate(date.getTime());

    expect(normalizedFromDate).toBe(date);
    expect(normalizedFromString).toEqual(new Date("2025-05-10T00:00:00.000Z"));
    expect(normalizedFromNumber).toEqual(new Date(date));
    expect(normalizeCalendarDate()).toBeNull();
    expect(normalizeCalendarDate(null)).toBeNull();
    expect(normalizeCalendarDate("invalid-date")).toBeNull();
  });

  it("(3) Should compare calendar dates without time", () => {
    const sourceDate = new Date(2025, 5, 10, 14, 25, 59);
    const sameDay = new Date(2025, 5, 10, 0, 1, 0);
    const anotherDay = new Date(2025, 5, 11, 14, 25, 59);
    const dateWithoutTime = getCalendarDateWithoutTime(sourceDate);

    expect(dateWithoutTime).toEqual(new Date(2025, 5, 10));
    expect(isSameCalendarDate(sourceDate, sameDay)).toBe(true);
    expect(isSameCalendarDate(sourceDate, anotherDay)).toBe(false);
  });

  it("(4) Should detect when one calendar date is after another", () => {
    expect(
      isCalendarDateAfter(
        new Date(2025, 5, 11, 23, 59),
        new Date(2025, 5, 10, 0, 1),
      ),
    ).toBe(true);
    expect(
      isCalendarDateAfter(
        new Date(2025, 5, 10, 23, 59),
        new Date(2025, 5, 10, 0, 1),
      ),
    ).toBe(false);
    expect(isCalendarDateAfter(null, new Date(2025, 5, 10))).toBe(false);
    expect(isCalendarDateAfter(new Date(2025, 5, 10), null)).toBe(false);
  });

  it("(5) Should return period date key and update selected period", () => {
    const nextFromDate = new Date(2025, 0, 10);
    const nextToDate = new Date(2025, 0, 20);

    expect(getPeriodDateKey(PERIOD_KEYS.from)).toBe("fromDate");
    expect(getPeriodDateKey(PERIOD_KEYS.to)).toBe("toDate");

    expect(
      updateSelectedPeriod(
        { fromDate: null, toDate: null, periodSelected: false },
        PERIOD_KEYS.from,
        nextFromDate,
      ),
    ).toEqual({
      fromDate: nextFromDate,
      toDate: null,
      periodSelected: false,
    });

    expect(
      updateSelectedPeriod(
        {
          fromDate: nextFromDate,
          toDate: new Date(2025, 0, 25),
          periodSelected: true,
        },
        PERIOD_KEYS.from,
        new Date(2025, 0, 10, 18, 40),
      ),
    ).toEqual({
      fromDate: null,
      toDate: new Date(2025, 0, 25),
      periodSelected: false,
    });

    expect(
      updateSelectedPeriod(
        { fromDate: nextFromDate, toDate: null, periodSelected: false },
        PERIOD_KEYS.to,
        nextToDate,
      ),
    ).toEqual({
      fromDate: nextFromDate,
      toDate: nextToDate,
      periodSelected: true,
    });
  });

  it("(6) Should compare months and clamp visible date by max date", () => {
    const maxDate = new Date(2025, 5, 15);
    const allowedDate = new Date(2025, 4, 20);
    const futureDate = new Date(2025, 6, 5);

    expect(isCalendarMonthAfterDate(6, 2025, maxDate)).toBe(true);
    expect(isCalendarMonthAfterDate(5, 2025, maxDate)).toBe(false);
    expect(isCalendarMonthAfterDate(0, 2026, maxDate)).toBe(true);

    expect(clampCalendarVisibleDate(allowedDate)).toBe(allowedDate);
    expect(clampCalendarVisibleDate(allowedDate, maxDate)).toBe(allowedDate);
    expect(clampCalendarVisibleDate(futureDate, maxDate)).toEqual(
      new Date(2025, 5, 1),
    );
  });
});
