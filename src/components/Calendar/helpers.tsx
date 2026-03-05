import type {
  ICalendarPeriod,
  IDateItem,
  TUiSelectedPeriod,
} from "~interfaces/Calendar";
import { formatDate } from "~utils/date/formatDate";

export const dateFromDateItem = (
  dateItem?: IDateItem<number> | null,
): Date | null => {
  if (!dateItem) return null;
  return new Date(dateItem.year, dateItem.month - 1, dateItem.day);
};

export const dateItemFromDate = (
  date?: Date | null,
): IDateItem<number> | null => {
  if (!date) return null;
  return {
    day: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear(),
  };
};

export const uiPeriodFromCalendarPeriod = (
  period?: ICalendarPeriod<number> | null,
): TUiSelectedPeriod => {
  if (!period) return null;
  return {
    start: new Date(period.from.year, period.from.month - 1, period.from.day),
    end: new Date(period.to.year, period.to.month - 1, period.to.day),
  };
};

export const calendarPeriodFromUiPeriod = (
  period?: TUiSelectedPeriod,
): ICalendarPeriod<number> | null => {
  if (!period?.start || !period.end) return null;
  return {
    from: {
      day: period.start.getDate(),
      month: period.start.getMonth() + 1,
      year: period.start.getFullYear(),
    },
    to: {
      day: period.end.getDate(),
      month: period.end.getMonth() + 1,
      year: period.end.getFullYear(),
    },
  };
};

export const createDefaultYearRange = (
  override?: ICalendarPeriod<number>,
): ICalendarPeriod<number> => {
  if (override) return override;

  const now = new Date();
  return {
    from: { day: 1, month: 1, year: 1970 },
    to: {
      day: now.getDate(),
      month: now.getMonth() + 1,
      year: now.getFullYear(),
    },
  };
};

export const buildCalendarDays = (currentMonth: Date): Date[] => {
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();

  let firstDayIndex = firstDayOfMonth.getDay();
  firstDayIndex = firstDayIndex === 0 ? 6 : firstDayIndex - 1;

  const prevMonthDate = new Date(year, month, 0);
  const daysInPrevMonth = prevMonthDate.getDate();
  const days: Date[] = [];

  for (let i = 0; i < firstDayIndex; i++) {
    const day = daysInPrevMonth - firstDayIndex + i + 1;
    days.push(new Date(year, month - 1, day));
  }

  for (let i = 1; i <= daysInMonth; i++) {
    days.push(new Date(year, month, i));
  }

  const weeksCount = Math.ceil((firstDayIndex + daysInMonth) / 7);
  const totalCells = weeksCount * 7;
  const remaining = totalCells - days.length;

  for (let i = 1; i <= remaining; i++) {
    days.push(new Date(year, month + 1, i));
  }

  return days;
};

export const isSameDay = (d1: Date, d2: Date): boolean =>
  d1.getFullYear() === d2.getFullYear() &&
  d1.getMonth() === d2.getMonth() &&
  d1.getDate() === d2.getDate();

export const isDateAvailable = ({
  date,
  availableDays,
  isWeekdaysOnly,
}: {
  date: Date;
  availableDays?: string[];
  isWeekdaysOnly?: boolean;
}): boolean => {
  const dateString = formatDate(date);

  if (availableDays?.length && !availableDays.includes(dateString))
    return false;
  if (!isWeekdaysOnly) return true;

  const weekday = date.getDay();
  return weekday !== 0 && weekday !== 6;
};
