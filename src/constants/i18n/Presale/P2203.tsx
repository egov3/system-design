import type { ILangGeneric } from "~interfaces/common";
import type { IServiceDetailsPassportItem } from "~interfaces/PresaleTemplate";
import { descriptions } from "./descriptions";
import { titles } from "./titles";

export const instructionsP2203: ILangGeneric<string>[] = [
  {
    ru: "Выберите тип заявки",
    kk: "Өтініш түрін таңдаңыз",
    en: "Select the type of application",
  },
  {
    ru: "Выберите недвижимость и введите адрес присвоения/упразднения",
    kk: "Жылжымайтын мүлікті таңдап, мекенжайды беру/жою мекенжайын енгізіңіз",
    en: "Select the property and enter the assignment/cancellation address",
  },
  {
    ru: "Прикрепите необходимые документы и подпишите заявку",
    kk: "Қажетті құжаттарды тіркеп, өтінішке қол қойыңыз",
    en: "Attach the required documents and sign the application",
  },
  {
    ru: 'Если выбрана заявка на "Упразднение адреса", дополнительно проверьте решение о сносе',
    kk: 'Егер "Мекенжайды жою" өтініші таңдалса, бұзу туралы шешімді қосымша тексеріңіз',
    en: 'If "Address Cancellation" is selected, additionally check the demolition decision',
  },
  {
    ru: "Ожидайте ответ от госоргана",
    kk: "Мемлекеттік органның жауабын күтіңіз",
    en: "Wait for a response from the government agency",
  },
  {
    ru: 'Статус по заявке появится в разделе "Сообщения"',
    kk: 'Өтініштің мәртебесі "Хабарламалар" бөлімінде пайда болады',
    en: 'The application status will appear in the "Messages" section',
  },
];

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
