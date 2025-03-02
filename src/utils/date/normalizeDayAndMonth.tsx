import { IDateItem } from "~interfaces/Calendar";
import { currentDay, currentMonth, currentYear } from ".";
import { getDaysInMonth } from "./getDaysInMonth";

export const normalizeDayAndMonth = ({ day, month, year }: IDateItem) => {
  const lastDay = getDaysInMonth(month, year);
  let normalizedDay;
  if (day > lastDay) {
    normalizedDay = lastDay;
  } else {
    normalizedDay = day;
  }

  if (
    month === currentMonth &&
    year === currentYear &&
    normalizedDay > currentDay
  ) {
    normalizedDay = currentDay;
  }

  return normalizedDay;
};
