import type { IServiceDetailsPassportItem } from "~interfaces/PresaleTemplate";
import { descriptions } from "./descriptions";
import { titles } from "./titles";

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
