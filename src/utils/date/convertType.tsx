import { ICalendarPeriod, IDateItem } from "~interfaces/Calendar";

const convert = {
  day: {
    toString: (num: number) => {
      return String(num).padStart(2, "0");
    },
    toNumber: (str: string) => {
      return +str;
    },
  },
  month: {
    toString: (num: number) => {
      return String(num + 1).padStart(2, "0");
    },
    toNumber: (str: string) => {
      return +str - 1;
    },
  },
  year: {
    toString: (num: number) => {
      return String(num);
    },
    toNumber: (str: string) => {
      return +str;
    },
  },
};
const convertDate = {
  toString: ({ day, month, year }: IDateItem<number>) => ({
    day: convert.day.toString(day),
    month: convert.month.toString(month),
    year: convert.year.toString(year),
  }),
  toNumber: ({ day, month, year }: IDateItem<string>) => ({
    day: convert.day.toNumber(day),
    month: convert.month.toNumber(month),
    year: convert.year.toNumber(year),
  }),
};
const convertDateRange = {
  toString: ({
    from: { day: fromday, month: fromMonth, year: fromYear },
    to: { day: toDay, month: toMonth, year: toYear },
  }: ICalendarPeriod<number>) => ({
    from: {
      day: convert.day.toString(fromday),
      month: convert.month.toString(fromMonth),
      year: convert.year.toString(fromYear),
    },
    to: {
      day: convert.day.toString(toDay),
      month: convert.month.toString(toMonth),
      year: convert.year.toString(toYear),
    },
  }),
  toNumber: ({
    from: { day: fromday, month: fromMonth, year: fromYear },
    to: { day: toDay, month: toMonth, year: toYear },
  }: ICalendarPeriod<string>) => ({
    from: {
      day: convert.day.toNumber(fromday),
      month: convert.month.toNumber(fromMonth),
      year: convert.year.toNumber(fromYear),
    },
    to: {
      day: convert.day.toNumber(toDay),
      month: convert.month.toNumber(toMonth),
      year: convert.year.toNumber(toYear),
    },
  }),
};

export const convertType = {
  date: convertDate,
  dateRange: convertDateRange,
  ...convert,
};
