import Icons from "@egov3/graphics";
import type { Dispatch } from "react";
import React from "react";
import { i18n } from "~constants/i18n";
import type { ILangProps } from "~interfaces/common";
import { joinClasses } from "~utils/joinClasses";
import { BaseComponents } from "..";
import styles from "./Modal.module.css";

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
}

export const Modal = ({
  children,
  header,
  lang,
  open,
  setOpen,
  variant,
  withOverlay = true,
}: IModalProps) => {
  const Wrapper = withOverlay ? "div" : React.Fragment;
  return (
    <Wrapper
      {...(withOverlay
        ? { className: styles.overlay, "data-testid": "Modal_OVERLAY" }
        : {})}
    >
      <div
        data-testid="Modal_WRAPPER"
        className={joinClasses(styles.contentWrap, styles[`${variant}Variant`])}
      >
        {header && (
          <div data-testid="Modal_HEADER" className={styles.contentHeader}>
            {header?.goBackService && (
              <button
                aria-label={i18n.Modal.ariaBackButton[lang]}
                className={styles.regGoBack}
                data-testid="IdentityHeaderGoBack_BTN"
                onClick={header.goBackService}
                type="button"
              >
                <Icons.Basic.ChevronLeft width="18px" height="18px" />
              </button>
            )}
            {header?.goIdentityMain && (
              <button
                aria-label={
                  i18n.Modal.ariaAuthorizationPageBtn[lang]
                }
                className={styles.logo}
                data-testid="IdentityHeaderGoMain_BTN"
                onClick={header.goIdentityMain}
                type="button"
              >
                <Icons.Logo.Egov width="69px" height="24px" />
              </button>
            )}
            {header?.title && (
              <BaseComponents.Typography
                tag="h3"
                fontClass="body1Medium"
                data-testid="Modal_TITLE"
                className={styles.title}
              >
                {header.title}
              </BaseComponents.Typography>
            )}
            {header?.isClosable === true ? (
              <button
                type="button"
                data-testid="ModalHeaderBtn_CLOSE"
                onClick={() => {
                  console.log("ModalHeaderBtn_CLOSE open = ", open);
                  if (setOpen) {
                    setOpen(!open);
                  }
                }}
              >
                <Icons.General.Close data-testid="Modal_ICON" />
              </button>
            ) : <div
              data-testid="IdentityHeaderBtn_CLOSE"
              className={styles.regCloseBtn}
            />}
          </div>
        )}
        {children}
      </div>
    </Wrapper>
  );
};
