import { IDateItem } from "~interfaces/Calendar";
import { currentMonth, currentYear } from ".";
import { normalizeDayAndMonth } from "./normalizeDayAndMonth";

export const getValideMonthAndDay = ({ day, month, year }: IDateItem) => {
  const normalizedMonth =
    currentYear === year && month > currentMonth ? currentMonth : month;
  const normalizedDay = normalizeDayAndMonth({
    day,
    month: normalizedMonth,
    year,
  });

  return {
    day: normalizedDay,
    month: normalizedMonth,
    year,
  };
};
