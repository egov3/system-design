import type { IServiceDetailsPassportItem } from "~interfaces/PresaleTemplate";
import { descriptions } from "./descriptions";
import { titles } from "./titles";

export const passportP2203: IServiceDetailsPassportItem[] = [
  {
    title: titles.category,
    description: descriptions.citizenshipMigration,
    type: "text",
  },
  {
    title: titles.fullName,
    description: descriptions.fullname4042,
    type: "text",
  },
  {
    title: titles.waitingTime,
    description: descriptions.waitingTimeFull30,
    type: "text",
  },
  {
    title: titles.cost,
    description: descriptions.costFree,
    type: "text",
  },
  {
    title: titles.provider,
    description: descriptions.providerMIA,
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
        text: {
          ru: "Территориальные органы полиции НАО",
          kk: "КеАҚ полициясының аумақтық органдары",
          en: "Territorial police bodies of the NJSC",
        },
      },
      {
        linkUrl: "https://gov4c.kz/contacts/adresa/",
        text: {
          ru: "НАО «Государственная корпорация «Правительство для граждан»",
          kk: "«Азаматтарға арналған үкімет» мемлекеттік корпорациясы» КеАҚ",
          en: "NJSC «State Corporation «Government for Citizens»",
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
        linkUrl: "#",
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
