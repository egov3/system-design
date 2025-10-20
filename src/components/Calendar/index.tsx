import { PERIOD_KEYS } from "~constants/calendar/index";
import { convertType } from "~utils/date/convertType";
import { getMonthNameProper } from "~utils/date/getMonthNameProper";
import { getValideMonthAndDay } from "~utils/date/getValideMonth";
import { isValidateDate } from "~utils/date/isValidateDate";
import { normalizeDayAndMonth } from "~utils/date/normalizeDayAndMonth";
import { getDaysRange } from "~utils/date/range/getDaysRange";
import { getMonthRange } from "~utils/date/range/getMonthRange";
import { getYearRange } from "~utils/date/range/getYearRange";
import { joinClasses } from "~utils/joinClasses";

import { Body } from "./Body";
import styles from "./Calendar.module.css";
import { Footer } from "./Footer";
import { Header } from "./Header";
import {
  ICalendarPeriod,
  ICalendarTabs,
  IDateItem,
  IStrictSelectedPeriod,
  TPeriodKeys,
  TTimeUnit,
} from "~interfaces/Calendar";
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ILangGeneric } from "~interfaces/Lang";
import { CalendarLang } from "./CalendarDictionary";

export interface ICalendarProps {
  setSelectedPeriod: (data: IStrictSelectedPeriod) => void;
  selectedPeriod: IStrictSelectedPeriod;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  setSelectedRadioOption: Dispatch<SetStateAction<string>>;
  lang: keyof ILangGeneric<string>;
}

export const Calendar = ({
  setSelectedPeriod,
  selectedPeriod,
  setIsModalOpen,
  setSelectedRadioOption,
  lang,
}: ICalendarProps) => {
  const [selectedCalenderDate, setSelectedCalenderDate] = useState<
    ICalendarPeriod<string>
  >({
    from: {
      day: selectedPeriod.fromDate.split("-")[2],
      month: selectedPeriod.fromDate.split("-")[1],
      year: selectedPeriod.fromDate.split("-")[0],
    },
    to: {
      day: selectedPeriod.toDate.split("-")[2],
      month: selectedPeriod.toDate.split("-")[1],
      year: selectedPeriod.toDate.split("-")[0],
    },
  });
  const [selectedPeriodInterval, setSelectedPeriodInterval] =
    useState<TPeriodKeys>(PERIOD_KEYS.from);

  const [isMouseDown, setIsMouseDown] = useState<IDateItem<boolean>>({
    day: false,
    month: false,
    year: false,
  });
  const [initialY, setInitialY] = useState(0);
  const [distanceTraveled, setDistanceTraveled] = useState(0);

  const changeDay = useCallback(
    (direction: number) => {
      const newDay =
        convertType.day.toNumber(
          selectedCalenderDate[selectedPeriodInterval].day
        ) + direction;

      const newDate = {
        day: newDay,
        month: convertType.month.toNumber(
          selectedCalenderDate[selectedPeriodInterval].month
        ),
        year: convertType.year.toNumber(
          selectedCalenderDate[selectedPeriodInterval].year
        ),
      };
      if (isValidateDate(newDate)) {
        setSelectedCalenderDate({
          ...selectedCalenderDate,
          [selectedPeriodInterval]: convertType.date.toString(newDate),
        });
      }
    },
    [selectedCalenderDate, selectedPeriodInterval]
  );

  const changeMonth = useCallback(
    (direction: number) => {
      const newMonth =
        convertType.month.toNumber(
          selectedCalenderDate[selectedPeriodInterval].month
        ) + direction;

      const normalizedDay = normalizeDayAndMonth({
        day: convertType.day.toNumber(
          selectedCalenderDate[selectedPeriodInterval].day
        ),
        month: newMonth,
        year: convertType.year.toNumber(
          selectedCalenderDate[selectedPeriodInterval].year
        ),
      });

      const newDate = {
        day: normalizedDay,
        month: newMonth,
        year: convertType.year.toNumber(
          selectedCalenderDate[selectedPeriodInterval].year
        ),
      };
      if (isValidateDate(newDate)) {
        setSelectedCalenderDate({
          ...selectedCalenderDate,
          [selectedPeriodInterval]: convertType.date.toString(newDate),
        });
      }
    },
    [selectedCalenderDate, selectedPeriodInterval]
  );

  const changeYear = useCallback(
    (direction: number) => {
      const newYear =
        convertType.year.toNumber(
          selectedCalenderDate[selectedPeriodInterval].year
        ) + direction;

      const newDate = getValideMonthAndDay(
        convertType.date.toNumber({
          day: selectedCalenderDate[selectedPeriodInterval].day,
          month: selectedCalenderDate[selectedPeriodInterval].month,
          year: convertType.year.toString(newYear),
        })
      );

      if (isValidateDate(newDate)) {
        setSelectedCalenderDate({
          ...selectedCalenderDate,
          [selectedPeriodInterval]: convertType.date.toString(newDate),
        });
      }
    },
    [selectedCalenderDate, selectedPeriodInterval]
  );

  const changeDate = useMemo(
    () => ({
      day: changeDay,
      month: changeMonth,
      year: changeYear,
    }),
    [changeDay, changeMonth, changeYear]
  );

  const handleMouseDown = (e: React.MouseEvent, type: TTimeUnit) => {
    const mouseDownActions: { [key in TTimeUnit]: () => void } = {
      day: () => setIsMouseDown((prev) => ({ ...prev, day: true })),
      month: () => setIsMouseDown((prev) => ({ ...prev, month: true })),
      year: () => setIsMouseDown((prev) => ({ ...prev, year: true })),
    };
    if (mouseDownActions[type]) {
      mouseDownActions[type]();
    }
    setInitialY(e.clientY);
    setDistanceTraveled(0);
  };

  const isMouseOverStopButton = (e: MouseEvent) => {
    const button = document.querySelector("[aria-disabled=true]");
    if (!button) return false;
    const rect = button.getBoundingClientRect();
    return (
      e.clientX >= rect.left &&
      e.clientX <= rect.right &&
      e.clientY >= rect.top &&
      e.clientY <= rect.bottom
    );
  };

  const handleMouseUp = useCallback(() => {
    setIsMouseDown({
      day: false,
      month: false,
      year: false,
    });
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isMouseOverStopButton(e)) {
        handleMouseUp();
        return;
      }

      const deltaY = e.clientY - initialY;

      const activeTypes = (["day", "month", "year"] as TTimeUnit[]).filter(
        (type) => isMouseDown[type]
      );

      if (activeTypes.length === 0) return;

      const distance = Math.abs(deltaY);

      if (distance > 5 && distance - distanceTraveled >= 5) {
        activeTypes.forEach((type) => {
          changeDate[type](deltaY > 0 ? -1 : 1);
        });
        setDistanceTraveled(distance);
        setInitialY(e.clientY);
      }
    },
    [
      changeDate,
      distanceTraveled,
      handleMouseUp,
      initialY,
      isMouseDown,
      isMouseOverStopButton,
    ]
  );

  const isEndOrStart: IDateItem<boolean> = {
    day:
      convertType.day.toNumber(
        selectedCalenderDate[selectedPeriodInterval].day
      ) < 15,
    month:
      convertType.month.toNumber(
        selectedCalenderDate[selectedPeriodInterval].month
      ) < 6,
    year:
      convertType.year.toNumber(
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
        ),
        lang
      )
        ? joinClasses(styles.currentText, styles.currentMonth)
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
  ).map((monthIndex) => getMonthNameProper(monthIndex, lang));
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

  useEffect(() => {
    const onMouseMoveHandler = (e: MouseEvent) => {
      handleMouseMove(e); 
    };

    document.addEventListener("mousemove", onMouseMoveHandler);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", onMouseMoveHandler);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  const updateDate = () => {
    setIsModalOpen(false);
    setSelectedRadioOption("custom");
    const fromDate = [
      selectedCalenderDate.from.year,
      selectedCalenderDate.from.month,
      selectedCalenderDate.from.day,
    ].join("-");
    const toDate = [
      selectedCalenderDate.to.year,
      selectedCalenderDate.to.month,
      selectedCalenderDate.to.day,
    ].join("-");

    console.log("Date: ", { fromDate: fromDate, toDate: toDate });

    setSelectedPeriod({
      fromDate: fromDate,
      toDate: toDate,
      allTime: false,
    });
  };

  const tabs: ICalendarTabs[] = [
    {
      key: PERIOD_KEYS.from,
      label: CalendarLang.main.calendarPeriodFrom[lang],
      onClick: () => {
        setSelectedPeriodInterval(PERIOD_KEYS.from);
      },
    },
    {
      key: PERIOD_KEYS.to,
      label: CalendarLang.main.calendarPeriodTo[lang],
      onClick: () => {
        setSelectedPeriodInterval(PERIOD_KEYS.to);
      },
    },
  ];
  return (
    <div data-testid="Calendar_MODAL" className={styles.modalBlock}>
      <Header
        selectedCalenderDate={selectedCalenderDate}
        selectedPeriodInterval={selectedPeriodInterval}
        setSelectedPeriodInterval={setSelectedPeriodInterval}
        tabs={tabs}
        lang={lang}
      />
      <Body
        changeDate={changeDate}
        handleMouseDown={handleMouseDown}
        handleMouseUp={handleMouseUp}
        selectedCalenderDate={selectedCalenderDate}
        arr={arr}
        isEndOrStart={isEndOrStart}
        displayedDate={displayedDate}
        handleWheel={handleWheel}
        unitTimeClassname={unitTimeClassname}
        lang={lang}
      />
      <Footer
        selectedCalenderDate={selectedCalenderDate}
        updateDate={updateDate}
        lang={lang}
      />
    </div>
  );
};
