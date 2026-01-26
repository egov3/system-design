import type { ILangGeneric } from "~interfaces/common";

export interface ITitles {
  additionally: ILangGeneric<string>;
  category: ILangGeneric<string>;
  cost: ILangGeneric<string>;
  deliveryMethods: ILangGeneric<string>;
  fullName: ILangGeneric<string>;
  provider: ILangGeneric<string>;
  recipients: ILangGeneric<string>;
  waitingTime: ILangGeneric<string>;
  passportBtnText: ILangGeneric<string>;
  informError: ILangGeneric<string>;
  informErrorBtn: ILangGeneric<string>;
}

export const titles: ITitles = {
  category: {
    ru: "Категория",
    kk: "Санат",
    en: "Category",
  },
  fullName: {
    ru: "Полное название услуги",
    kk: "Қызметтің толық атауы",
    en: "Full service name",
  },
  waitingTime: {
    ru: "Время ожидания",
    kk: "Күту уақыты",
    en: "Waiting time",
  },
  cost: {
    ru: "Стоимость",
    kk: "Құны",
    en: "Cost",
  },
  provider: {
    ru: "Услуги оказывает",
    kk: "Қызметті көрсетеді",
    en: "Service provider",
  },
  recipients: {
    ru: "Получатели услуги",
    kk: "Қызметті алушылар",
    en: "Service recipients",
  },
  deliveryMethods: {
    ru: "Способы предоставления услуги",
    kk: "Қызметті көрсету тәсілдері",
    en: "Service delivery methods",
  },
  additionally: {
    ru: "Дополнительно",
    kk: "Қосымша",
    en: "Additionally",
  },
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
