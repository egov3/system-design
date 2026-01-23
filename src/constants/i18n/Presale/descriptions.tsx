import type { ILangGeneric } from "~interfaces/common";

interface IDescriptions {
  categoryAlt: ILangGeneric<string>;
  citizenshipMigration: ILangGeneric<string>;
  costFree: ILangGeneric<string>;
  fullname305: ILangGeneric<string>;
  fullname4042: ILangGeneric<string>;
  fullname601: ILangGeneric<string>;
  fullname608: ILangGeneric<string>;
  providerMIA: ILangGeneric<string>;
  providerMLSPP: ILangGeneric<string>;
  providerMoJ: ILangGeneric<string>;
  realEstate: ILangGeneric<string>;
  socialSecurity: ILangGeneric<string>;
  waitingTime: ILangGeneric<string>;
  waitingTimeFull20: ILangGeneric<string>;
  waitingTimeFull30: ILangGeneric<string>;
  waitingTimeFull60: ILangGeneric<string>;
  waitingTimeShort: ILangGeneric<string>;
  buyingRentingEstate: ILangGeneric<string>;
  providerMIC: ILangGeneric<string>;
  processingTime: ILangGeneric<string>;
  addressAssignmentOrCancellation: ILangGeneric<string>;
  categoryP3061: ILangGeneric<string>;
  fullname3061: ILangGeneric<string>;
}

export const descriptions: IDescriptions = {
  processingTime: {
    ru: "Для столицы, городов республиканского и областного значения – 3 рабочих дня.\nДля районов – 5 рабочих дней",
    kk: "kkДля столицы, городов республиканского и областного значения – 3 рабочих дня.\nДля районов – 5 рабочих дней",
    en: "enДля столицы, городов республиканского и областного значения – 3 рабочих дня.\nДля районов – 5 рабочих дней",
  },
  providerMIC: {
    ru: "Министерство промышленности и строительства РК",
    kk: "kkМинистерство промышленности и строительства РК",
    en: "enМинистерство промышленности и строительства РК",
  },
  addressAssignmentOrCancellation: {
    ru: "Присвоение/упразднение адреса объектов недвижимости",
    kk: "kkПрисвоение/упразднение адреса объектов недвижимости",
    en: "enПрисвоение/упразднение адреса объектов недвижимости",
  },
  buyingRentingEstate: {
    ru: "Покупка и аренда недвижимости",
    kk: "kkПокупка и аренда недвижимости",
    en: "enПокупка и аренда недвижимости",
  },
  categoryAlt: {
    ru: "Покупка, продажа, аренда",
    kk: "Сатып алу, сату, жалға алу",
    en: "Purchase, sale, rent",
  },
  citizenshipMigration: {
    ru: "Гражданство, миграция и иммиграция",
    kk: "Азаматтық, көші-қон және иммиграция",
    en: "Citizenship, migration and immigration",
  },
  costFree: {
    ru: "Бесплатно",
    kk: "Тегін",
    en: "Free",
  },
  fullname305: {
    ru: "Предоставление сведений о зарегистрированных правах (обременениях) на недвижимое имущество и его технических характеристиках",
    kk: "Жылжымайтын мүлікке тіркелген құқықтар (ауыртпалықтар) және оның техникалық сипаттамалары туралы мәліметтерді ұсыну",
    en: "Provision of information on registered rights (encumbrances) to real estate and its technical characteristics",
  },
  fullname4042: {
    ru: "Снятие с регистрации по месту жительства населения Республики Казахстан",
    kk: "Қазақстан Республикасы халқын тұрғылықты жері бойынша тіркеуден шығару",
    en: "Deregistration of the population of the Republic of Kazakhstan at the place of residence",
  },
  fullname601: {
    ru: "Выдача информации о поступлении и движении средств вкладчика единого накопительного пенсионного фонда (без учета инвестиционного дохода)",
    kk: "Бірыңғай жинақтаушы зейнетақы қоры салымшысының қаражатының түсуі және қозғалысы туралы ақпарат беру (инвестициялық кірісті есепке алмағанда)",
    en: "Issuance of information on the receipt and movement of funds of the depositor of the unified accumulative pension fund (excluding investment income)",
  },
  fullname608: {
    ru: "Справка о подтверждении статуса инвалидности",
    kk: "Мүгедектік мәртебесін растау туралы анықтама",
    en: "Certificate of confirmation of disability status",
  },
  providerMIA: {
    ru: "Министерство внутренних дел РК",
    kk: "ҚР Ішкі істер министрлігі",
    en: "Ministry of Internal Affairs of the RK",
  },
  providerMLSPP: {
    ru: "Министерство труда и социальной защиты населения РК",
    kk: "ҚР Еңбек және халықты әлеуметтік қорғау министрлігі",
    en: "Ministry of Labor and Social Protection of the Population of the RK",
  },
  providerMoJ: {
    ru: "Министерство юстиции РК",
    kk: "ҚР Әділет министрлігі",
    en: "Ministry of Justice of the RK",
  },
  realEstate: {
    ru: "Недвижимость",
    kk: "Жылжымайтын мүлік",
    en: "Real estate",
  },
  socialSecurity: {
    ru: "Социальное обеспечение",
    kk: "Әлеуметтік қамсыздандыру",
    en: "Social Security",
  },
  waitingTime: {
    ru: "Физические лица",
    kk: "Жеке тұлғалар",
    en: "Individuals",
  },
  waitingTimeFull20: {
    ru: "В течение 20 минут при наличии данных в государственной информационной системе",
    kk: "Мемлекеттік ақпараттық жүйеде мәліметтер болған жағдайда 20 минут ішінде",
    en: "Within 20 minutes if information is available in the state information system",
  },
  waitingTimeFull30: {
    ru: "в течениe 30 минут",
    kk: "30 минут ішінде",
    en: "within 30 minutes",
  },
  waitingTimeShort: {
    ru: "20 минут",
    kk: "20 минут",
    en: "20 minutes",
  },
  waitingTimeFull60: {
    ru: "1 час",
    kk: "1 сағат",
    en: "1 hour",
  },
  categoryP3061: {
    ru: "Покупка и аренда недвижимости",
    kk: "Жылжымайтын мүлікті сатып алу және жалға беру",
    en: "Buying and renting real estate",
  },
  fullname3061: {
    ru: "Предоставление сведений об отсутствии (наличии) недвижимого имущества",
    kk: "Жылжымайтын мүліктің жоқ (бар) екендігі туралы мәліметтерді ұсыну",
    en: "Provision of information on the absence (availability) of immovable property",
  },
};
