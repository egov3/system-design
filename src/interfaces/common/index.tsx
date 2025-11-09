export type TPageOwner = "customer" | "egov";

export interface ILangGeneric<T> {
  ru: T;
  kk: T;
  en: T;
}

export interface ILangProps {
  lang: keyof ILangGeneric<string>;
}

export interface IRouterClosure {
  route: string;
  owner: string;
  pageOwner?: TPageOwner;
}

export interface IHTMLAttributesDataProps {
  [key: `data-${string}`]: string | undefined;
}
