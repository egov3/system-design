import { IDateItem } from "~interfaces/Calendar";
import { minYear } from ".";

export const isValidateDate = (date: IDateItem): boolean => {
  const { day, month, year } = date;

  if (year < minYear) return false;

  if (month < 0 || month > 11) return false;

  const dateObj = new Date(year, month, day);

  if (
    dateObj.getFullYear() !== year ||
    dateObj.getMonth() !== month ||
    dateObj.getDate() !== day
  ) {
    return false;
  }

  const today = new Date();
  const currentDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  return dateObj <= currentDate;
};

export const isInvalidateDate = (props: IDateItem): boolean => {
  return !isValidateDate(props);
};
