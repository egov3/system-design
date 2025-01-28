export const CreateArray = (n: number): number[] =>
  Array.from({ length: n }, (_v, k) => k + 1);
