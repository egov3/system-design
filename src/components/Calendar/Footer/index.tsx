import { convertType } from "~utils/date/convertType";
import { isInvalidDateRange } from "~utils/date/range/isValidDateRange";
import { joinClasses } from "~utils/joinClasses";

import styles from "./CalendarFooter.module.css";
import React from "react";
import { ICalendarPeriod } from "~interfaces/Calendar";
import { ILangGeneric } from "~interfaces/Lang";
import { Typography } from "../../Typography";
import { Button } from "../../Button";
import { CalendarLang } from "../CalendarDictionary";

interface IFooterProps {
  selectedCalenderDate: ICalendarPeriod<string>;
  updateDate: () => void;
  lang: keyof ILangGeneric<string>;
}
export const Footer = ({ selectedCalenderDate, updateDate, lang }: IFooterProps) => {
  return (
    <>
      {isInvalidDateRange(
        convertType.dateRange.toNumber(selectedCalenderDate)
      ) && (
        <Typography
          className={joinClasses(styles.currentError, styles.textError)}
          data-testid="CalendarError_DESCRIPTION"
          tag="span"
          fontClass="caption1Regular"
          aria-label={CalendarLang.footer.calendarErrorDescription[lang]}
        >
          {CalendarLang.footer.calendarErrorDescription[lang]}
        </Typography>
      )}
      <Button
        dataTestid="CalendarSave_BUTTON"
        disabled={isInvalidDateRange(
          convertType.dateRange.toNumber(selectedCalenderDate)
        )}
        className={styles.save}
        size="large"
        onClick={updateDate}
        aria-label={CalendarLang.footer.calendarSave[lang]}
      >
        {CalendarLang.footer.calendarSave[lang]}
      </Button>
    </>
  );
};
