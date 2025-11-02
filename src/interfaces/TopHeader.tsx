import type { ILangGeneric } from "./common";

const Languages: ILangGeneric<string> = {
  kk: "Қазақша",
  ru: "Русский",
  en: "English",
};

type TLanguageListTuple = [keyof ILangGeneric<string>, string];

export const languageList = Object.entries(Languages) as TLanguageListTuple[];
