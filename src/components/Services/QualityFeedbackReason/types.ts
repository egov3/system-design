import type { ILangProps } from "~interfaces/common";

export interface IQualityFeedbackReasonProps extends ILangProps {
  cancelButtonText?: string;
  description?: string;
  initialComment?: string;
  onCancel: () => void;
  onSubmit: (comment: string) => void;
  submitButtonText?: string;
  title?: string;
}
