import { BaseComponents } from "./baseComponents/legacy";
import { Components } from "./components/legacy";

export * from "./baseComponents";
export { BaseComponents } from "./baseComponents/legacy";
export * from "./components";
export { Components } from "./components/legacy";
export type {
  ICalendarDayCell,
  ICalendarPeriod,
  IDateItem,
  IHTMLAttributesDataProps,
  ILangGeneric,
  ILangProps,
  INotificationData,
  IPeriodKeys,
  ISelectedPeriod,
  IStrictSelectedPeriod,
  TCalendarMode,
  TNotificationType,
  TPageOwner,
  TPeriodKeys,
  TTimeUnit,
} from "./interfaces";

const SystemDesign = {
  BaseComponents,
  Components,
};

export default SystemDesign;
