import { Icons } from "@egov3/graphics";
import { useEffect, useRef, useState } from "react";
import { BaseComponents } from "~baseComponents";
import type {
  ICalendarPeriod,
  TCalendarVariant,
  TPeriodKeys,
} from "~interfaces/Calendar";
import { getYearsRange } from "~utils/date/range/getYearRange";
import { joinClasses } from "~utils/joinClasses";
import { isPeriodDateDisabled, isPeriodDateSelected } from "../helpers";
import styles from "./CalendarBody.module.css";

const YEAR_ITEM_HEIGHT = 32;
const VISIBLE_YEARS_COUNT = 5;

interface CalendarBodyProps {
  yearRange: ICalendarPeriod<number>;
  currentMonth: Date;
  monthNames: string[];
  weekDays: string[];
  calendarDays: Date[];
  variant: TCalendarVariant;
  tempSelectedDate: Date | null;
  tempSelectedPeriod: ICalendarPeriod<number> | null;
  selectedPeriodView?: TPeriodKeys;
  isSameDay: (d1: Date, d2: Date) => boolean;
  isDayAvailable: (date: Date) => boolean;
  onDayClick: (date: Date) => void;
  goToPrevMonth: () => void;
  goToNextMonth: () => void;
  onYearSelect: (year: number) => void;
}

export const CalendarBody = ({
  yearRange,
  currentMonth,
  monthNames,
  weekDays,
  calendarDays,
  variant,
  tempSelectedDate,
  tempSelectedPeriod,
  selectedPeriodView,
  isSameDay,
  isDayAvailable,
  onDayClick,
  goToPrevMonth,
  goToNextMonth,
  onYearSelect,
}: CalendarBodyProps) => {
  const [isYearPickerOpen, setIsYearPickerOpen] = useState(false);
  const selectedYearRef = useRef<HTMLButtonElement>(null);
  const currentYear = currentMonth.getFullYear();
  const yearsDesc = [
    ...getYearsRange(yearRange.from.year, yearRange.to.year),
  ].reverse();

  const toggleYearPicker = () => setIsYearPickerOpen((open) => !open);

  useEffect(() => {
    if (!isYearPickerOpen) return;
    const id = requestAnimationFrame(() =>
      selectedYearRef.current?.scrollIntoView({
        block: "center",
        behavior: "instant",
      }),
    );
    return () => cancelAnimationFrame(id);
  }, [isYearPickerOpen]);

  const getDaySelected = (date: Date) => {
    if (variant === "default") {
      return !!tempSelectedDate && isSameDay(date, tempSelectedDate);
    }

    return isPeriodDateSelected(
      date,
      selectedPeriodView ?? "from",
      tempSelectedPeriod,
    );
  };

  const getDayDisabled = (date: Date) => {
    const isCurrentMonth = date.getMonth() === currentMonth.getMonth();
    return (
      !isCurrentMonth ||
      !isDayAvailable(date) ||
      (variant === "period" &&
        isPeriodDateDisabled(
          date,
          selectedPeriodView ?? "from",
          tempSelectedPeriod,
        ))
    );
  };

  return (
    <div className={styles.container} data-testid="Calendar_BODY">
      <div className={styles.header} data-testid="Calendar_HEADER">
        <div className={styles.currentMonth}>
          <BaseComponents.Typography
            tag="span"
            fontClass="body1Medium"
            data-testid="Calendar_CURRENT_MONTH"
          >
            {monthNames[currentMonth.getMonth()]}
          </BaseComponents.Typography>
          <button
            className={styles.chooseYearButton}
            type="button"
            onClick={toggleYearPicker}
            data-testid="Calendar_CHOOSE_YEAR_BTN"
          >
            <BaseComponents.Typography
              tag="span"
              fontClass="body1Medium"
              data-testid="Calendar_CURRENT_YEAR"
            >
              {currentYear}
            </BaseComponents.Typography>
            <Icons.Basic.ChevronDownSmall
              width="24px"
              height="24px"
              fill="var(--icon-accent-color)"
            />
          </button>
        </div>

        <div className={styles.navigation}>
          {isYearPickerOpen ? (
            <button
              type="button"
              onClick={() => {
                setIsYearPickerOpen(false);
              }}
              data-testid="Calendar_CLOSE_YEAR_PICKER_BTN"
            >
              <Icons.General.Close width="24px" height="24px" />
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={goToPrevMonth}
                data-testid="Calendar_PREV_MONTH_BTN"
              >
                <Icons.Basic.ChevronLeft
                  width="24px"
                  height="24px"
                  fill="var(--icon-accent-color)"
                />
              </button>
              <button
                type="button"
                onClick={goToNextMonth}
                data-testid="Calendar_NEXT_MONTH_BTN"
              >
                <Icons.Basic.ChevronRight
                  width="24px"
                  height="24px"
                  fill="var(--icon-accent-color)"
                />
              </button>
            </>
          )}
        </div>
      </div>
      {isYearPickerOpen ? (
        <div
          className={styles.yearPickerContainer}
          data-testid="Calendar_YEAR_LIST"
          style={{ height: YEAR_ITEM_HEIGHT * VISIBLE_YEARS_COUNT }}
        >
          {yearsDesc.map((year) => {
            const isCurrent = year === String(currentYear);
            return (
              <button
                ref={isCurrent ? selectedYearRef : undefined}
                type="button"
                key={year}
                onClick={() => {
                  onYearSelect(Number(year));
                  setIsYearPickerOpen(false);
                }}
                className={styles.yearItemButton}
                data-testid={`Calendar_YEAR_${year}`}
              >
                <BaseComponents.Typography
                  className={joinClasses(
                    styles.yearItem,
                    isCurrent && styles.yearItemCurrent,
                  )}
                  tag="span"
                  fontClass="body1Medium"
                >
                  {year}
                </BaseComponents.Typography>
              </button>
            );
          })}
        </div>
      ) : (
        <>
          <div className={styles.weekdays} data-testid="Calendar_WEEKDAYS">
            {weekDays.map((day) => (
              <BaseComponents.Typography
                tag="span"
                fontClass="body2Medium"
                key={day}
                className={styles.weekday}
                data-testid={`Calendar_WEEKDAY_${day}`}
              >
                {day}
              </BaseComponents.Typography>
            ))}
          </div>

          <div className={styles.daysGrid} data-testid="Calendar_DAYS_GRID">
            {calendarDays.map((date) => {
              const isCurrentMonth =
                date.getMonth() === currentMonth.getMonth();
              const disabled = getDayDisabled(date);
              const selected = getDaySelected(date);

              return (
                <button
                  type="button"
                  key={`day-${date.toISOString()}`}
                  className={joinClasses(
                    styles.day,
                    (!isCurrentMonth || disabled) && styles.dayDisabled,
                    selected && styles.daySelected,
                  )}
                  disabled={disabled}
                  onClick={() => onDayClick(date)}
                  data-testid={`day-${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};
