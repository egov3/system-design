import { useEffect, useMemo, useState } from "react";
import type { ICalendarDayCell } from "~interfaces/Calendar";
import { getDaysInMonth } from "~utils/date/getDaysInMonth";

const TODAY = new Date();

interface IUseCalendarBodyProps {
  month: number;
  year: number;
  selectedDate?: Date | null;
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
    };
  });
};

export const useCalendarBody = ({
  month,
  year,
  selectedDate,
  onMonthChange,
}: IUseCalendarBodyProps) => {
  const [visibleDate, setVisibleDate] = useState(
    () => new Date(year, month, 1),
  );

  useEffect(() => {
    setVisibleDate(new Date(year, month, 1));
  }, [month, year]);

  const visibleMonth = visibleDate.getMonth();
  const visibleYear = visibleDate.getFullYear();

  const days = useMemo(
    () => buildCalendarDays(visibleMonth, visibleYear, selectedDate),
    [visibleMonth, visibleYear, selectedDate],
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

  return { days, visibleMonth, visibleYear, changeMonth };
};
