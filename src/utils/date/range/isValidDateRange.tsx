import { ICalendarPeriod } from "~interfaces/Calendar";

export const isValidDateRange = ({ from, to }: ICalendarPeriod): boolean => {
  const fromDate = new Date(from.year, from.month - 1, from.day);
  const toDate = new Date(to.year, to.month - 1, to.day);

  return fromDate.getTime() <= toDate.getTime();
};

export const isInvalidDateRange = (props: ICalendarPeriod): boolean => {
  return !isValidDateRange(props);
};
