import { useEffect, useMemo, useRef, useState } from "react";
import { PERIOD_KEYS } from "~constants/calendar";
import type { ICalendarDayCell, TPeriodKeys } from "~interfaces/Calendar";
import {
  clampCalendarVisibleDate,
  getCalendarDateWithoutTime,
  isCalendarMonthAfterDate,
  isSameCalendarDate,
  normalizeCalendarDate,
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

const buildCalendarDays = (
  month: number,
  year: number,
  selectedDate?: Date | null,
  selectedPeriodInterval?: TPeriodKeys,
  rangeStart?: Date | null,
  rangeEnd?: Date | null,
  maxDate?: Date | null,
): ICalendarDayCell[] => {
  const firstDayIndex = (new Date(year, month, 1).getDay() + 6) % 7;
  const daysInMonth = getDaysInMonth(month, year);
  const trailingDays = (7 - ((firstDayIndex + daysInMonth) % 7)) % 7;
  const cellCount = firstDayIndex + daysInMonth + trailingDays;
  const startDate = new Date(year, month, 1 - firstDayIndex);
  const normalizedMaxDate = maxDate
    ? getCalendarDateWithoutTime(maxDate)
    : null;

  return Array.from({ length: cellCount }, (_, index) => {
    const date = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate() + index,
    );
    const normalizedDate = getCalendarDateWithoutTime(date);

    return {
      date,
      day: date.getDate(),
      isCurrentMonth: date.getMonth() === month,
      isToday: isSameCalendarDate(date, TODAY),
      isSelected: selectedDate ? isSameCalendarDate(date, selectedDate) : false,
      isInRange: Boolean(
        rangeStart &&
          rangeEnd &&
          normalizedDate.getTime() >=
            getCalendarDateWithoutTime(rangeStart).getTime() &&
          normalizedDate.getTime() <=
            getCalendarDateWithoutTime(rangeEnd).getTime(),
      ),
      isDisabled: Boolean(
        (selectedPeriodInterval === PERIOD_KEYS.from &&
          rangeEnd &&
          normalizedDate.getTime() >
            getCalendarDateWithoutTime(rangeEnd).getTime()) ||
          (selectedPeriodInterval === PERIOD_KEYS.to &&
            rangeStart &&
            normalizedDate.getTime() <
              getCalendarDateWithoutTime(rangeStart).getTime()) ||
          (normalizedMaxDate &&
            normalizedDate.getTime() > normalizedMaxDate.getTime()),
      ),
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
  const normalizedMaxDate = normalizeCalendarDate(maxDate);
  const [visibleDate, setVisibleDate] = useState(() =>
    clampCalendarVisibleDate(new Date(year, month, 1), normalizedMaxDate),
  );
  const [isYearPickerOpen, setIsYearPickerOpen] = useState(false);
  const yearListRef = useRef<HTMLDivElement | null>(null);

  const visibleMonth = visibleDate.getMonth();
  const visibleYear = visibleDate.getFullYear();

  const days = useMemo(
    () =>
      buildCalendarDays(
        visibleMonth,
        visibleYear,
        selectedDate,
        selectedPeriodInterval,
        rangeStart,
        rangeEnd,
        normalizedMaxDate,
      ),
    [
      normalizedMaxDate,
      rangeEnd,
      rangeStart,
      selectedDate,
      selectedPeriodInterval,
      visibleMonth,
      visibleYear,
    ],
  );

  const maxYear = normalizedMaxDate?.getFullYear() ?? TODAY.getFullYear();
  const minYear = maxYear - YEARS_BACK;
  const years = Array.from(
    { length: maxYear - minYear + 1 },
    (_, index) => maxYear - index,
  );
  const isNextMonthDisabled = Boolean(
    normalizedMaxDate &&
      isCalendarMonthAfterDate(
        visibleMonth + 1,
        visibleYear,
        normalizedMaxDate,
      ),
  );

  const changeMonth = (offset: number) => {
    setVisibleDate((current) => {
      const next = new Date(
        current.getFullYear(),
        current.getMonth() + offset,
        1,
      );
      const clampedNext = clampCalendarVisibleDate(next, normalizedMaxDate);

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
        normalizedMaxDate,
      );
      onMonthChange?.(next);
      return next;
    });
    setIsYearPickerOpen(false);
  };

  useEffect(() => {
    setVisibleDate(
      clampCalendarVisibleDate(new Date(year, month, 1), normalizedMaxDate),
    );
  }, [month, normalizedMaxDate, year]);

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
