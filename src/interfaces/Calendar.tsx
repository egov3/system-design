export interface ISelectedPeriod {
  fromDate?: string;
  toDate?: string;
  periodSelected: boolean;
}

export interface IStrictSelectedPeriod
  extends Omit<ISelectedPeriod, "fromDate" | "toDate"> {
  fromDate: string;
  toDate: string;
}

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

export type TTimeUnit = keyof IDateItem;
