import { useEffect, useMemo, useRef, useState } from "react";
import type { ICalendarDayCell } from "~interfaces/Calendar";
import { getDaysInMonth } from "~utils/date/getDaysInMonth";

const TODAY = new Date();
const YEARS_BACK = 100;

interface IUseCalendarBodyProps {
  month: number;
  year: number;
  selectedDate?: Date | null;
  rangeStart?: Date | null;
  rangeEnd?: Date | null;
  onMonthChange?: (date: Date) => void;
}

const isSameDate = (left: Date, right: Date) =>
  left.getFullYear() === right.getFullYear() &&
  left.getMonth() === right.getMonth() &&
  left.getDate() === right.getDate();

const buildCalendarDays = (
  month: number,
  year: number,
  selectedDate?: Date | null,
  rangeStart?: Date | null,
  rangeEnd?: Date | null,
): ICalendarDayCell[] => {
  const firstDayIndex = (new Date(year, month, 1).getDay() + 6) % 7;
  const daysInMonth = getDaysInMonth(month, year);
  const trailingDays = (7 - ((firstDayIndex + daysInMonth) % 7)) % 7;
  const cellCount = firstDayIndex + daysInMonth + trailingDays;
  const startDate = new Date(year, month, 1 - firstDayIndex);

  return Array.from({ length: cellCount }, (_, index) => {
    const date = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate() + index,
    );

    return {
      date,
      day: date.getDate(),
      isCurrentMonth: date.getMonth() === month,
      isToday: isSameDate(date, TODAY),
      isSelected: selectedDate ? isSameDate(date, selectedDate) : false,
      isInRange: Boolean(
        rangeStart &&
          rangeEnd &&
          date.getTime() >= rangeStart.getTime() &&
          date.getTime() <= rangeEnd.getTime(),
      ),
    };
  });
};

export const useCalendar = ({
  month,
  year,
  selectedDate,
  rangeStart,
  rangeEnd,
  onMonthChange,
}: IUseCalendarBodyProps) => {
  const [visibleDate, setVisibleDate] = useState(
    () => new Date(year, month, 1),
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
        rangeStart,
        rangeEnd,
      ),
    [visibleMonth, visibleYear, rangeEnd, rangeStart, selectedDate],
  );
  const maxYear = TODAY.getFullYear();
  const minYear = maxYear - YEARS_BACK;
  const years = Array.from(
    { length: maxYear - minYear + 1 },
    (_, index) => maxYear - index,
  );

  const changeMonth = (offset: number) => {
    setVisibleDate((current) => {
      const next = new Date(
        current.getFullYear(),
        current.getMonth() + offset,
        1,
      );
      onMonthChange?.(next);
      return next;
    });
  };

  const pickYear = (pickedYear: number) => {
    setVisibleDate((current) => {
      const next = new Date(pickedYear, current.getMonth(), 1);
      onMonthChange?.(next);
      return next;
    });
    setIsYearPickerOpen(false);
  };

  useEffect(() => {
    setVisibleDate(new Date(year, month, 1));
  }, [month, year]);

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
    setIsYearPickerOpen,
    yearListRef,
    changeMonth,
    pickYear,
  };
};
