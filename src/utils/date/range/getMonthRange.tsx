import { maxMonth, minMonth } from "..";
import { GenerateArray } from "~utils/GenerateArray";

export const getMonthRange = (month: number, year: number): number[] => {
  if (!Number.isInteger(month) || month < 0 || month > 11) {
    throw new Error(`Invalid month: ${month}`);
  }
  if (!Number.isInteger(year)) {
    throw new Error(`Invalid year: ${year}`);
  }

  const start = Math.max(month - 2, minMonth);
  const end = Math.min(month + 2, maxMonth);

  return GenerateArray(end - start + 1, start);
};
