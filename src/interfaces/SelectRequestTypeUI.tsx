import { Dispatch, SetStateAction } from "react";

import { ILangProps } from "./common";

export const requestType = {
  self: "self",
  thirdParty: "thirdParty",
} as const;

export type TRequestType = keyof typeof requestType;

export interface IRequestTypeOption {
  label: string;
  value: TRequestType;
}

export interface ISelectRequestTypeUIProps extends ILangProps {
  isOpenModal: boolean;
  isCloseModal: Dispatch<SetStateAction<boolean>>;
  isDisabledModalSelectBtn: boolean | undefined;
  selectedLabel?: string;
  pendingRequestType: TRequestType | null;
  requestTypeOptions: IRequestTypeOption[];
  handleClickSelectBox: () => void;
  onRequestTypeSelect: () => void;
  onRequestTypeChange: (value: string) => void;
}
