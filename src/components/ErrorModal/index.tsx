import { Graphics, Icons } from "@egov3/graphics";
import { BaseComponents } from "~baseComponents";
import { i18n } from "~constants/i18n";
import type { ILangProps } from "~interfaces/common";
import styles from "./ErrorModal.module.css";

export interface IErrorModalProps extends ILangProps {
  status?: number;
  message?: string;
  open: boolean;
  onClose: () => void;
  onAuthAction?: () => void;
}

export const ErrorModal = ({
  status,
  message,
  lang,
  open,
  onClose,
  onAuthAction,
}: IErrorModalProps) => {
  const isAuthError = status === 401;
  const langDic = i18n.ErrorModal;
  const langDicMsg =
    message ?? (isAuthError ? langDic.NotAuthorizedMessage[lang] : "");

  return (
    <BaseComponents.Modal
      open={open}
      setOpen={onClose}
      variant="small"
      lang={lang}
    >
      <div className={styles.wrapper} data-testid="ErrorModal_WRAPPER">
        <div className={styles.headerWrapper} data-testid="ErrorModal_HEADER">
          <span className={styles.iconEgov} data-testid="ErrorModal_LOGO">
            <Icons.Logo.Egov width="70px" height="24px" viewBox="0 0 70 24" />
          </span>
          <button
            type="button"
            onClick={onClose}
            className={styles.actionButton}
            data-testid="ErrorModal_CLOSE_BTN"
            aria-label={langDic.CloseModalButton[lang]}
          >
            <Icons.General.Close width="16px" height="16px" />
          </button>
        </div>
        <div className={styles.bodyWrapper} data-testid="ErrorModal_BODY">
          {isAuthError ? (
            <Graphics.Illustrations.Verification data-testid="ErrorModal_ICON_AUTH" />
          ) : (
            <Graphics.Illustrations.InternetNotAvailable data-testid="ErrorModal_ICON_COMMON" />
          )}

          <BaseComponents.Typography
            tag="span"
            fontClass="heading3"
            data-testid="ErrorModal_TITLE"
            aria-label={langDic.Title[lang]}
          >
            {langDic.Title[lang]}
          </BaseComponents.Typography>

          {langDicMsg.length > 0 && (
            <BaseComponents.Typography
              tag="span"
              fontClass="body2Regular"
              className={styles.message}
              data-testid="ErrorModal_MESSAGE"
              aria-label={langDicMsg}
            >
              {langDicMsg}
            </BaseComponents.Typography>
          )}

          {isAuthError && onAuthAction && (
            <BaseComponents.Button
              className={styles.actionBtn}
              size="large"
              data-testid="ErrorModal_AUTH_BTN"
              aria-label={langDic.AuthButton[lang]}
              onClick={onAuthAction}
            >
              {langDic.AuthButton[lang]}
            </BaseComponents.Button>
          )}
        </div>
      </div>
    </BaseComponents.Modal>
  );
};
