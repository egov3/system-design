import { currentYear } from ".";

export const getMonthNameProper = (month: number): string => {
  const monthName = new Date(currentYear, month).toLocaleString("ru-RU", {
    month: "long",
  });
  return monthName.charAt(0).toUpperCase() + monthName.slice(1);
};
