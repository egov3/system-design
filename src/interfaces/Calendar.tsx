export type TCalendarVariant = "default" | "period";

export interface IDateItem<T = number> {
  day: T;
  month: T;
  year: T;
}

export interface IPeriodKeys {
  from: "from";
  to: "to";
}

export type TPeriodKeys = keyof IPeriodKeys;

export interface ICalendarPeriod<T = number> {
  from: IDateItem<T>;
  to: IDateItem<T>;
}

export interface IPeriodTab {
  key: TPeriodKeys;
  label: string;
}
