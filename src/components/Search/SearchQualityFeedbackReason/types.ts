import type { ILangProps } from "~interfaces/common";

export interface ISearchQualityFeedbackReasonProps extends ILangProps {
  initialComment?: string;
  onCancel: () => void;
  onSubmit: (comment: string) => void;
}
