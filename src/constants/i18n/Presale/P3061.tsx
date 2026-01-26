import type { ILangGeneric } from "~interfaces/common";
import type { IServiceDetailsPassportItem } from "~interfaces/PresaleTemplate";
import { descriptions } from "./descriptions";
import { titles } from "./titles";

export const instructionsP3061: ILangGeneric<string>[] = [
  {
    ru: "Выберите, на кого желаете заказать справку",
    kk: "Анықтаманы кімге ресімдегіңіз келетінін таңдаңыз",
    en: "Select the person you want to request a certificate for",
  },
  {
    ru: "Выберите регион",
    kk: "Аймақты таңдаңыз",
    en: "Select a region",
  },
  {
    ru: "Ожидайте ответ от государственного органа",
    kk: "Мемлекеттік органнан жауап күтіңіз",
    en: "Wait for a response from the state body",
  },
  {
    ru: 'Статус по справке появится в разделе "Сообщения"',
    kk: "Анықтама бойынша күй “Хабарламалар” бөлімінде пайда болады",
    en: "The help status will appear in the Messages section",
  },
];

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
