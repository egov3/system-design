import type { ILangGeneric, ILangProps } from "~interfaces/common";

export interface IListItem {
  linkUrl?: string;
  text: ILangGeneric<string>;
}

export type IPassportDetailsItem =
  | {
      type: "text";
      title: ILangGeneric<string>;
      description: ILangGeneric<string>;
    }
  | {
      type: "list";
      title: ILangGeneric<string>;
      listItems: IListItem[];
    };

export interface IServiceDetailsItem {
  title: ILangGeneric<string>;
  description: ILangGeneric<string>;
}

export interface IServiceDetailsProps extends ILangProps {
  passportDetails: IPassportDetailsItem[];
  servicesDetails: IServiceDetailsItem[];
}

export interface IInstructionsProps extends ILangProps {
  instructions: ILangGeneric<string>[];
}
