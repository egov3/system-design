import type { ILangGeneric } from "~interfaces/common";
import type { TReleasedServices } from "~interfaces/PresaleTemplate";

export const servicesListNames: Record<
  TReleasedServices,
  ILangGeneric<string>
> = {
  P601: {
    ru: "Справка о пенсионных отчислениях",
    kk: "Зейнетақы аударымдары туралы анықтама",
    en: "Pension contributions statement",
  },
  P305: {
    ru: "Справка о правах на недвижимость (Форма-2)",
    kk: "Жылжымайтын мүлікке құқықтар туралы анықтама (2-нысан)",
    en: "Certificate of real estate rights (Form-2)",
  },
  P3061: {
    ru: "Справка о наличии недвижимости (Форма-6)",
    kk: "Жылжымайтын мүліктің болуы туралы анықтама (6-нысан)",
    en: "Certificate of real estate availability (Form-6)",
  },
  P2203: {
    ru: "Присвоение/упразднение адреса недвижимости",
    kk: "Жылжымайтын мүлік мекенжайын беру/жою",
    en: "Assignment/abolition of real estate address",
  },
  P608: {
    ru: "Справка об инвалидности",
    kk: "Мүгедектік туралы анықтама",
    en: "Disability certificate",
  },
};
