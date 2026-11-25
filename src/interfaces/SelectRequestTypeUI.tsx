import { Dispatch, SetStateAction } from "react";

import { ILangProps } from "./common";
export interface IRequestTypeOption {
  label: string;
  value: string;
}

export interface ISelectRequestTypeUIProps extends ILangProps {
  isOpenModal: boolean;
  isCloseModal: Dispatch<SetStateAction<boolean>>;
  isDisabledModalSelectBtn: boolean | undefined;
  selectedLabel?: string;
  pendingRequestType: string | null;
  requestTypeOptions: IRequestTypeOption[];
  handleClickSelectBox: () => void;
  onRequestTypeSelect: () => void;
  onRequestTypeChange: (value: string) => void;
}
