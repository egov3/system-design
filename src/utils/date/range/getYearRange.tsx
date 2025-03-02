// src/utils/range/getYearRange.tsx

import { GenerateArray } from "~utils/GenerateArray";
import { currentYear, minYear } from "..";

export const getYearRange = (year: number): string[] => {
  const start = Math.max(year - 2, minYear);
  const end = Math.min(year + 2, currentYear);

  return GenerateArray(end - start + 1, start).map(String);
};
