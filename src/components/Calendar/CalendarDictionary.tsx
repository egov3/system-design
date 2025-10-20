import { ILangGeneric } from "~interfaces/Lang";

interface ICalendarLang {
  body: {
    chevronUpAriaLabel: ILangGeneric<string>;
    chevronDownAriaLabel: ILangGeneric<string>;
  };
  header: {
    buttonAriaLabel: ILangGeneric<string>;
  };
  main: {
    calendarPeriodFrom: ILangGeneric<string>;
    calendarPeriodTo: ILangGeneric<string>;
  };
  footer: {
    calendarErrorDescription: ILangGeneric<string>;
    calendarSave: ILangGeneric<string>;
  };
}

export const CalendarLang: ICalendarLang = {
  body: {
    chevronUpAriaLabel: {
      ru: "Кнопка вверх",
      kk: "Жоғары батырмасы",
      en: "Up button",
    },
    chevronDownAriaLabel: {
      ru: "Кнопка вниз",
      kk: "Төмен батырмасы",
      en: "Down button",
    },
  },
  header: {
    buttonAriaLabel: {
      ru: "Кнопка",
      kk: "Батырма",
      en: "Button",
    },
  },
  main: {
    calendarPeriodFrom: {
      ru: "Период с",
      kk: "Кезең басталуы",
      en: "Period from",
    },
    calendarPeriodTo: {
      ru: "Период до",
      kk: "Кезең аяқталуы",
      en: "Period to",
    },
  },
  footer: {
    calendarErrorDescription: {
      ru: "Вы ввели некорректную дату, измените данные",
      kk: "Жарамсыз күн енгіздіңіз, деректерді өзгертіңіз",
      en: "You entered an invalid date, please change the data",
    },
    calendarSave: {
      ru: "Сохранить",
      kk: "Сақтау",
      en: "Save",
    },
  },
};
