// src/utils/range/getDaysRange.tsx

import { IDateItem } from "~interfaces/Calendar";
import { getDaysInMonth } from "../getDaysInMonth";
import { GenerateArray } from "~utils/GenerateArray";

export const getDaysRange = ({ day, month, year }: IDateItem<number>) => {
  const start = Math.max(day - 2, 1);
  const end = Math.min(day + 2, getDaysInMonth(month, year));

  return GenerateArray(end - start + 1, start);
};
