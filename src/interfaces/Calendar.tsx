export interface ISelectedPeriod {
  fromDate?: Date | null;
  toDate?: Date | null;
  periodSelected: boolean;
}

export type TCalendarMode = "default" | "period";

export interface IStrictSelectedPeriod
  extends Omit<ISelectedPeriod, "fromDate" | "toDate"> {
  fromDate: Date;
  toDate: Date;
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

export interface ICalendarDayCell {
  date: Date;
  day: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  isInRange: boolean;
  isDisabled: boolean;
}
