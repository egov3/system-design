import type { JSX } from "react";
import type { ILangGeneric } from "~interfaces/common";

export type TCategoriesSecondLevelFl =
  | "citizenship"
  | "consularServices"
  | "customsAndTaxes"
  | "education"
  | "employment"
  | "estate"
  | "family"
  | "health"
  | "legalAssistance"
  | "logistics"
  | "militaryRegistration"
  | "socialWelfare";

type TCategoriesThirdLevelFl =
  | "citizenship.abroad"
  | "citizenship.foreigner"
  | "citizenship.id"
  | "citizenship.registration"
  | "citizenship.tourism"
  | "customsAndTaxes.customs"
  | "customsAndTaxes.finance"
  | "customsAndTaxes.taxes"
  | "education.college"
  | "education.kindergarten"
  | "education.postgraduate"
  | "education.school"
  | "education.university"
  | "employment.employment"
  | "employment.gov"
  | "employment.laborIssues"
  | "employment.sport"
  | "estate.apartment"
  | "estate.buyRent"
  | "estate.comunal"
  | "estate.issues"
  | "family.children"
  | "family.help"
  | "family.status"
  | "health.certificate"
  | "health.help"
  | "health.pharmacy"
  | "legalAssistance.archive"
  | "legalAssistance.rights"
  | "legalAssistance.sud"
  | "logistics.air"
  | "logistics.auto"
  | "logistics.communication"
  | "logistics.rail"
  | "logistics.ruralAndWater"
  | "militaryRegistration.education"
  | "militaryRegistration.law"
  | "militaryRegistration.service"
  | "socialWelfare.family"
  | "socialWelfare.invalid"
  | "socialWelfare.pension"
  | "socialWelfare.pensionFund"
  | "socialWelfare.unemployedAndRurals";

export type TCategoriesSecondLevelUl =
  | "agriculture"
  | "culture"
  | "development"
  | "ecology"
  | "estate"
  | "finance"
  | "licence"
  | "medicine"
  | "property"
  | "registry"
  | "tax"
  | "transport";

type TCategoriesThirdLevelUl =
  | "agriculture.agriculture"
  | "agriculture.animalHusbandry"
  | "agriculture.veterinary"
  | "culture.culture"
  | "culture.media"
  | "culture.religion"
  | "development.gov"
  | "development.info"
  | "development.regAndClose"
  | "development.reports"
  | "ecology.ecology"
  | "ecology.huntingForestry"
  | "ecology.nature"
  | "estate.build"
  | "estate.ownership"
  | "estate.relations"
  | "estate.rent"
  | "finance.bank"
  | "finance.insurance"
  | "licence.certificates"
  | "licence.licence"
  | "licence.permissions"
  | "medicine.licence"
  | "medicine.pharmaceuticals"
  | "medicine.sanitary"
  | "property.copyright"
  | "property.industrial"
  | "property.trademark"
  | "registry.audit"
  | "registry.registry"
  | "registry.requirments"
  | "registry.selfRegulatory"
  | "registry.social"
  | "registry.software"
  | "tax.reports"
  | "tax.tax"
  | "transport.aviation"
  | "transport.communications"
  | "transport.ground"
  | "transport.water";

export type TSubmenuNavFlKey =
  | TCategoriesSecondLevelFl
  | TCategoriesThirdLevelFl;

export type TSubmenuNavUlKey =
  | TCategoriesSecondLevelUl
  | TCategoriesThirdLevelUl;

export interface ICategoryName {
  name: ILangGeneric<string>;
}

export interface ICategoryIcon {
  icon: JSX.Element;
}

export interface ICategoryUnion extends ICategoryIcon, ICategoryName {}
