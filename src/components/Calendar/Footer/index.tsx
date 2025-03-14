import React, { Dispatch, SetStateAction } from "react";

import { joinClasses } from "~utils/joinClasses";
import { convertType } from "~utils/date/convertType";
import { isInvalidDateRange } from "~utils/date/range/isValidDateRange";

import styles from "./CalendarFooter.module.css";
import { ICalendarPeriod, IStrictSelectedPeriod } from "~interfaces/Calendar";
import { Components } from "~components";

export interface IFooterProps {
  selectedCalenderDate: ICalendarPeriod<string>;
  setSelectedPeriod: Dispatch<SetStateAction<IStrictSelectedPeriod>>;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  setSelectedRadioOption: Dispatch<SetStateAction<string>>;
}
export const Footer = ({
  selectedCalenderDate,
  setSelectedPeriod,
  setIsModalOpen,
  setSelectedRadioOption,
}: IFooterProps) => {
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

    setSelectedPeriod({
      fromDate: fromDate,
      toDate: toDate,
      periodSelected: true,
    });
  };
  return (
    <>
      {isInvalidDateRange(
        convertType.dateRange.toNumber(selectedCalenderDate)
      ) && (
        <Components.Typography
          className={joinClasses(styles.currentError, styles.textError)}
          data-testid="CalendarError_DISCRIPTION"
          tag="span"
          fontClass="Caption1Regular"
          aria-label="Вы ввели некорректную дату, измените данные"
        >
          Вы ввели некорректную дату, измените данные
        </Components.Typography>
      )}
      <Components.Button
        disabled={isInvalidDateRange(
          convertType.dateRange.toNumber(selectedCalenderDate)
        )}
        className={styles.save}
        size="large"
        onClick={updateDate}
      >
        Сохранить
      </Components.Button>
    </>
  );
};
