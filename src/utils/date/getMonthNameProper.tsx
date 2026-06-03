import type { ILangProps } from "~interfaces/common";
import { currentYear } from ".";

const localeByLang: Record<ILangProps["lang"], string> = {
  ru: "ru-RU",
  kk: "kk-KZ",
  en: "en-US",
};

const monthNamesByLang: Partial<Record<ILangProps["lang"], string[]>> = {
  kk: [
    "Қаңтар",
    "Ақпан",
    "Наурыз",
    "Сәуір",
    "Мамыр",
    "Маусым",
    "Шілде",
    "Тамыз",
    "Қыркүйек",
    "Қазан",
    "Қараша",
    "Желтоқсан",
  ],
};

export const getMonthNameProper = (
  month: number,
  lang: ILangProps["lang"],
): string => {
  const translatedMonthName = monthNamesByLang[lang]?.[month];

  if (translatedMonthName) {
    return translatedMonthName;
  }

  const monthName = new Date(currentYear, month).toLocaleString(
    localeByLang[lang],
    {
      month: "long",
    },
  );
  return monthName.charAt(0).toUpperCase() + monthName.slice(1);
};
