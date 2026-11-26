import { ILangProps } from "./common";
export interface IRequestTypeOption {
  label: string;
  value: string;
}

export interface ISelectRequestTypeUIProps extends ILangProps {
  isDisabledModalSelectBtn: boolean | undefined;
  selectedLabel: string | undefined;
  pendingRequestType: string | null;
  requestTypeOptions: IRequestTypeOption[];
  handleClickSelectBox: () => void;
  onRequestTypeSelect: () => void;
  onRequestTypeChange: (value: string) => void;
}
