import { useEffect, useRef, useState } from "react";

import type { ICalendarDayCell, TPeriodKeys } from "~interfaces/Calendar";

import {
  clampCalendarVisibleDate,
  getCalendarDateWithoutTime,
  getCalendarSelectableBounds,
  isCalendarMonthAfterDate,
  isCalendarMonthBeforeDate,
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

type TBuildCalendarDaysProps = {
  month: number;
  year: number;
  selectedDate?: Date | null;
  rangeStart?: Date | null;
  rangeEnd?: Date | null;
  selectableMinDate?: Date | null;
  selectableMaxDate?: Date | null;
};

const getDateTimestamp = (date?: Date | null) =>
  date ? getCalendarDateWithoutTime(date).getTime() : null;

const buildCalendarDays = ({
  month,
  year,
  selectedDate,
  rangeStart,
  rangeEnd,
  selectableMinDate,
  selectableMaxDate,
}: TBuildCalendarDaysProps): ICalendarDayCell[] => {
  const firstDayIndex = (new Date(year, month, 1).getDay() + 6) % 7;
  const daysInMonth = getDaysInMonth(month, year);
  const trailingDays = (7 - ((firstDayIndex + daysInMonth) % 7)) % 7;
  const cellCount = firstDayIndex + daysInMonth + trailingDays;
  const startDate = new Date(year, month, 1 - firstDayIndex);

  const rangeStartTime = getDateTimestamp(rangeStart);
  const rangeEndTime = getDateTimestamp(rangeEnd);
  const selectableMinTime = getDateTimestamp(selectableMinDate);
  const selectableMaxTime = getDateTimestamp(selectableMaxDate);

  const isDateInRange = (dateTime: number) =>
    rangeStartTime !== null &&
    rangeEndTime !== null &&
    dateTime >= rangeStartTime &&
    dateTime <= rangeEndTime;

  const isDateDisabled = (dateTime: number) =>
    (selectableMinTime !== null && dateTime < selectableMinTime) ||
    (selectableMaxTime !== null && dateTime > selectableMaxTime);

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
  minDate,
  maxDate,
  maxPeriodMonths,
  onMonthChange,
}: IUseCalendarBodyProps) => {
  const selectableBounds = getCalendarSelectableBounds({
    minDate,
    maxDate,
    selectedPeriodInterval,
    rangeStart,
    rangeEnd,
    maxPeriodMonths,
  });
  const selectableMinDate = selectableBounds.minDate;
  const selectableMaxDate = selectableBounds.maxDate;
  const clampVisibleDate = (date: Date) =>
    clampCalendarVisibleDate(date, selectableMaxDate, selectableMinDate);
  const [visibleDate, setVisibleDate] = useState(() =>
    clampVisibleDate(new Date(year, month, 1)),
  );
  const syncKey = [
    year,
    month,
    selectableMinDate?.getTime(),
    selectableMaxDate?.getTime(),
    selectedPeriodInterval,
  ].join("-");
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
    rangeStart,
    rangeEnd,
    selectableMinDate,
    selectableMaxDate,
  });

  const maxYear = selectableMaxDate?.getFullYear() ?? TODAY.getFullYear();
  const minYear = Math.min(
    selectableMinDate?.getFullYear() ?? maxYear - YEARS_BACK,
    maxYear,
  );
  const years = Array.from(
    { length: maxYear - minYear + 1 },
    (_, index) => maxYear - index,
  );
  const isNextMonthDisabled = Boolean(
    selectableMaxDate &&
    isCalendarMonthAfterDate(visibleMonth + 1, visibleYear, selectableMaxDate),
  );
  const isPrevMonthDisabled = Boolean(
    selectableMinDate &&
    isCalendarMonthBeforeDate(
      visibleMonth - 1,
      visibleYear,
      selectableMinDate,
    ),
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
