import type { IServiceDetailsPassportItem } from "~interfaces/PresaleTemplate";
import { descriptions } from "./descriptions";
import { titles } from "./titles";

export const passportP3061: IServiceDetailsPassportItem[] = [
  {
    title: titles.category,
    description: descriptions.categoryP3061,
    type: "text",
  },
  {
    title: titles.fullName,
    description: descriptions.fullname3061,
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
          en: "Egov mobile application",
        },
      },
    ],
    type: "list",
  },
  {
    title: titles.additionally,
    listItems: [
      {
        linkUrl: "https://zan.gov.kz/client/#!/doc/64902/rus/654",
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
