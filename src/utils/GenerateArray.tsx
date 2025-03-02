export const GenerateArray = (length: number, start: number = 1): number[] =>
  Array.from({ length }, (_, i) => start + i);
