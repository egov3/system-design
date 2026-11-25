import type { ILangGeneric } from "~interfaces/common";

import { i18n } from "./i18n";

type TLanguageListTuple = [keyof ILangGeneric<string>, string];

export const languageList = Object.entries(
  i18n.Common.Languages,
) as TLanguageListTuple[];

export const SECOND_MS = 1000;
export const MINUTE_SECONDS = 60;
