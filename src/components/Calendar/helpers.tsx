import type { ICalendarPeriod, IDateItem, TPeriodKeys } from "~interfaces/Calendar";
import { formatDate } from "~utils/date/formatDate";

type TAvailability = {
  date: Date;
  availableDays?: string[];
  isWeekdaysOnly?: boolean;
};

const toDateItem = (date: Date): IDateItem<number> => ({
  day: date.getDate(),
  month: date.getMonth() + 1,
  year: date.getFullYear(),
});

export const dateFromDateItem = (dateItem?: IDateItem<number> | null): Date | null =>
  dateItem
    ? new Date(dateItem.year, dateItem.month - 1, dateItem.day)
    : null;

export const dateItemFromDate = (date?: Date | null): IDateItem<number> | null =>
  date ? toDateItem(date) : null;

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
}: TAvailability): boolean => {
  const dateString = formatDate(date);

  if (availableDays?.length && !availableDays.includes(dateString)) return false;
  if (!isWeekdaysOnly) return true;

  const weekday = date.getDay();
  return weekday !== 0 && weekday !== 6;
};

export const updatePeriodByView = (
  period: ICalendarPeriod<number> | null,
  view: TPeriodKeys,
  date: Date,
): ICalendarPeriod<number> | null => {
  const clickedDate = toDateItem(date);

  if (view === "from") {
    return {
      from: clickedDate,
      to: period?.to ?? clickedDate,
    };
  }

  if (!period?.from) return period;

  const fromDate = dateFromDateItem(period.from);
  if (!fromDate || date < fromDate) return period;

  return {
    from: period.from,
    to: clickedDate,
  };
};

export const isPeriodDateDisabled = (
  date: Date,
  view: TPeriodKeys,
  period: ICalendarPeriod<number> | null,
): boolean => {
  if (view !== "to" || !period?.from) return false;

  const fromDate = dateFromDateItem(period.from);
  return !!fromDate && date < fromDate;
};

export const isPeriodDateSelected = (
  date: Date,
  view: TPeriodKeys,
  period: ICalendarPeriod<number> | null,
): boolean => {
  if (!period) return false;
  const selectedDate = dateFromDateItem(
    view === "from" ? period.from : period.to,
  );
  return !!selectedDate && isSameDay(date, selectedDate);
};
