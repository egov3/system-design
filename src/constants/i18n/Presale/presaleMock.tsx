import type { ILangGeneric } from "~interfaces/common";
import type {
  IServiceDetailsItem,
  IServiceDetailsPassportItem,
} from "~interfaces/PresaleTemplate";

export const instructions: Record<string, ILangGeneric<string>[]> = {
  P601: [
    {
      ru: "Подайте заявку на получение справки о пенсионных отчислениях за выбранный вами период",
      kk: "Сіз таңдаған кезеңдегі зейнетақы жарналары туралы анықтама алуға өтінім беріңіз",
      en: "Apply for a certificate of pension contributions for the period you have chosen",
    },
    {
      ru: "Ожидайте ответа от госоргана",
      kk: "Мемлекеттік органнан жауап күтіңіз",
      en: "Wait for a response from the state body",
    },
    {
      ru: "Справка появится в личном кабинете",
      kk: "Анықтама жеке кабинетте пайда болады",
      en: "The certificate will appear in your personal account",
    },
  ],
};

export const passport: Record<string, IServiceDetailsPassportItem[]> = {
  P601: [
    {
      title: {
        ru: "Категория",
        kk: "Санат",
        en: "Category",
      },
      description: {
        ru: "Министерство промышленности и строительства РК",
        kk: "kkМинистерство промышленности и строительства РК",
        en: "enМинистерство промышленности и строительства РК",
      },
      listItems: [
        {
          text: {
            ru: "Мобильное приложение Egov",
            kk: "Egov мобильді қосымшасы",
            en: "Egov mobile application",
          },
        },
      ],
      type: "text",
    },
    {
      title: {
        ru: "Способы предоставления услуги",
        kk: "Қызметті көрсету тәсілдері",
        en: "Service delivery methods",
      },
      listItems: [
        {
          linkUrl:
            "https://egov.kz/cms/ru/information/mobile/mobile_application",
          text: {
            ru: "Мобильное приложение Egov",
            kk: "Egov мобильді қосымшасы",
            en: "Egov mobile application",
          },
        },
        {
          linkUrl: "https://pep-app-dev.egov.kz/",
          text: {
            ru: "Портал «электронного правительства»",
            kk: "«Электрондық үкімет» порталы",
            en: "E-government portal",
          },
        },
      ],
      type: "list",
    },
  ],
};

export const details: Record<string, IServiceDetailsItem[]> = {
  P601: [
    {
      title: {
        ru: "Категория",
        kk: "Санат",
        en: "Category",
      },
      description: {
        ru: "Социальное обеспечение",
        kk: "Әлеуметтік қамсыздандыру",
        en: "Social Security",
      },
    },
    {
      title: {
        ru: "Полное название услуги",
        kk: "Қызметтің толық атауы",
        en: "Full service name",
      },
      description: {
        ru: "Выдача информации о поступлении и движении средств вкладчика единого накопительного пенсионного фонда (без учета инвестиционного дохода)",
        kk: "Бірыңғай жинақтаушы зейнетақы қоры салымшысының қаражатының түсуі және қозғалысы туралы ақпарат беру (инвестициялық кірісті есепке алмағанда)",
        en: "Issuance of information on the receipt and movement of funds of the depositor of the unified accumulative pension fund (excluding investment income)",
      },
    },
  ],
};
