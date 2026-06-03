import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import { BaseComponents } from "~baseComponents";
import { PERIOD_KEYS } from "~constants/calendar";
import type {
  ISelectedPeriod,
  TCalendarMode,
  TPeriodKeys,
} from "~interfaces/Calendar";
import type { ILangProps } from "~interfaces/common";
import { convertType } from "~utils/date/convertType";
import { CalendarBody } from "./Body";
import styles from "./Calendar.module.css";
import { CalendarHeader } from "./Header";

const EMPTY_PERIOD: ISelectedPeriod = {
  fromDate: "",
  toDate: "",
  periodSelected: false,
};

const toDateString = (date: Date) =>
  `${convertType.day.toString(date.getDate())}.${convertType.month.toString(
    date.getMonth(),
  )}.${date.getFullYear()}`;

const toDate = (value?: string) => {
  if (!value) return null;

  const [day, month, year] = value.split(".").map(Number);
  return new Date(year, month - 1, day);
};

export interface ICalendarProps extends ILangProps {
  mode?: TCalendarMode;
  isOpen?: boolean;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
  title?: string;
  selectedDate?: Date | null;
  defaultSelectedDate?: Date | null;
  selectedPeriod?: ISelectedPeriod;
  defaultSelectedPeriod?: ISelectedPeriod;
  defaultPeriodInterval?: TPeriodKeys;
  onDateChange?: (date: Date | null) => void;
  onPeriodChange?: (period: ISelectedPeriod) => void;
  onSave?: (value: Date | null | ISelectedPeriod) => void;
}

export const Calendar = ({
  mode = "period",
  isOpen = true,
  setIsOpen,
  lang,
  title,
  selectedDate,
  defaultSelectedDate = null,
  selectedPeriod,
  defaultSelectedPeriod = EMPTY_PERIOD,
  defaultPeriodInterval = PERIOD_KEYS.from,
  onDateChange,
  onPeriodChange,
  onSave,
}: ICalendarProps) => {
  const [selectedPeriodInterval, setSelectedPeriodInterval] =
    useState<TPeriodKeys>(defaultPeriodInterval);

  const [innerSelectedDate, setInnerSelectedDate] = useState<Date | null>(
    defaultSelectedDate,
  );
  const [innerSelectedPeriod, setInnerSelectedPeriod] =
    useState<ISelectedPeriod>(defaultSelectedPeriod);

  const isPeriodMode = mode === "period";

  const actualSelectedDate = selectedDate ?? innerSelectedDate;
  const actualSelectedPeriod = selectedPeriod ?? innerSelectedPeriod;

  const rangeStart = toDate(actualSelectedPeriod.fromDate);
  const rangeEnd = toDate(actualSelectedPeriod.toDate);

  const activePeriodDate =
    selectedPeriodInterval === PERIOD_KEYS.from ? rangeStart : rangeEnd;

  const visibleDate = isPeriodMode
    ? (activePeriodDate ?? new Date())
    : (actualSelectedDate ?? new Date());

  const selectedCalendarDate = isPeriodMode
    ? activePeriodDate
    : actualSelectedDate;

  const modalTitle =
    title ?? (isPeriodMode ? "Выберите период" : "Выберите дату");

  const isSaveDisabled = isPeriodMode
    ? !actualSelectedPeriod.periodSelected
    : !actualSelectedDate;

  const handleDateChange = (date: Date) => {
    const nextDate =
      actualSelectedDate?.getTime() === date.getTime() ? null : date;

    if (selectedDate === undefined) {
      setInnerSelectedDate(nextDate);
    }

    onDateChange?.(nextDate);
  };

  const handlePeriodChange = (date: Date) => {
    const nextValue = toDateString(date);
    const key =
      selectedPeriodInterval === PERIOD_KEYS.from ? "fromDate" : "toDate";

    const nextPeriod = {
      ...actualSelectedPeriod,
      [key]: actualSelectedPeriod[key] === nextValue ? "" : nextValue,
    };

    nextPeriod.periodSelected = Boolean(
      nextPeriod.fromDate && nextPeriod.toDate,
    );

    if (selectedPeriod === undefined) {
      setInnerSelectedPeriod(nextPeriod);
    }

    onPeriodChange?.(nextPeriod);
  };

  const handleDayClick = (date: Date) => {
    if (isPeriodMode) {
      handlePeriodChange(date);
      return;
    }

    handleDateChange(date);
  };

  const handleSave = () => {
    onSave?.(isPeriodMode ? actualSelectedPeriod : actualSelectedDate);
  };

  return (
    <BaseComponents.Modal
      variant="small"
      setIsOpen={setIsOpen}
      isOpen={isOpen}
      lang={lang}
      header={{
        isClosable: true,
        title: modalTitle,
      }}
      footerButtons={[
        {
          text: "Сохранить",
          onClick: handleSave,
          isDisabled: isSaveDisabled,
        },
      ]}
    >
      <div className={styles.wrapper}>
        {isPeriodMode && (
          <CalendarHeader
            selectedPeriod={actualSelectedPeriod}
            selectedPeriodInterval={selectedPeriodInterval}
            setSelectedPeriodInterval={setSelectedPeriodInterval}
          />
        )}

        <CalendarBody
          month={visibleDate.getMonth()}
          year={visibleDate.getFullYear()}
          selectedDate={selectedCalendarDate}
          selectedPeriodInterval={selectedPeriodInterval}
          rangeStart={rangeStart}
          rangeEnd={rangeEnd}
          onDayClick={handleDayClick}
        />
      </div>
    </BaseComponents.Modal>
  );
};
