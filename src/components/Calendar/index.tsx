import {
  type Dispatch,
  type SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import { BaseComponents } from "~baseComponents";
import type {
  ICalendarPeriod,
  IDateItem,
  TCalendarVariant,
} from "~interfaces/Calendar";
import type { ILangProps } from "~interfaces/common";
import { formatDate } from "~utils/date/formatDate";
import { CalendarBody } from "./Body";
import styles from "./Calendar.module.css";

export interface ICalendarProps extends ILangProps {
  variant: TCalendarVariant;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  selectedDate?: IDateItem<number> | null;
  setSelectedDate?: (date: IDateItem<number> | null) => void;
  selectedPeriod?: ICalendarPeriod<number> | null;
  setSelectedPeriod?: (period: ICalendarPeriod<number> | null) => void;
  isWeekdaysOnly?: boolean;
  availableDays?: string[];
  yearRange?: ICalendarPeriod<number>;
  hintText?: string;
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
  yearRange: initialYearRange,
  hintText,
  lang,
}: ICalendarProps) => {
  const createDefaultYearRange = useMemo(() => {
    return (override?: ICalendarPeriod<number>): ICalendarPeriod<number> => {
      if (override) return override;

      const now = new Date();
      return {
        from: { day: 1, month: 1, year: 1970 },
        to: {
          day: now.getDate(),
          month: now.getMonth() + 1,
          year: now.getFullYear(),
        },
      };
    };
  }, []);

  const [yearRange, setYearRange] = useState<ICalendarPeriod<number>>(
    createDefaultYearRange(initialYearRange),
  );
  const [currentMonth, setCurrentMonth] = useState(() => {
    if (selectedDate)
      return new Date(
        selectedDate.year,
        selectedDate.month - 1,
        selectedDate.day,
      );
    if (selectedPeriod)
      return new Date(
        selectedPeriod.from.year,
        selectedPeriod.from.month - 1,
        selectedPeriod.from.day,
      );
    return new Date();
  });

  const [tempSelectedDate, setTempSelectedDate] = useState<Date | null>(null);
  const [tempSelectedPeriod, setTempSelectedPeriod] = useState<{
    start?: Date;
    end?: Date;
  } | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    setTempSelectedDate(
      selectedDate
        ? new Date(selectedDate.year, selectedDate.month - 1, selectedDate.day)
        : null,
    );

    setTempSelectedPeriod(
      selectedPeriod
        ? {
            start: new Date(
              selectedPeriod.from.year,
              selectedPeriod.from.month - 1,
              selectedPeriod.from.day,
            ),
            end: new Date(
              selectedPeriod.to.year,
              selectedPeriod.to.month - 1,
              selectedPeriod.to.day,
            ),
          }
        : null,
    );
  }, [isOpen, selectedDate, selectedPeriod]);

  useEffect(() => {
    setYearRange(createDefaultYearRange(initialYearRange));
  }, [initialYearRange, createDefaultYearRange]);

  const goToPrevMonth = () => {
    setCurrentMonth((prev) => {
      const newMonth = new Date(prev.getFullYear(), prev.getMonth() - 1, 1);
      if (yearRange && newMonth.getFullYear() < yearRange.from.year)
        return prev;
      return newMonth;
    });
  };

  const goToNextMonth = () => {
    setCurrentMonth((prev) => {
      const newMonth = new Date(prev.getFullYear(), prev.getMonth() + 1, 1);
      if (yearRange && newMonth.getFullYear() > yearRange.to.year) return prev;
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

    const weeksCount = Math.ceil((firstDayIndex + daysInMonth) / 7);
    const totalCells = weeksCount * 7;
    const remaining = totalCells - days.length;

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
      if (tempSelectedPeriod?.start && tempSelectedPeriod.end) {
        setSelectedPeriod({
          from: {
            day: tempSelectedPeriod.start.getDate(),
            month: tempSelectedPeriod.start.getMonth() + 1,
            year: tempSelectedPeriod.start.getFullYear(),
          },
          to: {
            day: tempSelectedPeriod.end.getDate(),
            month: tempSelectedPeriod.end.getMonth() + 1,
            year: tempSelectedPeriod.end.getFullYear(),
          },
        });
      } else {
        setSelectedPeriod(null);
      }
    } else if (variant === "default" && setSelectedDate) {
      setSelectedDate(
        tempSelectedDate
          ? {
              day: tempSelectedDate.getDate(),
              month: tempSelectedDate.getMonth() + 1,
              year: tempSelectedDate.getFullYear(),
            }
          : null,
      );
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

  const handleYearSelect = (year: number) => {
    setCurrentMonth((prev) => new Date(year, prev.getMonth(), 1));
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
        <CalendarBody
          yearRange={yearRange}
          currentMonth={currentMonth}
          monthNames={monthNames}
          weekDays={weekDays}
          calendarDays={calendarDays}
          variant={variant}
          tempSelectedDate={tempSelectedDate}
          tempSelectedPeriod={tempSelectedPeriod}
          isSameDay={isSameDay}
          isDayAvailable={isDayAvailable}
          handleDayClick={handleDayClick}
          goToPrevMonth={goToPrevMonth}
          goToNextMonth={goToNextMonth}
          onYearSelect={handleYearSelect}
        />
        {hintText && (
          <div className={styles.hint} data-testid="hint">
            {hintText}
          </div>
        )}
      </div>
    </BaseComponents.Modal>
  );
};
