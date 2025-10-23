// src/utils/range/getDaysRange.tsx

import type { IDateItem } from "~interfaces/Calendar";
import { GenerateArray } from "~utils/GenerateArray";
import { getDaysInMonth } from "../getDaysInMonth";

export const getDaysRange = ({ day, month, year }: IDateItem<number>) => {
  const start = Math.max(day - 2, 1);
  const end = Math.min(day + 2, getDaysInMonth(month, year));

  return GenerateArray(end - start + 1, start);
};
