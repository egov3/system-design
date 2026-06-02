import { useMemo, useState } from "react";
import { BaseComponents } from "~baseComponents";
import { PERIOD_KEYS } from "~constants/calendar";
import type { ISelectedPeriod, TPeriodKeys } from "~interfaces/Calendar";
import { convertType } from "~utils/date/convertType";
import { CalendarBody } from "./Body";
import styles from "./Calendar.module.css";
import { CalendarHeader } from "./Header";

const toDateString = (date: Date) =>
  `${convertType.day.toString(date.getDate())}.${convertType.month.toString(date.getMonth())}.${date.getFullYear()}`;
const toDate = (value?: string) => {
  if (!value) return null;
  const [day, month, year] = value.split(".").map(Number);
  return new Date(year, month - 1, day);
};

export const Calendar = () => {
  const [selectedPeriodInterval, setSelectedPeriodInterval] =
    useState<TPeriodKeys>(PERIOD_KEYS.from);
  const [selectedPeriod, setSelectedPeriod] = useState<ISelectedPeriod>({
    fromDate: "",
    toDate: "",
    periodSelected: false,
  });

  const rangeStart = toDate(selectedPeriod.fromDate);
  const rangeEnd = toDate(selectedPeriod.toDate);
  const visibleDate = useMemo(
    () =>
      (selectedPeriodInterval === PERIOD_KEYS.to ? rangeEnd : rangeStart) ??
      new Date(),
    [rangeEnd, rangeStart, selectedPeriodInterval],
  );

  const handleDayClick = (date: Date) => {
    setSelectedPeriod((current) => {
      const next = {
        ...current,
        [`${selectedPeriodInterval}Date`]: toDateString(date),
        isAllSelected: false,
      };
      return {
        ...next,
        periodSelected: Boolean(next.fromDate && next.toDate),
      };
    });
  };

  const handlePeriodChange = (periodKey: TPeriodKeys) => {
    setSelectedPeriodInterval(periodKey);
  };

  return (
    <BaseComponents.Modal
      variant="small"
      setIsOpen={() => {}}
      isOpen={true}
      lang="ru"
      header={{
        isClosable: true,
        title: "Выберите период",
      }}
      footerButtons={[
        {
          text: "Сохранить",
          onClick: () => {},
          isDisabled: !selectedPeriod.periodSelected,
        },
      ]}
    >
      <div className={styles.wrapper}>
        <CalendarHeader
          selectedPeriod={selectedPeriod}
          selectedPeriodInterval={selectedPeriodInterval}
          setSelectedPeriodInterval={handlePeriodChange}
        />
        <CalendarBody
          month={visibleDate.getMonth()}
          year={visibleDate.getFullYear()}
          selectedDate={
            selectedPeriodInterval === PERIOD_KEYS.from ? rangeStart : rangeEnd
          }
          selectedPeriodInterval={selectedPeriodInterval}
        rangeStart={rangeStart}
          rangeEnd={rangeEnd}
          onDayClick={handleDayClick}
        />
      </div>
    </BaseComponents.Modal>
  );
};
