import Icons from "@egov3/graphics";
import React from "react";


import { convertType } from "~utils/date/convertType";
import { isInvalidDateRange } from "~utils/date/range/isValidDateRange";
import { joinClasses } from "~utils/joinClasses";
import { toPascalCase } from "~utils/string/toPascalCase";

import styles from "./CalendarBody.module.css";
import { ICalendarPeriod, IDateItem, TTimeUnit } from "~interfaces/Calendar";
import { Typography } from "../../Typography";
import { CalendarLang } from "../CalendarDictionary";
import { ILangGeneric } from "~interfaces/Lang";

interface IBodyProps {
  changeDate: IDateItem<(direction: number) => void>;
  handleMouseDown: (e: React.MouseEvent, type: TTimeUnit) => void;
  handleMouseUp: () => void;
  selectedCalenderDate: ICalendarPeriod<string>;
  arr: (keyof IDateItem<number>)[];
  isEndOrStart: IDateItem<boolean>;
  displayedDate: IDateItem<string[]>;
  handleWheel: (event: React.WheelEvent, type: TTimeUnit) => void;
  unitTimeClassname: IDateItem<(item: string) => string>;
  lang: keyof ILangGeneric<string>;
}

export const Body = ({
  changeDate,
  handleMouseDown,
  handleMouseUp,
  selectedCalenderDate,
  arr,
  isEndOrStart,
  displayedDate,
  handleWheel,
  unitTimeClassname,
  lang,
}: IBodyProps) => (
  <div data-testid="Calendar_COVER" className={styles.cover}>
    {arr.map((timeUnit) => (
      <div
        data-testid={`Calendar${toPascalCase(timeUnit)}_WRAPPER`}
        className={styles.wrapper}
        key={timeUnit}
      >
        <button
          data-testid={`Calendar${toPascalCase(timeUnit)}Button_UP`}
          onClick={() => changeDate[timeUnit](-1)}
          aria-label={CalendarLang.body.chevronUpAriaLabel[lang]}
        >
          <Icons.Basic.ChevronUpSmall fill="#758393" />
        </button>
        <div
          data-testid={`Calendar${toPascalCase(timeUnit)}_SELECT`}
          className={joinClasses(
            styles.block,
            isEndOrStart[timeUnit] ? styles.end : styles.start
          )}
        >
          <button
            data-testid={`Calendar${toPascalCase(timeUnit)}_BUTTON`}
            onMouseDown={(e) => handleMouseDown(e, timeUnit)}
            onMouseUp={handleMouseUp}
            onWheel={(e) => handleWheel(e, timeUnit)}
            className={styles.btn}
          >
            {displayedDate[timeUnit].map((item) => (
              <Typography
                key={item}
                data-testid={`Calendar${toPascalCase(timeUnit)}_ITEM`}
                tag="span"
                fontClass="body1Regular"
                aria-label={item}
                className={joinClasses(
                  unitTimeClassname[timeUnit](item),
                  isInvalidDateRange(
                    convertType.dateRange.toNumber(selectedCalenderDate)
                  )
                    ? styles.currentError
                    : undefined
                )}
              >
                {item}
              </Typography>
            ))}
          </button>
        </div>
        <button
          data-testid={`Calendar${toPascalCase(timeUnit)}Button_DOWN`}
          onClick={() => {
            changeDate[timeUnit](1);
          }}
          aria-label={CalendarLang.body.chevronDownAriaLabel[lang]}
        >
          <Icons.Basic.ChevronDownSmall fill="#758393" />
        </button>
      </div>
    ))}
  </div>
);
