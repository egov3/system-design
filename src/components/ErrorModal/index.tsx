import { CloseIcon } from "@egov3/graphics/General/Close";
import { InternetNotAvailableIllustration } from "@egov3/graphics/Illustrations/InternetNotAvailable";
import { VerificationIllustration } from "@egov3/graphics/Illustrations/Verification";
import { EgovIcon } from "@egov3/graphics/Logo/Egov";
import { Button, type IFooterButtonsItem, Modal, Title } from "~baseComponents";
import { i18n } from "~constants/i18n";
import type { ILangProps } from "~interfaces/common";
import styles from "./ErrorModal.module.css";

export interface IErrorModalProps extends ILangProps {
  status?: number;
  message?: string;
  isOpen: boolean;
  onClose: () => void;
  footerButtons?: IFooterButtonsItem[];
}

export const ErrorModal = ({
  status,
  message,
  lang,
  isOpen,
  onClose,
  footerButtons = [],
}: IErrorModalProps) => {
  const isAuthError = status === 401;
  const langDic = i18n.ErrorModal;
  const langDicMsg =
    message ?? (isAuthError ? langDic.NotAuthorizedMessage[lang] : "");

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={onClose}
      variant="small"
      lang={lang}
      isContentScroll={false}
    >
      <div className={styles.wrapper} data-testid="ErrorModal_WRAPPER">
        <div className={styles.headerWrapper} data-testid="ErrorModal_HEADER">
          <span className={styles.iconEgov} data-testid="ErrorModal_LOGO">
            <EgovIcon width="70px" height="24px" viewBox="0 0 70 24" />
          </span>
          <button
            type="button"
            onClick={onClose}
            className={styles.actionButton}
            data-testid="ErrorModal_CLOSE_BTN"
            aria-label={langDic.CloseModalButton[lang]}
          >
            <CloseIcon width="16px" height="16px" />
          </button>
        </div>
        <div className={styles.bodyWrapper} data-testid="ErrorModal_BODY">
          {isAuthError ? (
            <VerificationIllustration data-testid="ErrorModal_ICON_AUTH" />
          ) : (
            <InternetNotAvailableIllustration data-testid="ErrorModal_ICON_COMMON" />
          )}

          <Title
            isCentered={true}
            title={langDic.Title[lang]}
            size="medium"
            subtext={langDicMsg}
          />

          {footerButtons.length > 0 && (
            <div
              className={styles.buttonWrapper}
              data-testid="ModalFooterButton_WRAP"
            >
              {footerButtons.map((item) => (
                <Button
                  aria-label={item.text}
                  data-testid={item.dataTestid}
                  disabled={item.isDisabled}
                  onClick={item.onClick}
                  key={item.dataTestid}
                  size="large"
                  variant={item.variant}
                >
                  {item.text}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};
