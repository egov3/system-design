import { BaseComponents } from "~baseComponents";
import { getDaysInMonth } from "~utils/date/getDaysInMonth";
import { joinClasses } from "~utils/joinClasses";
import styles from "./CalendarBody.module.css";

const WEEK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

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
  const today = new Date();

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
      isToday: isSameDate(date, today),
      isSelected: selectedDate ? isSameDate(date, selectedDate) : false,
    };
  });
};

export const CalendarBody = ({
  month = new Date().getMonth(),
  year = new Date().getFullYear(),
  selectedDate = null,
  onDayClick,
}: ICalendarBodyProps) => {
  const days = getCalendarDays(month, year, selectedDate);

  return (
    <div className={styles.wrapper} data-testid="CalendarBody">
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
