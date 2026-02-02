import type { ILangGeneric } from "~interfaces/common";

export interface ITitles {
  passportBtnText: ILangGeneric<string>;
  informError: ILangGeneric<string>;
  informErrorBtn: ILangGeneric<string>;
}

export const titles: ITitles = {
  passportBtnText: {
    ru: "Подробный паспорт услуги",
    kk: "Қызметтің толық паспорты",
    en: "Detailed service passport",
  },
  informError: {
    ru: "Если вы нашли ошибки в деталях данной услуги, просим сообщить нам нажав на кнопку",
    kk: "Егер сіз осы қызметтің егжей-тегжейінде қате тапсаңыз, түймені басу арқылы бізге хабарлауыңызды сұраймыз",
    en: "If you find errors in the details of this service, please inform us by clicking the button",
  },
  informErrorBtn: {
    ru: "Сообщить об ошибке",
    kk: "Қате туралы хабарлау",
    en: "Report an error",
  },
};
