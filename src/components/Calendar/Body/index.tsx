import { Icons } from "@egov3/graphics";
import { useEffect, useState } from "react";
import { BaseComponents } from "~baseComponents";
import { getDaysInMonth } from "~utils/date/getDaysInMonth";
import { getMonthNameProper } from "~utils/date/getMonthNameProper";
import { joinClasses } from "~utils/joinClasses";
import styles from "./CalendarBody.module.css";

const WEEK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const TODAY = new Date();

export interface ICalendarDayCell {
  date: Date;
  day: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
}

export interface ICalendarBodyProps {
  month?: number;
  year?: number;
  selectedDate?: Date | null;
  onDayClick?: (date: Date) => void;
  onMonthChange?: (month: number, year: number) => void;
}

const isSameDate = (left: Date, right: Date) =>
  left.getFullYear() === right.getFullYear() &&
  left.getMonth() === right.getMonth() &&
  left.getDate() === right.getDate();

const getCalendarDays = (
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

export const CalendarBody = ({
  month = new Date().getMonth(),
  year = new Date().getFullYear(),
  selectedDate = null,
  onDayClick,
  onMonthChange,
}: ICalendarBodyProps) => {
  const [visibleDate, setVisibleDate] = useState(
    () => new Date(year, month, 1),
  );

  useEffect(() => {
    setVisibleDate(new Date(year, month, 1));
  }, [month, year]);

  const visibleMonth = visibleDate.getMonth();
  const visibleYear = visibleDate.getFullYear();
  const monthName = getMonthNameProper(visibleMonth);
  const days = getCalendarDays(visibleMonth, visibleYear, selectedDate);

  const changeMonth = (offset: number) => {
    setVisibleDate((current) => {
      const next = new Date(
        current.getFullYear(),
        current.getMonth() + offset,
        1,
      );
      onMonthChange?.(next.getMonth(), next.getFullYear());
      return next;
    });
  };

  return (
    <div className={styles.wrapper} data-testid="CalendarBody">
      <div className={styles.header}>
        <div
          className={styles.monthYear}
          data-testid="Calendar_MONTH_YEAR_LABEL"
        >
          <BaseComponents.Typography
            tag="span"
            fontClass="body1Medium"
            data-testid="CalendarBody_MONTH_YEAR"
          >
            {monthName}
          </BaseComponents.Typography>
          <button
            className={styles.yearButton}
            type="button"
            onClick={() => {}}
            data-testid="Calendar_CHOOSE_YEAR_BTN"
          >
            <BaseComponents.Typography
              tag="span"
              fontClass="body1Medium"
              data-testid="Calendar_CURRENT_YEAR"
            >
              {visibleYear}
            </BaseComponents.Typography>
            <Icons.Basic.ChevronDownSmall
              width="24px"
              height="24px"
              fill="var(--icon-accent-color)"
            />
          </button>
        </div>
        <button
          className={styles.navButton}
          type="button"
          onClick={() => {
            changeMonth(-1);
          }}
          data-testid="Calendar_PREV_MONTH_BTN"
        >
          <Icons.Basic.ChevronLeft
            width="24px"
            height="24px"
            fill="var(--icon-accent-color)"
          />
        </button>
        <button
          className={styles.navButton}
          type="button"
          onClick={() => {
            changeMonth(1);
          }}
          data-testid="Calendar_NEXT_MONTH_BTN"
        >
          <Icons.Basic.ChevronRight
            width="24px"
            height="24px"
            fill="var(--icon-accent-color)"
          />
        </button>
      </div>
      <div className={styles.weekDays}>
        {WEEK_DAYS.map((day) => (
          <BaseComponents.Typography
            tag="span"
            fontClass="body2Medium"
            key={day}
            className={styles.weekDay}
          >
            {day}
          </BaseComponents.Typography>
        ))}
      </div>
      <div className={styles.grid}>
        {days.map((cell) => {
          return (
            <button
              key={cell.date.toISOString()}
              type="button"
              className={joinClasses(
                styles.day,
                !cell.isCurrentMonth && styles.muted,
                cell.isToday && styles.today,
                cell.isSelected && styles.selected,
              )}
              onClick={() => {
                onDayClick?.(cell.date);
              }}
              data-testid={`CalendarBody_DAY_${cell.date.toISOString().slice(0, 10)}`}
            >
              <BaseComponents.Typography tag="span" fontClass="body2Medium">
                {cell.day}
              </BaseComponents.Typography>
            </button>
          );
        })}
      </div>
    </div>
  );
};
