import Icons from "@egov3/icons";
import React, { Dispatch, SetStateAction } from "react";

import { combineClassNames } from "~utils/combineClassNames";
import { convertType } from "~utils/date/convertType";
import { getMonthNameProper } from "~utils/date/getMonthNameProper";
import { getDaysRange } from "~utils/date/range/getDaysRange";
import { getMonthRange } from "~utils/date/range/getMonthRange";
import { getYearRange } from "~utils/date/range/getYearRange";
import { isInvalidDateRange } from "~utils/date/range/isValidDateRange";
import { toPascalCase } from "~utils/string/toPascalCase";

import styles from "./CalendarBody.module.scss";
import {
  ICalendarPeriod,
  IDateItem,
  TPeriodKeys,
  TTimeUnit,
} from "~interfaces/Calendar";
import { Components } from "~components";

export interface IBodyProps {
  changeDate: IDateItem<(direction: number) => void>;
  handleMouseDown: (e: React.MouseEvent, type: TTimeUnit) => void;
  handleMouseUp: () => void;
  selectedCalenderDate: ICalendarPeriod<string>;
  selectedPeriodInterval: TPeriodKeys;
  setDistanceTraveled: Dispatch<SetStateAction<number>>;
  setInitialY: Dispatch<SetStateAction<number>>;
}

export const Body = ({
  changeDate,
  handleMouseDown,
  handleMouseUp,
  selectedCalenderDate,
  selectedPeriodInterval,
  setDistanceTraveled,
  setInitialY,
}: IBodyProps) => {
  const isEndOrStart: IDateItem<boolean> = {
    day:
      convertType["month"].toNumber(
        selectedCalenderDate[selectedPeriodInterval].month
      ) < 15,
    month:
      convertType["month"].toNumber(
        selectedCalenderDate[selectedPeriodInterval].month
      ) < 6,
    year:
      convertType["year"].toNumber(
        selectedCalenderDate[selectedPeriodInterval].year
      ) < 2020,
  };
  const unitTimeClassname = {
    day: (item: string) =>
      selectedCalenderDate[selectedPeriodInterval].day === item
        ? styles.currentText
        : styles.text,
    month: (item: string) =>
      item ===
      getMonthNameProper(
        convertType.month.toNumber(
          selectedCalenderDate[selectedPeriodInterval].month
        )
      )
        ? combineClassNames(styles.currentText, styles.currentMonth)
        : styles.text,
    year: (item: string) =>
      selectedCalenderDate[selectedPeriodInterval].year === item
        ? styles.currentText
        : styles.text,
  };

  const displayedYear = getYearRange(
    convertType.year.toNumber(selectedCalenderDate[selectedPeriodInterval].year)
  );
  const displayedMonth = getMonthRange(
    convertType.month.toNumber(
      selectedCalenderDate[selectedPeriodInterval].month
    ),
    convertType.year.toNumber(selectedCalenderDate[selectedPeriodInterval].year)
  ).map((monthIndex) => getMonthNameProper(monthIndex));
  const displayedDay = getDaysRange(
    convertType.date.toNumber(selectedCalenderDate[selectedPeriodInterval])
  ).map((item) => convertType.day.toString(item));

  const displayedDate: IDateItem<string[]> = {
    year: displayedYear,
    month: displayedMonth,
    day: displayedDay,
  };

  const handleWheel = (event: React.WheelEvent, type: TTimeUnit) => {
    const delta = event.deltaY;
    const distance = Math.abs(delta);
    const direction = delta > 0 ? 1 : -1;

    if (distance > 0) {
      changeDate[type](direction);

      setDistanceTraveled(distance);
      setInitialY(event.clientY);
    }
  };

  const arr: TTimeUnit[] = ["day", "month", "year"];
  return (
    <div data-testid="Calendar_COVER" className={styles.cover}>
      {arr.map((timeUnit) => (
        <div
          data-testid={`Calendar${toPascalCase(timeUnit)}_WRAPPER`}
          className={combineClassNames(
            styles.wrapper,
            `styles.wrapper${toPascalCase(timeUnit)}`
          )}
          key={timeUnit}
        >
          <button
            data-testid={`Calendar${toPascalCase(timeUnit)}Button_UP`}
            onClick={() => changeDate[timeUnit](-1)}
            aria-label="Кнопка вверх"
            className={styles.btnUpAndDown}
          >
            <Icons.Basic.СhevronUpSmall fill="#758393" />
          </button>
          <div
            data-testid={`Calendar${toPascalCase(timeUnit)}_SELECT`}
            className={combineClassNames(
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
                <Components.Typography
                  key={item}
                  data-testid={`Calendar${toPascalCase(timeUnit)}_ITEM`}
                  tag="span"
                  fontClass="Body1Regular"
                  aria-label={item}
                  className={combineClassNames(
                    unitTimeClassname[timeUnit](item),
                    isInvalidDateRange(
                      convertType.dateRange.toNumber(selectedCalenderDate)
                    )
                      ? styles.currentError
                      : undefined
                  )}
                >
                  {item}
                </Components.Typography>
              ))}
            </button>
          </div>
          <button
            data-testid={`Calendar${toPascalCase(timeUnit)}Button_DOWN`}
            onClick={() => {
              changeDate[timeUnit](1);
            }}
            aria-label="кнопка вниз"
            className={styles.btnUpAndDown}
          >
            <Icons.Basic.СhevronDownSmall fill="#758393" />
          </button>
        </div>
      ))}
    </div>
  );
};
