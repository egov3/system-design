import type { IPassportDetailsItem } from "../components/Presale/PassportDetails";
import type { IServiceDetailsItem } from "../components/Presale/ServiceDetails";

export const accordion = {
  ru: "Акордеон",
  kk: "Акордеон",
  en: "Accordion",
};

export const steps = [
  { text: { ru: "Шаг 1", kk: "Қадам 1", en: "Step 1" } },
  { text: { ru: "Шаг 2", kk: "Қадам 2", en: "Step 2" } },
  { text: { ru: "Шаг 3", kk: "Қадам 3", en: "Step 3" } },
  { text: { ru: "Шаг 4", kk: "Қадам 4", en: "Step 4" } },
  { text: { ru: "Шаг 5", kk: "Қадам 5", en: "Step 5" } },
  { text: { ru: "Шаг 6", kk: "Қадам 6", en: "Step 6" } },
  { text: { ru: "Шаг 7", kk: "Қадам 7", en: "Step 7" } },
  { text: { ru: "Шаг 8", kk: "Қадам 8", en: "Step 8" } },
  { text: { ru: "Шаг 9", kk: "Қадам 9", en: "Step 9" } },
  { text: { ru: "Шаг 10", kk: "Қадам 10", en: "Step 10" } },
];

export const passportDetails: IPassportDetailsItem[] = [
  {
    title: {
      ru: "Заголовок 1",
      kk: "Тақырып 1",
      en: "Title 1",
    },
    description: {
      ru: "Подзаголовок 1",
      kk: "Тақырыпша 1",
      en: "Subtitle 1",
    },
    type: "text",
  },
  {
    title: {
      ru: "Заголовок 2",
      kk: "Тақырып 2",
      en: "Title 2",
    },
    listItems: [
      {
        linkUrl: "https://example.com/item1",
        text: {
          ru: "Ссылка",
          kk: "Сілтеме",
          en: "Link",
        },
      },
      {
        linkUrl: "",
        text: {
          ru: "Без ссылки",
          kk: "Сілтеме жоқ",
          en: "No link",
        },
      },
    ],
    type: "list",
  },
];

export const serviceDetails: IServiceDetailsItem[] = [
  {
    title: {
      ru: "Заголовок 1",
      kk: "Тақырып 1",
      en: "Title 1",
    },
    description: {
      ru: "Подзаголовок 1",
      kk: "Тақырыпша 1",
      en: "Subtitle 1",
    },
  },
  {
    title: {
      ru: "Заголовок 2",
      kk: "Тақырып 2",
      en: "Title 2",
    },
    description: {
      ru: "Подзаголовок 2",
      kk: "Тақырыпша 2",
      en: "Subtitle 2",
    },
  },
];
