import type { ILangGeneric } from "~interfaces/common";
import type {
  IServiceDetailsItem,
  IServiceDetailsPassportItem,
} from "~interfaces/PresaleTemplate";
import { descriptions } from "./descriptions";
import { titles } from "./titles";

export const instructionsP305: ILangGeneric<string>[] = [
  {
    ru: "Подайте заявку на получение справки о правах на недвижимость",
    kk: "Жылжымайтын мүлік құқықтары туралы анықтама алуға өтініш беріңіз",
    en: "Apply for a certificate of real estate rights",
  },
  {
    ru: "Ожидайте ответа от госоргана",
    kk: "Мемлекеттік органнан жауап күтіңіз",
    en: "Wait for a response from the state body",
  },
  {
    ru: "Статус по справке появится в разделе “Сообщения”",
    kk: "Анықтама бойынша күй “Хабарламалар” бөлімінде пайда болады",
    en: "The help status will appear in the Messages section",
  },
];

export const passportP305: IServiceDetailsPassportItem[] = [
  {
    title: titles.category,
    description: descriptions.realEstate,
    type: "text",
  },
  {
    title: titles.fullName,
    description: descriptions.fullname305,
    type: "text",
  },
  {
    title: titles.waitingTime,
    description: descriptions.waitingTimeFull20,
    type: "text",
  },
  {
    title: titles.cost,
    description: descriptions.costFree,
    type: "text",
  },
  {
    title: titles.provider,
    description: descriptions.providerMoJ,
    type: "text",
  },
  {
    title: titles.recipients,
    description: descriptions.waitingTime,
    type: "text",
  },
  {
    title: titles.deliveryMethods,
    listItems: [
      {
        linkUrl: "https://egov.kz/cms/ru/information/mobile/mobile_application",
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
  {
    title: titles.additionally,
    listItems: [
      {
        linkUrl: "https://zan.gov.kz/client/#!/doc/140840/rus/929",
        text: {
          ru: "Правила оказания государственной услуги",
          kk: "Мемлекеттік қызмет көрсету ережелері",
          en: "Rules for the provision of public services",
        },
      },
      {
        text: {
          ru: "Вы можете проверить документы",
          kk: "Сіз құжаттарды тексере аласыз",
          en: "You can check the documents",
        },
      },
    ],
    type: "list",
  },
];

export const detailsP305: IServiceDetailsItem[] = [
  {
    title: titles.category,
    description: descriptions.categoryAlt,
  },
  {
    title: titles.fullName,
    description: descriptions.fullname305,
  },
  {
    title: titles.waitingTime,
    description: descriptions.waitingTimeShort,
  },
  {
    title: titles.cost,
    description: descriptions.costFree,
  },
  {
    title: titles.provider,
    description: descriptions.providerMoJ,
  },
];
