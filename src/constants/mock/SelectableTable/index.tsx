import type { ISelectableTableColumn, ISelectableTableRow } from "~components";

export const SELECTABLE_TABLE_VACANCY_COLUMNS: ISelectableTableColumn[] = [
  { key: "organization", title: "Организация", width: 362 },
  { key: "salary", title: "Заработная плата (тенге)", width: 112 },
  { key: "educationLevel", title: "Уровень образования", width: 110 },
  { key: "workConditions", title: "Условия труда", width: 121 },
  { key: "openedAt", title: "Дата открытия", width: 108 },
  { key: "ageRequirement", title: "Требования к возрасту", width: 104 },
  { key: "workNature", title: "Постоянность", width: 165 },
];

export const SELECTABLE_TABLE_VACANCY_ROWS: ISelectableTableRow[] = [
  {
    id: "4021",
    values: {
      organization: "Общественный фонд «Право»",
      salary: "100 000",
      educationLevel: "Высшее",
      workConditions: "Нормальные",
      openedAt: "02.03.2026",
      ageRequirement: "От 18 лет",
      workNature: "Постоянная",
    },
  },
  {
    id: "4022",
    values: {
      organization: "Частный фонд «Коргау-Астана»",
      salary: "130 000",
      educationLevel: null,
      workConditions: null,
      openedAt: null,
      ageRequirement: null,
      workNature: null,
    },
  },
  {
    id: "4023",
    values: {
      organization: "ИП Юпитер",
      salary: "125 000",
      educationLevel: "Среднее",
      workConditions: "Нормальные",
      openedAt: "15.04.2026",
      ageRequirement: null,
      workNature: "Временная",
    },
  },
  {
    id: "4024",
    values: {
      organization: "Государственное учреждение «Аппарат акима города Астаны»",
      salary: "120 000",
      educationLevel: "Высшее",
      workConditions: "Нормальные",
      openedAt: "20.05.2026",
      ageRequirement: "До 35 лет",
      workNature: "Постоянная",
    },
  },
  {
    id: "4025",
    values: {
      organization: "Общественный фонд «СО-МАКЕ»(КО-МЕЙК)",
      salary: "110 000",
      educationLevel: "Высшее",
      workConditions: "Нормальные",
      openedAt: "01.06.2026",
      ageRequirement: null,
      workNature: "Сезонная",
    },
  },
  {
    id: "4026",
    values: {
      organization: "ТОО «Дала»",
      salary: "150 000",
      educationLevel: "Среднее",
      workConditions: "Нормальные",
      openedAt: "10.06.2026",
      ageRequirement: null,
      workNature: "Постоянная",
    },
  },
];

export const SELECTABLE_TABLE_LESSON_COLUMNS: ISelectableTableColumn[] = [
  { key: "organization", title: "Организация" },
  { key: "learnForm", title: "Форма обучения", width: 93 },
  { key: "learnLanguage", title: "Язык обучения", width: 93 },
  { key: "openedAt", title: "Дата открытия", width: 108 },
];

export const SELECTABLE_TABLE_LESSON_ROWS: ISelectableTableRow[] = [
  {
    id: "77",
    values: {
      organization: "Учебный центр «Кәсіп»",
      learnForm: "Очная",
      learnLanguage: null,
      openedAt: "02.03.2026",
    },
  },
  {
    id: "78",
    values: {
      organization: "Колледж сервиса и технологий",
      learnForm: "Очная",
      learnLanguage: "Русский",
      openedAt: "10.04.2026",
    },
  },
];
