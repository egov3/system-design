import {
  type Dispatch,
  type SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { BaseComponents } from "~baseComponents";
import { PERIOD_KEYS } from "~constants/calendar";
import { i18n } from "~constants/i18n";
import type {
  ICalendarPeriod,
  IDateItem,
  TCalendarVariant,
  TPeriodKeys,
} from "~interfaces/Calendar";
import type { ILangProps } from "~interfaces/common";
import { CalendarBody } from "./Body";
import styles from "./Calendar.module.css";
import {
  buildCalendarDays,
  createDefaultYearRange,
  dateFromDateItem,
  dateItemFromDate,
  isDateAvailable,
  isSameDay,
  updatePeriodByView,
} from "./helpers";
import { PeriodHeader } from "./PeriodHeader";

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
  const langDic = i18n.Calendar;
  const yearRange = useMemo(
    () => createDefaultYearRange(initialYearRange),
    [initialYearRange],
  );

  const [currentMonth, setCurrentMonth] = useState(() => {
    const defaultDate = dateFromDateItem(selectedDate);
    if (defaultDate) return defaultDate;

    const defaultPeriodFrom = dateFromDateItem(selectedPeriod?.from);
    if (defaultPeriodFrom) return defaultPeriodFrom;

    return new Date();
  });

  const [tempSelectedDate, setTempSelectedDate] = useState<Date | null>(null);
  const [tempSelectedPeriod, setTempSelectedPeriod] =
    useState<ICalendarPeriod<number> | null>(() => selectedPeriod ?? null);
  const [selectedPeriodView, setSelectedPeriodView] = useState<TPeriodKeys>(
    PERIOD_KEYS.from,
  );

  useEffect(() => {
    if (!isOpen) return;

    setTempSelectedDate(dateFromDateItem(selectedDate));
    setTempSelectedPeriod(selectedPeriod ?? null);
    setSelectedPeriodView(PERIOD_KEYS.from);
  }, [isOpen, selectedDate, selectedPeriod]);

  const goToPrevMonth = useCallback(() => {
    setCurrentMonth((prev) => {
      const newMonth = new Date(prev.getFullYear(), prev.getMonth() - 1, 1);
      if (newMonth.getFullYear() < yearRange.from.year) return prev;
      return newMonth;
    });
  }, [yearRange.from.year]);

  const goToNextMonth = useCallback(() => {
    setCurrentMonth((prev) => {
      const newMonth = new Date(prev.getFullYear(), prev.getMonth() + 1, 1);
      if (newMonth.getFullYear() > yearRange.to.year) return prev;
      return newMonth;
    });
  }, [yearRange.to.year]);

  const monthNames = langDic.MonthNames[lang];
  const weekDays = langDic.WeekDays[lang];

  const calendarDays = useMemo(
    () => buildCalendarDays(currentMonth),
    [currentMonth],
  );

  const isDayAvailable = useCallback(
    (date: Date): boolean =>
      isDateAvailable({ date, availableDays, isWeekdaysOnly }),
    [availableDays, isWeekdaysOnly],
  );

  const handleDayClick = useCallback(
    (date: Date) => {
      if (!isDayAvailable(date)) return;

      if (variant === "period") {
        setTempSelectedPeriod((prev) =>
          updatePeriodByView(prev, selectedPeriodView, date),
        );
      } else {
        setTempSelectedDate(date);
      }
    },
    [isDayAvailable, selectedPeriodView, variant],
  );

  const handleSave = useCallback(() => {
    if (variant === "period" && setSelectedPeriod) {
      setSelectedPeriod(tempSelectedPeriod);
    } else if (variant === "default" && setSelectedDate) {
      setSelectedDate(dateItemFromDate(tempSelectedDate));
    }
    setIsOpen(false);
  }, [
    setIsOpen,
    setSelectedDate,
    setSelectedPeriod,
    tempSelectedDate,
    tempSelectedPeriod,
    variant,
  ]);

  const handleYearSelect = useCallback((year: number) => {
    setCurrentMonth((prev) => new Date(year, prev.getMonth(), 1));
  }, []);

  return (
    <BaseComponents.Modal
      variant="small"
      lang={lang}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      header={{
        title: langDic.Title[lang],
        isClosable: true,
      }}
      footerButtons={[
        {
          text: langDic.SaveButton[lang],
          onClick: handleSave,
          dataTestid: "Calendar_SAVE_BTN",
        },
      ]}
    >
      <div className={styles.container} data-testid="Calendar_CONTAINER">
        {variant === "period" && (
          <PeriodHeader
            selectedPeriod={selectedPeriodView}
            setSelectedPeriod={setSelectedPeriodView}
            selectedPeriodValue={tempSelectedPeriod}
          />
        )}
        <CalendarBody
          yearRange={yearRange}
          currentMonth={currentMonth}
          monthNames={monthNames}
          weekDays={weekDays}
          calendarDays={calendarDays}
          variant={variant}
          tempSelectedDate={tempSelectedDate}
          tempSelectedPeriod={tempSelectedPeriod}
          selectedPeriodView={selectedPeriodView}
          isSameDay={isSameDay}
          isDayAvailable={isDayAvailable}
          onDayClick={handleDayClick}
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
