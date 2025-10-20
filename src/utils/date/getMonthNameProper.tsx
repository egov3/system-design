import { currentYear } from ".";

const fallbackMonths: Record<string, string[]> = {
  kk: [
    "қаңтар",
    "ақпан",
    "наурыз",
    "сәуір",
    "мамыр",
    "маусым",
    "шілде",
    "тамыз",
    "қыркүйек",
    "қазан",
    "қараша",
    "желтоқсан",
  ],
};

export const getMonthNameProper = (
  month: number,
  lang: string = "ru"
): string => {
  const localeMap: Record<string, string> = {
    ru: "ru-RU",
    en: "en-US",
    kk: "kk",
  };

  const locale = localeMap[lang] || "ru-RU";
  const supportedLocales = Intl.DateTimeFormat.supportedLocalesOf([locale]);

  let monthName: string;

  if (supportedLocales.length > 0) {
    monthName = new Date(currentYear, month).toLocaleString(locale, {
      month: "long",
    });
  } else {
    monthName =
      fallbackMonths[lang]?.[month] ||
      new Date(currentYear, month).toLocaleString("ru-RU", {
        month: "long",
      });
  }

  return monthName.charAt(0).toUpperCase() + monthName.slice(1);
};
