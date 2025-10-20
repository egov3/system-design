import type { Dispatch, SetStateAction } from "react";

import { convertType } from "~utils/date/convertType";
import { isInvalidDateRange } from "~utils/date/range/isValidDateRange";
import { joinClasses } from "~utils/joinClasses";

import styles from "./CalendarHeader.module.css";
import React from "react";
import { Typography } from "../../Typography";
import {
  ICalendarPeriod,
  ICalendarTabs,
  TPeriodKeys,
} from "~interfaces/Calendar";
import { CalendarLang } from "../CalendarDictionary";
import { ILangGeneric } from "~interfaces/Lang";

interface IHeaderProps {
  setSelectedPeriodInterval: Dispatch<SetStateAction<TPeriodKeys>>;
  selectedPeriodInterval: TPeriodKeys;
  selectedCalenderDate: ICalendarPeriod<string>;
  tabs: ICalendarTabs[];
  lang: keyof ILangGeneric<string>;
}

export const Header = ({
  setSelectedPeriodInterval,
  selectedPeriodInterval,
  selectedCalenderDate,
  tabs,
  lang,
}: IHeaderProps) => (
  <div data-testid="CalendarTab_WRAP" className={styles.tab}>
    {tabs.map((tab) => (
      <button
        key={tab.key}
        data-testid={`CalendarTabButton_${tab.key.toUpperCase()}`}
        className={joinClasses(
          selectedPeriodInterval === tab.key ? styles.titleActiv : styles.title,
          isInvalidDateRange(
            convertType.dateRange.toNumber(selectedCalenderDate)
          )
            ? styles.titleError
            : undefined
        )}
        onClick={() => {
          setSelectedPeriodInterval(tab.key);
        }}
        aria-label={`${CalendarLang.header.buttonAriaLabel[lang]} ${tab.label}`}
      >
        <Typography
          data-testid={`CalendarTabTitle_${tab.key.toUpperCase()}`}
          tag="span"
          fontClass="body1Medium"
          aria-label={CalendarLang.main.calendarPeriodFrom[lang]}
        >
          {tab.label} ...*
        </Typography>
      </button>
    ))}
  </div>
);
