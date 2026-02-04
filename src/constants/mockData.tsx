import type {
  IServiceDetailsItem,
  IServiceDetailsPassportItem,
} from "~interfaces/PresaleTemplate";

export const accordion = {
  ru: "Акордеон",
  kk: "Акордеон",
  en: "Accordion",
};

export const steps = [
  { ru: "Шаг 1", kk: "Қадам 1", en: "Step 1" },
  { ru: "Шаг 2", kk: "Қадам 2", en: "Step 2" },
  { ru: "Шаг 3", kk: "Қадам 3", en: "Step 3" },
];

export const lists: IServiceDetailsPassportItem[] = [
  {
    title: {
      ru: "Заголовок",
      kk: "Тақырып",
      en: "Title",
    },
    description: {
      ru: "Подзаголовок",
      kk: "Тақырыпша",
      en: "Subtitle",
    },
    type: "text",
  },
  {
    title: {
      ru: "Заголовок",
      kk: "Тақырып",
      en: "Title",
    },
    listItems: [
      {
        linkUrl: "https://example.com/item1",
        text: {
          ru: "Ссылка 1",
          kk: "Сілтеме 1",
          en: "Link 1",
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

export const lists_2: IServiceDetailsItem[] = [
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
