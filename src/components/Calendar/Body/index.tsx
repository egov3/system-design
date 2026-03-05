import { Icons } from "@egov3/graphics";
import { useEffect, useRef, useState } from "react";
import { BaseComponents } from "~baseComponents";
import type { ICalendarPeriod, TCalendarVariant } from "~interfaces/Calendar";
import { getYearsRange } from "~utils/date/range/getYearRange";
import { joinClasses } from "~utils/joinClasses";
import styles from "./CalendarBody.module.css";

const YEAR_ITEM_HEIGHT = 32;
const VISIBLE_YEARS_COUNT = 5;

type TCalendarPeriod = { start?: Date; end?: Date } | null;

interface CalendarBodyProps {
  yearRange: ICalendarPeriod<number>;
  currentMonth: Date;
  monthNames: string[];
  weekDays: string[];
  calendarDays: Date[];
  variant: TCalendarVariant;
  tempSelectedDate: Date | null;
  tempSelectedPeriod: TCalendarPeriod;
  isSameDay: (d1: Date, d2: Date) => boolean;
  isDayAvailable: (date: Date) => boolean;
  handleDayClick: (date: Date) => void;
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
  isSameDay,
  isDayAvailable,
  handleDayClick,
  goToPrevMonth,
  goToNextMonth,
  onYearSelect,
}: CalendarBodyProps) => {
  const [isYearPickerOpen, setIsYearPickerOpen] = useState(false);
  const yearListRef = useRef<HTMLDivElement>(null);
  const selectedYearRef = useRef<HTMLButtonElement>(null);

  const yearsDesc = [
    ...getYearsRange(yearRange.from.year, yearRange.to.year),
  ].reverse();

  const handleChooseYear = () => {
    setIsYearPickerOpen(!isYearPickerOpen);
  };

  useEffect(() => {
    if (!isYearPickerOpen) return;
    const id = requestAnimationFrame(() => {
      selectedYearRef.current?.scrollIntoView({
        block: "center",
        behavior: "instant",
      });
    });
    return () => cancelAnimationFrame(id);
  }, [isYearPickerOpen]);

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
            onClick={handleChooseYear}
            data-testid="Calendar_CHOOSE_YEAR_BTN"
          >
            <BaseComponents.Typography
              tag="span"
              fontClass="body1Medium"
              data-testid="Calendar_CURRENT_YEAR"
            >
              {currentMonth.getFullYear()}
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
          ref={yearListRef}
          className={styles.yearPickerContainer}
          style={{ height: YEAR_ITEM_HEIGHT * VISIBLE_YEARS_COUNT }}
        >
          {yearsDesc.map((year) => {
            const isCurrent = year === String(currentMonth.getFullYear());
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
        <div className={styles.daysGrid} data-testid="Calendar_DAYS_GRID">
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
          {calendarDays.map((date) => {
            const dayNumber = date.getDate();
            const isCurrentMonth = date.getMonth() === currentMonth.getMonth();

            let isSelected = false;
            if (variant === "default") {
              isSelected =
                !!tempSelectedDate && isSameDay(date, tempSelectedDate);
            } else {
              const isStart =
                !!tempSelectedPeriod?.start &&
                isSameDay(date, tempSelectedPeriod.start);
              const isEnd =
                !!tempSelectedPeriod?.end &&
                isSameDay(date, tempSelectedPeriod.end);
              isSelected = isStart || isEnd;
            }

            return (
              <button
                type="button"
                key={`day-${date.toISOString()}`}
                className={joinClasses(
                  styles.day,
                  !isCurrentMonth && styles.dayDisabled,
                  isSelected && styles.daySelected,
                )}
                disabled={!isCurrentMonth || !isDayAvailable(date)}
                onClick={() => handleDayClick(date)}
                data-testid={`day-${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`}
              >
                {dayNumber}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
