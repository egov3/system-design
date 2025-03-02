import React, { Dispatch, SetStateAction } from "react";

import { PERIOD_KEYS } from "~constants/calendar";
import { combineClassNames } from "~utils/combineClassNames";
import { convertType } from "~utils/date/convertType";
import { isInvalidDateRange } from "~utils/date/range/isValidDateRange";

import styles from "./CalendarHeader.module.scss";
import { ICalendarPeriod, TPeriodKeys } from "~interfaces/Calendar";
import { Components } from "~components";

interface ICalendarTabs {
  key: TPeriodKeys;
  label: string;
  onClick: () => void;
}

export interface IHeaderProps {
  setSelectedPeriodInterval: Dispatch<SetStateAction<TPeriodKeys>>;
  selectedPeriodInterval: TPeriodKeys;
  selectedCalenderDate: ICalendarPeriod<string>;
}

export const Header = ({
  setSelectedPeriodInterval,
  selectedPeriodInterval,
  selectedCalenderDate,
}: IHeaderProps) => {
  const tabs: ICalendarTabs[] = [
    {
      key: PERIOD_KEYS.from,
      label: "Период с",
      onClick: () => {
        setSelectedPeriodInterval(PERIOD_KEYS.from);
      },
    },
    {
      key: PERIOD_KEYS.to,
      label: "Период до",
      onClick: () => {
        setSelectedPeriodInterval(PERIOD_KEYS.to);
      },
    },
  ];
  return (
    <div data-testid="CalendarTab_WRAP" className={styles.tab}>
      {tabs.map((tab) => (
        <button
          key={tab.key}
          data-testid={`CalendarTabButton_${tab.key.toUpperCase()}`}
          className={combineClassNames(
            selectedPeriodInterval === tab.key
              ? styles.titleActiv
              : styles.title,
            isInvalidDateRange(
              convertType.dateRange.toNumber(selectedCalenderDate)
            )
              ? styles.titleError
              : undefined
          )}
          onClick={() => {
            setSelectedPeriodInterval(tab.key);
          }}
          aria-label={`Кнопка ${tab.label}`}
        >
          <Components.Typography
            data-testid={`CalendarTabTitle_${tab.key.toUpperCase()}`}
            tag="span"
            fontClass="Body1Medium"
            aria-label="Период с"
          >
            {tab.label} ...*
          </Components.Typography>
        </button>
      ))}
    </div>
  );
};
