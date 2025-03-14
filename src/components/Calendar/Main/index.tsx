import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { PERIOD_KEYS } from "~constants/calendar/index";

import { convertType } from "~utils/date/convertType";
import { getValideMonthAndDay } from "~utils/date/getValideMonth";
import { isValidateDate } from "~utils/date/isValidateDate";
import { normalizeDayAndMonth } from "~utils/date/normalizeDayAndMonth";

import styles from "./Main.module.css";
import {
  ICalendarPeriod,
  IDateItem,
  IStrictSelectedPeriod,
  TPeriodKeys,
  TTimeUnit,
} from "~interfaces/Calendar";
import { Components } from "~components";

export interface IMainProps {
  setSelectedPeriod: Dispatch<SetStateAction<IStrictSelectedPeriod>>;
  selectedPeriod: IStrictSelectedPeriod;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  setSelectedRadioOption: Dispatch<SetStateAction<string>>;
}

export const Main = ({
  setSelectedPeriod,
  selectedPeriod,
  setIsModalOpen,
  setSelectedRadioOption,
}: IMainProps) => {
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
      month: selectedPeriod.fromDate.split("-")[1],
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
        convertType["day"].toNumber(
          selectedCalenderDate[selectedPeriodInterval].day
        ) + direction;

      const newDate = {
        day: newDay,
        month: convertType["month"].toNumber(
          selectedCalenderDate[selectedPeriodInterval].month
        ),
        year: convertType["year"].toNumber(
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
    [selectedCalenderDate, selectedPeriodInterval, setSelectedCalenderDate]
  );

  const changeMonth = useCallback(
    (direction: number) => {
      const newMonth =
        convertType["month"].toNumber(
          selectedCalenderDate[selectedPeriodInterval].month
        ) + direction;

      const normalizedDay = normalizeDayAndMonth({
        day: convertType["day"].toNumber(
          selectedCalenderDate[selectedPeriodInterval].day
        ),
        month: newMonth,
        year: convertType["year"].toNumber(
          selectedCalenderDate[selectedPeriodInterval].year
        ),
      });

      const newDate = {
        day: normalizedDay,
        month: newMonth,
        year: convertType["year"].toNumber(
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
    [selectedCalenderDate, selectedPeriodInterval, setSelectedCalenderDate]
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
    [selectedCalenderDate, selectedPeriodInterval, setSelectedCalenderDate]
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
    mouseDownActions[type] && mouseDownActions[type]();
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
    (e: MouseEvent, type: "day" | "month" | "year") => {
      if (isMouseOverStopButton(e)) {
        handleMouseUp();
        return;
      }

      const deltaY = e.clientY - initialY;

      if (!isMouseDown[type]) return;

      const distance = Math.abs(deltaY);

      if (distance > 5 && distance - distanceTraveled >= 5) {
        changeDate[type](deltaY > 0 ? -1 : 1);
        setDistanceTraveled(distance);
        setInitialY(e.clientY);
      }

      if (type === "year") {
        setIsMouseDown((prev) => ({ ...prev, year: true }));
      }
    },
    [changeDate, distanceTraveled, handleMouseUp, initialY, isMouseDown]
  );

  useEffect(() => {
    const onMouseMoveHandler = (e: MouseEvent) => {
      const timeUnits: TTimeUnit[] = ["day", "month", "year"];

      timeUnits.forEach((type) => {
        handleMouseMove(e, type);
      });
    };

    document.addEventListener("mousemove", onMouseMoveHandler);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", onMouseMoveHandler);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);
  return (
    <div data-testid="Calendar_MODAL" className={styles.modalBlock}>
      <Components.Calendar.Header
        selectedCalenderDate={selectedCalenderDate}
        selectedPeriodInterval={selectedPeriodInterval}
        setSelectedPeriodInterval={setSelectedPeriodInterval}
      />
      <Components.Calendar.Body
        changeDate={changeDate}
        handleMouseDown={handleMouseDown}
        handleMouseUp={handleMouseUp}
        selectedCalenderDate={selectedCalenderDate}
        selectedPeriodInterval={selectedPeriodInterval}
        setDistanceTraveled={setDistanceTraveled}
        setInitialY={setInitialY}
      />
      <Components.Calendar.Footer
        selectedCalenderDate={selectedCalenderDate}
        setIsModalOpen={setIsModalOpen}
        setSelectedPeriod={setSelectedPeriod}
        setSelectedRadioOption={setSelectedRadioOption}
      />
    </div>
  );
};
