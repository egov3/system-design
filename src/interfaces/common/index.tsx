export type TPageOwner = "customer" | "egov";

export interface ILangGeneric<T> {
  ru: T;
  kk: T;
  en: T;
}

export interface ILangProps {
  lang: keyof ILangGeneric<string>;
}

export interface IHTMLAttributesDataProps {
  [key: `data-${string}`]: string | undefined;
}
