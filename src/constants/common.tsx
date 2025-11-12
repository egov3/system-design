import type { ILangGeneric } from "~interfaces/common";
import { i18n } from "./i18n";

type TLanguageListTuple = [keyof ILangGeneric<string>, string];

export const languageList = Object.entries(
  i18n.Common.Languages,
) as TLanguageListTuple[];
