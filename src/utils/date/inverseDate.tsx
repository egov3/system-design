export const inverseDate = (dateStr: string): string => {
  const [year, month, day] = dateStr.split('-');
  return [day, month, year].join('.');
};
