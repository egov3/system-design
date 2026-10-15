import type { JSX } from "react";

import { CloseIcon } from "@egov3/graphics/General/Close";
import { EgovIcon } from "@egov3/graphics/Logo/Egov";

import type { ILangProps } from "~interfaces/common";

import { Button, type IFooterButtonsItem, Modal, Title } from "~baseComponents";
import { i18n } from "~constants/i18n";

import styles from "./ScreenMessage.module.css";

export interface IScreenMessageProps extends ILangProps {
  illustration: JSX.Element;
  title: string;
  subtext?: string;
  isOpen: boolean;
  onClose: () => void;
  footerButtons?: IFooterButtonsItem[];
}

const EMPTY_FOOTER_BUTTONS: IFooterButtonsItem[] = [];

export const ScreenMessage = ({
  illustration,
  title,
  subtext,
  lang,
  isOpen,
  onClose,
  footerButtons = EMPTY_FOOTER_BUTTONS,
}: IScreenMessageProps) => {
  const langDic = i18n.ScreenMessage;

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={onClose}
      variant="small"
      lang={lang}
      isContentScroll={false}
    >
      <div className={styles.wrapper} data-testid="ScreenMessage_WRAPPER">
        <div
          className={styles.headerWrapper}
          data-testid="ScreenMessage_HEADER"
        >
          <span className={styles.iconEgov} data-testid="ScreenMessage_LOGO">
            <EgovIcon width="70px" height="24px" viewBox="0 0 70 24" />
          </span>
          <button
            type="button"
            onClick={onClose}
            className={styles.actionButton}
            data-testid="ScreenMessage_CLOSE_BTN"
            aria-label={langDic.CloseModalButton[lang]}
          >
            <CloseIcon width="16px" height="16px" />
          </button>
        </div>
        <div className={styles.bodyWrapper} data-testid="ScreenMessage_BODY">
          {illustration}

          <Title
            isCentered={true}
            title={title}
            size="medium"
            subtext={subtext}
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
