import { GenerateArray } from "~utils/GenerateArray";

export const getYearsRange = (startYear: number, endYear: number): string[] => {
  return GenerateArray(endYear - startYear + 1, startYear).map(String);
};
