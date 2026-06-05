import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import { BaseComponents } from "~baseComponents";
import { PERIOD_KEYS } from "~constants/calendar";
import { i18n } from "~constants/i18n";
import type {
  ISelectedPeriod,
  TCalendarMode,
  TPeriodKeys,
} from "~interfaces/Calendar";
import type { ILangProps } from "~interfaces/common";
import {
  isCalendarDateAfter,
  normalizeCalendarDate,
  updateSelectedPeriod,
} from "~utils/calendar";
import { CalendarBody } from "./Body";
import styles from "./Calendar.module.css";
import { CalendarHeader } from "./Header";

const EMPTY_PERIOD: ISelectedPeriod = {
  fromDate: null,
  toDate: null,
  periodSelected: false,
};

const normalizeSelectedPeriod = (
  period: ISelectedPeriod = EMPTY_PERIOD,
): ISelectedPeriod => {
  const fromDate = normalizeCalendarDate(period.fromDate);
  const toDate = normalizeCalendarDate(period.toDate);

  return {
    ...period,
    fromDate,
    toDate,
    periodSelected: Boolean(fromDate && toDate),
  };
};

export interface ICalendarProps extends ILangProps {
  mode?: TCalendarMode;
  isOpen?: boolean;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
  title?: string;
  maxDate?: Date | null;
  selectedDate?: Date | null;
  selectedPeriod?: ISelectedPeriod;
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
  maxDate = null,
  selectedDate,
  selectedPeriod,
  defaultPeriodInterval = PERIOD_KEYS.from,
  onDateChange,
  onPeriodChange,
  onSave,
}: ICalendarProps) => {
  const langDic = i18n.Calendar;
  const isPeriodMode = mode === "period";
  const normalizedMaxDate = normalizeCalendarDate(maxDate);
  const normalizedSelectedDate = normalizeCalendarDate(selectedDate);
  const actualSelectedPeriod = normalizeSelectedPeriod(selectedPeriod);
  const [selectedPeriodInterval, setSelectedPeriodInterval] =
    useState<TPeriodKeys>(defaultPeriodInterval);

  const rangeStart = actualSelectedPeriod.fromDate ?? null;
  const rangeEnd = actualSelectedPeriod.toDate ?? null;

  let selectedCalendarDate = normalizedSelectedDate;

  if (isPeriodMode) {
    selectedCalendarDate =
      selectedPeriodInterval === PERIOD_KEYS.from ? rangeStart : rangeEnd;
  }

  const visibleDate = selectedCalendarDate ?? new Date();

  const defaultModalTitle = isPeriodMode
    ? langDic.SelectPeriodTitle[lang]
    : langDic.SelectDateTitle[lang];
  const modalTitle = title ?? defaultModalTitle;

  const isSaveDisabled = isPeriodMode
    ? !actualSelectedPeriod.periodSelected ||
      isCalendarDateAfter(rangeEnd, normalizedMaxDate)
    : !normalizedSelectedDate ||
      isCalendarDateAfter(normalizedSelectedDate, normalizedMaxDate);

  const handleDateChange = (date: Date) => {
    const nextDate =
      normalizedSelectedDate?.getTime() === date.getTime() ? null : date;

    onDateChange?.(nextDate);
  };

  const handlePeriodChange = (date: Date) => {
    const nextPeriod = updateSelectedPeriod(
      actualSelectedPeriod,
      selectedPeriodInterval,
      date,
    );

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
    onSave?.(isPeriodMode ? actualSelectedPeriod : normalizedSelectedDate);
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
          text: langDic.SaveButton[lang],
          onClick: handleSave,
          isDisabled: isSaveDisabled,
        },
      ]}
    >
      <div className={styles.wrapper}>
        {isPeriodMode && (
          <CalendarHeader
            lang={lang}
            selectedPeriod={actualSelectedPeriod}
            selectedPeriodInterval={selectedPeriodInterval}
            setSelectedPeriodInterval={setSelectedPeriodInterval}
          />
        )}

        <CalendarBody
          lang={lang}
          month={visibleDate.getMonth()}
          year={visibleDate.getFullYear()}
          selectedDate={selectedCalendarDate}
          selectedPeriodInterval={selectedPeriodInterval}
          rangeStart={rangeStart}
          rangeEnd={rangeEnd}
          maxDate={normalizedMaxDate}
          onDayClick={handleDayClick}
        />
      </div>
    </BaseComponents.Modal>
  );
};
