import type { ILangGeneric } from "~interfaces/common";
import type {
  IServiceDetailsItem,
  IServiceDetailsPassportItem,
} from "~interfaces/PresaleTemplate";
import { descriptions } from "./descriptions";
import { titles } from "./titles";

export const instructionsP608: ILangGeneric<string>[] = [
  {
    ru: "Выберите на кого желаете получить сведения",
    kk: "Кімге ақпарат алғыңыз келетінін таңдаңыз",
    en: "Choose who you want to get information about",
  },
  {
    ru: "Подпишите заявку",
    kk: "Өтінімге қол қойыңыз",
    en: "Sign the application",
  },
  {
    ru: "Ожидайте ответ от госоргана",
    kk: "Мемлекеттік органнан жауап күтіңіз",
    en: "Expect a response from the government agency",
  },
  {
    ru: "Ознакомьтесь с полученным ответом",
    kk: "Алынған жауапты тексеріңіз",
    en: "Check out the response you received",
  },
];

export const passportP608: IServiceDetailsPassportItem[] = [
  {
    title: titles.category,
    description: descriptions.socialSecurity,
    type: "text",
  },
  {
    title: titles.fullName,
    description: descriptions.fullname608,
    type: "text",
  },
  {
    title: titles.waitingTime,
    description: descriptions.waitingTimeFull60,
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
        linkUrl: "/",
        text: {
          ru: "Портал «электронного правительства»",
          kk: "«Электрондық үкімет» порталы",
          en: "E-government portal",
        },
      },
      {
        linkUrl: "",
        text: {
          ru: "Мобильное приложение Egov",
          kk: "Egov мобильді қосымшасы",
          en: "Egov Mobile App",
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

export const detailsP608: IServiceDetailsItem[] = [
  {
    title: titles.category,
    description: descriptions.socialSecurity,
  },
  {
    title: titles.fullName,
    description: descriptions.fullname608,
  },
  {
    title: titles.waitingTime,
    description: descriptions.waitingTimeFull60,
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
