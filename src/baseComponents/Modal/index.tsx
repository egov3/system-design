// src/baseComponents/Modal/index.tsx
import { Icons } from "@egov3/graphics";
import type { Dispatch } from "react";
import React from "react";
import { i18n } from "~constants/i18n";
import type { ILangProps } from "~interfaces/common";
import { joinClasses } from "~utils/joinClasses";
import { Button } from "../Button";
import { Overlay } from "../Overlay";
import { Typography } from "../Typography";
import styles from "./Modal.module.css";

interface IFooterbuttonsItem {
  text: string;
  onClick: () => void;
  disabled?: boolean;
  dataTestid?: string;
}

export interface IModalProps extends ILangProps {
  children: React.ReactNode;
  header?: {
    isClosable?: boolean;
    goBackService?(): void;
    goIdentityMain?(): void;
    title?: string;
  };
  open?: boolean;
  setOpen?: Dispatch<React.SetStateAction<boolean>>;
  variant: "large" | "small";
  withOverlay?: boolean;
  footerbuttons?: IFooterbuttonsItem[];
  isContentScroll?: boolean;
}

export const Modal = ({
  children,
  header,
  lang,
  open,
  setOpen,
  variant,
  withOverlay = true,
  isContentScroll = true,
  footerbuttons = [],
}: IModalProps) => {
  const Wrapper = withOverlay ? Overlay : React.Fragment;
  return (
    <Wrapper className={!isContentScroll && styles.fixModal}>
      <div
        data-testid="Modal_WRAPPER"
        className={joinClasses(
          styles.contentWrap,
          isContentScroll && styles.contentWrapHeight,
          styles[`${variant}Variant`],
        )}
      >
        {header && (
          <div data-testid="Modal_HEADER" className={styles.contentHeader}>
            {header?.goBackService && (
              <button
                aria-label={i18n.Modal.AriaBackButton[lang]}
                className={styles.regGoBack}
                data-testid="IdentityHeaderGoBack_BTN"
                onClick={header.goBackService}
                type="button"
              >
                <Icons.Basic.ChevronLeft
                  width="18px"
                  height="18px"
                  data-testid="ModalChevronLeft_ICON"
                />
              </button>
            )}
            {header?.goIdentityMain && (
              <button
                aria-label={i18n.Modal.AriaAuthorizationPageBtn[lang]}
                className={styles.logo}
                data-testid="IdentityHeaderGoMain_BTN"
                onClick={header.goIdentityMain}
                type="button"
              >
                <Icons.Logo.Egov
                  width="69px"
                  height="24px"
                  data-testid="ModalEgov_ICON"
                />
              </button>
            )}
            {header?.title && (
              <Typography
                tag="h3"
                fontClass="body1Medium"
                data-testid="Modal_TITLE"
                className={styles.title}
              >
                {header.title}
              </Typography>
            )}
            {header?.isClosable === true ? (
              <button
                type="button"
                data-testid="ModalHeaderBtn_CLOSE"
                onClick={() => {
                  if (setOpen) {
                    setOpen(!open);
                  }
                }}
              >
                <Icons.General.Close data-testid="ModalClose_ICON" />
              </button>
            ) : (
              <div
                data-testid="IdentityHeaderBtn_CLOSE"
                className={styles.regCloseBtn}
              />
            )}
          </div>
        )}
        <div
          className={isContentScroll && styles.contentBody}
          data-testid="Modal_BODY"
        >
          {children}
        </div>
        {footerbuttons.length > 0 && (
          <div className={styles.footerWrap} data-testid="Modal_FOOTER">
            {footerbuttons && (
              <div
                data-testid="ModalFooterButton_WRAP"
                className={styles.wrapper}
              >
                {footerbuttons.map((item) => (
                  <Button
                    aria-label={item.text}
                    data-testid={item.dataTestid}
                    disabled={item.disabled}
                    onClick={item.onClick}
                    key={item.text}
                    size="large"
                  >
                    {item.text}
                  </Button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </Wrapper>
  );
};
