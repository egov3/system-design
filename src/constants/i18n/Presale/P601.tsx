import type { ILangGeneric } from "~interfaces/common";
import type {
  IServiceDetailsItem,
  IServiceDetailsPassportItem,
} from "~interfaces/PresaleTemplate";
import { descriptions } from "./descriptions";
import { titles } from "./titles";

export const instructionsP601: ILangGeneric<string>[] = [
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
];

export const passportP601: IServiceDetailsPassportItem[] = [
  {
    title: titles.category,
    description: descriptions.socialSecurity,
    type: "text",
  },
  {
    title: titles.fullName,
    description: descriptions.fullname601,
    type: "text",
  },
  {
    title: titles.waitingTime,
    description: descriptions.waitingTimeShort,
    type: "text",
  },
  {
    title: titles.cost,
    description: descriptions.costFree,
    type: "text",
  },
  {
    title: titles.provider,
    description: descriptions.providerMLSPP,
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

export const detailsP601: IServiceDetailsItem[] = [
  {
    title: titles.category,
    description: descriptions.socialSecurity,
  },
  {
    title: titles.fullName,
    description: descriptions.fullname601,
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
    description: descriptions.providerMLSPP,
  },
];
