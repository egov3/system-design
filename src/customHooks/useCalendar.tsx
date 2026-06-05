import { useEffect, useRef, useState } from "react";
import { PERIOD_KEYS } from "~constants/calendar";
import type { ICalendarDayCell, TPeriodKeys } from "~interfaces/Calendar";
import {
  clampCalendarVisibleDate,
  getCalendarDateWithoutTime,
  isCalendarMonthAfterDate,
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
  maxDate?: Date | null;
  onMonthChange?: (date: Date) => void;
}

type IBuildCalendarDaysProps = Omit<IUseCalendarBodyProps, "onMonthChange">;

const getDateTimestamp = (date?: Date | null) =>
  date ? getCalendarDateWithoutTime(date).getTime() : null;

const buildCalendarDays = ({
  month,
  year,
  selectedDate,
  selectedPeriodInterval,
  rangeStart,
  rangeEnd,
  maxDate,
}: IBuildCalendarDaysProps): ICalendarDayCell[] => {
  const firstDayIndex = (new Date(year, month, 1).getDay() + 6) % 7;
  const daysInMonth = getDaysInMonth(month, year);
  const trailingDays = (7 - ((firstDayIndex + daysInMonth) % 7)) % 7;
  const cellCount = firstDayIndex + daysInMonth + trailingDays;
  const startDate = new Date(year, month, 1 - firstDayIndex);

  const rangeStartTime = getDateTimestamp(rangeStart);
  const rangeEndTime = getDateTimestamp(rangeEnd);
  const maxDateTime = getDateTimestamp(maxDate);

  const isDateInRange = (dateTime: number) =>
    rangeStartTime !== null &&
    rangeEndTime !== null &&
    dateTime >= rangeStartTime &&
    dateTime <= rangeEndTime;

  const isDateDisabled = (dateTime: number) => {
    if (maxDateTime !== null && dateTime > maxDateTime) {
      return true;
    }

    if (selectedPeriodInterval === PERIOD_KEYS.from) {
      return rangeEndTime !== null && dateTime > rangeEndTime;
    }

    return rangeStartTime !== null && dateTime < rangeStartTime;
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
      isDisabled: isDateDisabled(dateTime),
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
  maxDate,
  onMonthChange,
}: IUseCalendarBodyProps) => {
  const [visibleDate, setVisibleDate] = useState(() =>
    clampCalendarVisibleDate(new Date(year, month, 1), maxDate),
  );
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
    maxDate,
  });

  const maxYear = maxDate?.getFullYear() ?? TODAY.getFullYear();
  const minYear = maxYear - YEARS_BACK;
  const years = Array.from(
    { length: maxYear - minYear + 1 },
    (_, index) => maxYear - index,
  );
  const isNextMonthDisabled = Boolean(
    maxDate && isCalendarMonthAfterDate(visibleMonth + 1, visibleYear, maxDate),
  );

  const changeMonth = (offset: number) => {
    setVisibleDate((current) => {
      const next = new Date(
        current.getFullYear(),
        current.getMonth() + offset,
        1,
      );
      const clampedNext = clampCalendarVisibleDate(next, maxDate);

      if (clampedNext.getTime() === current.getTime()) {
        return current;
      }

      onMonthChange?.(clampedNext);
      return clampedNext;
    });
  };

  const pickYear = (pickedYear: number) => {
    setVisibleDate((current) => {
      const next = clampCalendarVisibleDate(
        new Date(pickedYear, current.getMonth(), 1),
        maxDate,
      );
      onMonthChange?.(next);
      return next;
    });
    setIsYearPickerOpen(false);
  };

  useEffect(() => {
    setVisibleDate(clampCalendarVisibleDate(new Date(year, month, 1), maxDate));
  }, [month, maxDate, year]);

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
    setIsYearPickerOpen,
    yearListRef,
    changeMonth,
    pickYear,
  };
};
