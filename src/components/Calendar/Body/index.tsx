import { Icons } from "@egov3/graphics";
import { BaseComponents } from "~baseComponents";
import { PERIOD_KEYS } from "~constants/calendar";
import { i18n } from "~constants/i18n";
import { useCalendar } from "~customHooks/useCalendar";
import type { TPeriodKeys } from "~interfaces/Calendar";
import type { ILangProps } from "~interfaces/common";
import { getMonthNameProper } from "~utils/date/getMonthNameProper";
import { joinClasses } from "~utils/joinClasses";
import styles from "./CalendarBody.module.css";

export interface ICalendarBodyProps extends ILangProps {
  month?: number;
  year?: number;
  selectedDate?: Date | null;
  rangeStart?: Date | null;
  rangeEnd?: Date | null;
  selectedPeriodInterval?: TPeriodKeys;
  onDayClick?: (date: Date) => void;
  onMonthChange?: (date: Date) => void;
}

export const CalendarBody = ({
  lang,
  month = new Date().getMonth(),
  year = new Date().getFullYear(),
  selectedDate = null,
  rangeStart = null,
  rangeEnd = null,
  selectedPeriodInterval = PERIOD_KEYS.from,
  onDayClick,
  onMonthChange,
}: ICalendarBodyProps) => {
  const {
    days,
    years,
    visibleMonth,
    visibleYear,
    isYearPickerOpen,
    setIsYearPickerOpen,
    yearListRef,
    changeMonth,
    pickYear,
  } = useCalendar({
    month,
    year,
    selectedDate,
    selectedPeriodInterval,
    rangeStart,
    rangeEnd,
    onMonthChange,
  });
  const monthName = getMonthNameProper(visibleMonth, lang);
  const weekDays = i18n.Calendar.WeekDays[lang];

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
            onClick={() => {
              setIsYearPickerOpen(true);
            }}
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
          </>
        )}
      </div>
      {isYearPickerOpen ? (
        <div
          ref={yearListRef}
          className={styles.years}
          data-testid="Calendar_YEARS_LIST"
        >
          {years.map((yearItem) => (
            <button
              key={yearItem}
              data-year={yearItem}
              type="button"
              className={joinClasses(
                styles.yearItem,
                yearItem === visibleYear && styles.yearItemSelected,
              )}
              onClick={() => {
                pickYear(yearItem);
              }}
            >
              <BaseComponents.Typography tag="span" fontClass="body1Medium">
                {yearItem}
              </BaseComponents.Typography>
            </button>
          ))}
        </div>
      ) : (
        <>
          <div className={styles.weekDays}>
            {weekDays.map((day) => (
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
                    !cell.isCurrentMonth && styles.hiddenDay,
                    cell.isDisabled && styles.disabledDay,
                    cell.isToday && styles.today,
                    cell.isSelected && styles.selected,
                  )}
                  onClick={() => {
                    if (cell.isCurrentMonth && !cell.isDisabled) {
                      onDayClick?.(cell.date);
                    }
                  }}
                  disabled={!cell.isCurrentMonth || cell.isDisabled}
                  data-testid={`CalendarBody_DAY_${cell.date.toISOString().slice(0, 10)}`}
                >
                  {cell.isCurrentMonth && (
                    <BaseComponents.Typography
                      tag="span"
                      fontClass="body2Medium"
                    >
                      {cell.day}
                    </BaseComponents.Typography>
                  )}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};
