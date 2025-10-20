export interface ILangGeneric<T> {
  ru: T;
  kk: T;
  en: T;
}

export interface ILangProps {
  lang: keyof ILangGeneric<string>;
}
