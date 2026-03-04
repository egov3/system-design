import { Icons } from "@egov3/graphics";
import {
  type Dispatch,
  type SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import { BaseComponents } from "~baseComponents";
import type { ILangProps } from "~interfaces/common";
import { formatDate } from "~utils/date/formatDate";
import { joinClasses } from "~utils/joinClasses";
import styles from "./Calendar.module.css";

export interface ICalendarProps extends ILangProps {
  variant: "default" | "period";
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  selectedDate?: Date | null;
  setSelectedDate?: (date: Date | null) => void;
  selectedPeriod?: { start?: Date; end?: Date } | null;
  setSelectedPeriod?: (period: { start?: Date; end?: Date } | null) => void;
  isWeekdaysOnly?: boolean;
  availableDays?: string[];
  yearRange?: { start: number; end: number };
  hintText?: string;
  isTimeDate?: boolean;
  selectedTime?: string;
  setSelectedTime?: (time: string) => void;
  availableTime?: string[];
  isAvailable?: boolean;
  availabilityHintText?: string;
}

export const Calendar = ({
  variant,
  isOpen,
  setIsOpen,
  selectedDate,
  setSelectedDate,
  selectedPeriod,
  setSelectedPeriod,
  isWeekdaysOnly,
  availableDays,
  yearRange,
  hintText,
  isTimeDate,
  selectedTime,
  setSelectedTime,
  availableTime,
  isAvailable,
  availabilityHintText,
  lang,
}: ICalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState(() => {
    if (selectedDate) return new Date(selectedDate);
    if (selectedPeriod?.start) return new Date(selectedPeriod.start);
    return new Date();
  });

  const [tempSelectedDate, setTempSelectedDate] = useState<Date | null>(null);
  const [tempSelectedPeriod, setTempSelectedPeriod] = useState<{
    start?: Date;
    end?: Date;
  } | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTempSelectedDate(selectedDate ?? null);
      setTempSelectedPeriod(selectedPeriod ?? null);
    }
  }, [isOpen, selectedDate, selectedPeriod]);

  const goToPrevMonth = () => {
    setCurrentMonth((prev) => {
      const newMonth = new Date(prev.getFullYear(), prev.getMonth() - 1, 1);
      if (yearRange && newMonth.getFullYear() < yearRange.start) return prev;
      return newMonth;
    });
  };

  const goToNextMonth = () => {
    setCurrentMonth((prev) => {
      const newMonth = new Date(prev.getFullYear(), prev.getMonth() + 1, 1);
      if (yearRange && newMonth.getFullYear() > yearRange.end) return prev;
      return newMonth;
    });
  };

  const monthNames = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];
  const weekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

  const calendarDays = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();

    let firstDayIndex = firstDayOfMonth.getDay();
    firstDayIndex = firstDayIndex === 0 ? 6 : firstDayIndex - 1;

    const prevMonthDate = new Date(year, month, 0);
    const daysInPrevMonth = prevMonthDate.getDate();

    const days: Date[] = [];

    for (let i = 0; i < firstDayIndex; i++) {
      const day = daysInPrevMonth - firstDayIndex + i + 1;
      days.push(new Date(year, month - 1, day));
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }

    const remaining = 42 - days.length;
    for (let i = 1; i <= remaining; i++) {
      days.push(new Date(year, month + 1, i));
    }

    return days;
  }, [currentMonth]);

  const isDayAvailable = (date: Date): boolean => {
    const dateString = formatDate(date);

    if (availableDays?.length && !availableDays.includes(dateString))
      return false;
    if (isWeekdaysOnly) {
      const weekday = date.getDay();
      if (weekday === 0 || weekday === 6) return false;
    }
    return true;
  };

  const handleDayClick = (date: Date) => {
    if (!isDayAvailable(date)) return;

    if (variant === "period") {
      setTempSelectedPeriod((prev) => {
        if (!prev || (!prev.start && !prev.end)) {
          return { start: date, end: undefined };
        } else if (prev.start && !prev.end) {
          let start = prev.start;
          let end = date;
          if (start > end) [start, end] = [end, start];
          return { start, end };
        } else {
          return { start: date, end: undefined };
        }
      });
    } else {
      setTempSelectedDate(date);
    }
  };

  const handleSave = () => {
    if (variant === "period" && setSelectedPeriod) {
      setSelectedPeriod(tempSelectedPeriod);
    } else if (variant === "default" && setSelectedDate) {
      setSelectedDate(tempSelectedDate);
    }
    setIsOpen(false);
  };

  const isSameDay = (d1: Date, d2: Date) => {
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  };

  return (
    <BaseComponents.Modal
      variant="small"
      lang={lang}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      header={{
        title: "Выберите дату",
        isClosable: true,
      }}
      footerButtons={[
        {
          text: "Сохранить",
          onClick: handleSave,
          dataTestid: "Calendar_SAVE_BTN",
        },
      ]}
    >
      <div className={styles.container} data-testid="Calendar_CONTAINER">
        <div className={styles.header} data-testid="Calendar_HEADER">
          <div className={styles.currentMonth}>
            <BaseComponents.Typography
              tag="span"
              fontClass="body1Medium"
              data-testid="Calendar_CURRENT_MONTH"
            >
              {monthNames[currentMonth.getMonth()]}
            </BaseComponents.Typography>
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
          </div>

          <div className={styles.navigation}>
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
          </div>
        </div>

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
                disabled={!isDayAvailable(date) && isCurrentMonth}
                onClick={() => handleDayClick(date)}
                data-testid={`day-${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`}
              >
                {dayNumber}
              </button>
            );
          })}
        </div>
        {hintText && (
          <div className={styles.hint} data-testid="hint">
            {hintText}
          </div>
        )}
      </div>
    </BaseComponents.Modal>
  );
};
