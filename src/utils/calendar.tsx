import type { ISelectedPeriod, TPeriodKeys } from "~interfaces/Calendar";
import { convertType } from "~utils/date/convertType";

export const formatCalendarDate = (date?: Date | null) => {
  if (!date) {
    return "";
  }
  return `${convertType.day.toString(date.getDate())}.${convertType.month.toString(date.getMonth())}.${date.getFullYear()}`;
};

export const normalizeCalendarDate = (
  value?: Date | string | number | null,
) => {
  if (!value) {
    return null;
  }
  const normalizedDate = value instanceof Date ? value : new Date(value);
  return Number.isNaN(normalizedDate.getTime()) ? null : normalizedDate;
};

export const getCalendarDateWithoutTime = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());

export const isSameCalendarDate = (left: Date, right: Date) =>
  left.getFullYear() === right.getFullYear() &&
  left.getMonth() === right.getMonth() &&
  left.getDate() === right.getDate();

export const isCalendarDateAfter = (
  date: Date | null,
  maxDate: Date | null,
) => {
  if (!date || !maxDate) {
    return false;
  }
  return (
    getCalendarDateWithoutTime(date).getTime() >
    getCalendarDateWithoutTime(maxDate).getTime()
  );
};

export const getPeriodDateKey = (periodKey: TPeriodKeys) =>
  `${periodKey}Date` as const;

export const updateSelectedPeriod = (
  currentPeriod: ISelectedPeriod,
  selectedPeriodInterval: TPeriodKeys,
  nextDate: Date,
) => {
  const periodDateKey = getPeriodDateKey(selectedPeriodInterval);
  const currentDate = currentPeriod[periodDateKey];
  const isSameDate = currentDate
    ? isSameCalendarDate(currentDate, nextDate)
    : false;
  const nextPeriod = {
    ...currentPeriod,
    [periodDateKey]: isSameDate ? null : nextDate,
  };

  return {
    ...nextPeriod,
    periodSelected: Boolean(nextPeriod.fromDate && nextPeriod.toDate),
  };
};

export const isCalendarMonthAfterDate = (
  month: number,
  year: number,
  date: Date,
) =>
  year > date.getFullYear() ||
  (year === date.getFullYear() && month > date.getMonth());

export const clampCalendarVisibleDate = (date: Date, maxDate?: Date | null) => {
  if (
    !maxDate ||
    !isCalendarMonthAfterDate(date.getMonth(), date.getFullYear(), maxDate)
  ) {
    return date;
  }
  return new Date(maxDate.getFullYear(), maxDate.getMonth(), 1);
};
