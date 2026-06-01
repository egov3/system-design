import { Icons } from "@egov3/graphics";
import { BaseComponents } from "~baseComponents";
import { getMonthNameProper } from "~utils/date/getMonthNameProper";
import { joinClasses } from "~utils/joinClasses";
import { useCalendarBody } from "../../../customHooks/useCalendar";
import styles from "./CalendarBody.module.css";

const WEEK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export interface ICalendarBodyProps {
  month?: number;
  year?: number;
  selectedDate?: Date | null;
  onDayClick?: (date: Date) => void;
  onMonthChange?: (date: Date) => void;
}

export const CalendarBody = ({
  month = new Date().getMonth(),
  year = new Date().getFullYear(),
  selectedDate = null,
  onDayClick,
  onMonthChange,
}: ICalendarBodyProps) => {
  const { days, visibleMonth, visibleYear, changeMonth } = useCalendarBody({
    month,
    year,
    selectedDate,
    onMonthChange,
  });
  const monthName = getMonthNameProper(visibleMonth);

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
