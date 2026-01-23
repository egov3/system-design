import type { ILangGeneric, ILangProps } from "~interfaces/common";

export type TReleasedServices = "P305" | "P601" | "P2203" | "P608" | "P3061";

export interface IServiceDetailsProps extends ILangProps {
  serviceId: TReleasedServices;
}

export interface IListItem {
  linkUrl?: string;
  text: ILangGeneric<string>;
}

export interface IServiceDetailsPassportItem {
  title: ILangGeneric<string>;
  description?: ILangGeneric<string>;
  type: "text" | "list";
  listItems?: IListItem[];
}
