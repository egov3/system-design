import type { JSX } from "react";

import { InternetNotAvailableIllustration } from "@egov3/graphics/Illustrations/InternetNotAvailable";
import { VerificationIllustration } from "@egov3/graphics/Illustrations/Verification";

import type { IFooterButtonsItem } from "~baseComponents";
import type { ILangProps } from "~interfaces/common";

import { ScreenMessage } from "~components";
import { i18n } from "~constants/i18n";

export interface IErrorModalProps extends ILangProps {
  status?: number;
  message?: string;
  title?: string;
  illustration?: JSX.Element;
  isOpen: boolean;
  onClose: () => void;
  footerButtons?: IFooterButtonsItem[];
}

export const ErrorModal = ({
  status,
  message,
  title,
  illustration,
  lang,
  isOpen,
  onClose,
  footerButtons,
}: IErrorModalProps) => {
  const isAuthError = status === 401;
  const langDic = i18n.ErrorModal;
  const langDicMsg =
    message ?? (isAuthError ? langDic.NotAuthorizedMessage[lang] : "");

  return (
    <ScreenMessage
      illustration={
        illustration ??
        (isAuthError ? (
          <VerificationIllustration data-testid="ErrorModal_ICON_AUTH" />
        ) : (
          <InternetNotAvailableIllustration data-testid="ErrorModal_ICON_COMMON" />
        ))
      }
      title={title ?? langDic.Title[lang]}
      subtext={langDicMsg}
      lang={lang}
      isOpen={isOpen}
      onClose={onClose}
      footerButtons={footerButtons}
    />
  );
};
