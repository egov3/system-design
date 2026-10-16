import { useEffect, useRef, useState } from "react";

import type { ICalendarDayCell, TPeriodKeys } from "~interfaces/Calendar";

import { PERIOD_KEYS } from "~constants/calendar";
import {
  clampCalendarVisibleDate,
  getCalendarDateWithoutTime,
  isCalendarMonthAfterDate,
  isCalendarMonthBeforeDate,
  isCalendarPeriodWithinLimit,
  isSameCalendarDate,
} from "~utils/calendar";
import { getDaysInMonth } from "~utils/date/getDaysInMonth";

const TODAY = new Date();
const YEARS_BACK = 100;

interface IUseCalendarBodyProps {
  month: number;
  year: number;
  selectedDate?: Date | null;
  selectedPeriodInterval: TPeriodKeys;
  rangeStart?: Date | null;
  rangeEnd?: Date | null;
  minDate?: Date | null;
  maxDate?: Date | null;
  maxPeriodMonths?: number | null;
  onMonthChange?: (date: Date) => void;
}

type TBuildCalendarDaysProps = Omit<IUseCalendarBodyProps, "onMonthChange">;

const getDateTimestamp = (date?: Date | null) =>
  date ? getCalendarDateWithoutTime(date).getTime() : null;

const buildCalendarDays = ({
  month,
  year,
  selectedDate,
  selectedPeriodInterval,
  rangeStart,
  rangeEnd,
  minDate,
  maxDate,
  maxPeriodMonths,
}: TBuildCalendarDaysProps): ICalendarDayCell[] => {
  const firstDayIndex = (new Date(year, month, 1).getDay() + 6) % 7;
  const daysInMonth = getDaysInMonth(month, year);
  const trailingDays = (7 - ((firstDayIndex + daysInMonth) % 7)) % 7;
  const cellCount = firstDayIndex + daysInMonth + trailingDays;
  const startDate = new Date(year, month, 1 - firstDayIndex);

  const rangeStartTime = getDateTimestamp(rangeStart);
  const rangeEndTime = getDateTimestamp(rangeEnd);
  const minDateTime = getDateTimestamp(minDate);
  const maxDateTime = getDateTimestamp(maxDate);

  const isDateInRange = (dateTime: number) =>
    rangeStartTime !== null &&
    rangeEndTime !== null &&
    dateTime >= rangeStartTime &&
    dateTime <= rangeEndTime;

  const isDateDisabled = (date: Date, dateTime: number) => {
    if (minDateTime !== null && dateTime < minDateTime) {
      return true;
    }
    if (maxDateTime !== null && dateTime > maxDateTime) {
      return true;
    }
    if (selectedPeriodInterval === PERIOD_KEYS.from) {
      return (
        rangeEndTime !== null &&
        (dateTime > rangeEndTime ||
          !isCalendarPeriodWithinLimit(date, rangeEnd, maxPeriodMonths))
      );
    }
    return (
      rangeStartTime !== null &&
      (dateTime < rangeStartTime ||
        !isCalendarPeriodWithinLimit(rangeStart, date, maxPeriodMonths))
    );
  };

  return Array.from({ length: cellCount }, (_, index) => {
    const date = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate() + index,
    );
    const dateTime = getCalendarDateWithoutTime(date).getTime();
    return {
      date,
      day: date.getDate(),
      isCurrentMonth: date.getMonth() === month,
      isToday: isSameCalendarDate(date, TODAY),
      isSelected: selectedDate ? isSameCalendarDate(date, selectedDate) : false,
      isInRange: isDateInRange(dateTime),
      isDisabled: isDateDisabled(date, dateTime),
    };
  });
};

export const useCalendar = ({
  month,
  year,
  selectedDate,
  selectedPeriodInterval,
  rangeStart,
  rangeEnd,
  minDate,
  maxDate,
  maxPeriodMonths,
  onMonthChange,
}: IUseCalendarBodyProps) => {
  const clampVisibleDate = (date: Date) =>
    clampCalendarVisibleDate(date, maxDate, minDate);
  const [visibleDate, setVisibleDate] = useState(() =>
    clampVisibleDate(new Date(year, month, 1)),
  );
  const syncKey = `${year}-${month}-${minDate?.getTime()}-${maxDate?.getTime()}`;
  const [syncedKey, setSyncedKey] = useState(syncKey);
  if (syncedKey !== syncKey) {
    setSyncedKey(syncKey);
    setVisibleDate(clampVisibleDate(new Date(year, month, 1)));
  }
  const [isYearPickerOpen, setIsYearPickerOpen] = useState(false);
  const yearListRef = useRef<HTMLDivElement | null>(null);

  const visibleMonth = visibleDate.getMonth();
  const visibleYear = visibleDate.getFullYear();

  const days = buildCalendarDays({
    month: visibleMonth,
    year: visibleYear,
    selectedDate,
    selectedPeriodInterval,
    rangeStart,
    rangeEnd,
    minDate,
    maxDate,
    maxPeriodMonths,
  });

  const maxYear = maxDate?.getFullYear() ?? TODAY.getFullYear();
  const minYear = Math.min(
    minDate?.getFullYear() ?? maxYear - YEARS_BACK,
    maxYear,
  );
  const years = Array.from(
    { length: maxYear - minYear + 1 },
    (_, index) => maxYear - index,
  );
  const isNextMonthDisabled = Boolean(
    maxDate && isCalendarMonthAfterDate(visibleMonth + 1, visibleYear, maxDate),
  );
  const isPrevMonthDisabled = Boolean(
    minDate &&
    isCalendarMonthBeforeDate(visibleMonth - 1, visibleYear, minDate),
  );

  const changeMonth = (offset: number) => {
    setVisibleDate((current) => {
      const next = new Date(
        current.getFullYear(),
        current.getMonth() + offset,
        1,
      );
      const clampedNext = clampVisibleDate(next);
      if (clampedNext.getTime() === current.getTime()) {
        return current;
      }
      onMonthChange?.(clampedNext);
      return clampedNext;
    });
  };

  const pickYear = (pickedYear: number) => {
    setVisibleDate((current) => {
      const next = clampVisibleDate(
        new Date(pickedYear, current.getMonth(), 1),
      );
      onMonthChange?.(next);
      return next;
    });
    setIsYearPickerOpen(false);
  };

  useEffect(() => {
    if (!isYearPickerOpen || !yearListRef.current) {
      return;
    }
    const selectedButton = yearListRef.current.querySelector(
      `[data-year="${visibleYear}"]`,
    );
    selectedButton?.scrollIntoView({ block: "center" });
  }, [isYearPickerOpen, visibleYear]);

  return {
    days,
    years,
    visibleMonth,
    visibleYear,
    isYearPickerOpen,
    isNextMonthDisabled,
    isPrevMonthDisabled,
    setIsYearPickerOpen,
    yearListRef,
    changeMonth,
    pickYear,
  };
};
