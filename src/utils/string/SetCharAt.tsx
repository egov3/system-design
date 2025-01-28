export const SetCharAt = (str: string, index: number, chr: string) => {
  if (index === str.length) return str + chr;
  if (index > str.length - 1 || index < 0) return str;
  return str.substring(0, index) + chr + str.substring(index + 1);
};
