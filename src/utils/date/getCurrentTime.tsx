export const getCurrentTime = (date?: Date) => {
  const now = date ?? new Date();
  let hours: string = now.getHours().toString();
  let minutes: string = now.getMinutes().toString();

  hours = +hours < 10 ? `0${hours}` : hours;
  minutes = +minutes < 10 ? `0${minutes}` : minutes;

  return `${hours}:${minutes}`;
};
