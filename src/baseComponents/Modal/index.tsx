// src/baseComponents/Modal/index.tsx
import { ChevronLeftIcon } from "@egov3/graphics/Basic/ChevronLeft";
import { CloseIcon } from "@egov3/graphics/General/Close";
import { EgovIcon } from "@egov3/graphics/Logo/Egov";
import type React from "react";
import type { Dispatch } from "react";
import { i18n } from "~constants/i18n";
import type { TButtonVariant } from "~interfaces/Button";
import type { ILangProps } from "~interfaces/common";
import { joinClasses } from "~utils/joinClasses";
import { Button } from "../Button";
import { Overlay } from "../Overlay";
import { Typography } from "../Typography";
import styles from "./Modal.module.css";

export interface IFooterButtonsItem {
  text: string;
  onClick: () => void;
  isDisabled?: boolean;
  dataTestid?: string;
  variant?: TButtonVariant;
}

export interface IModalProps extends ILangProps {
  children: React.ReactNode;
  header?: {
    isClosable?: boolean;
    goBackService?(): void;
    handleHeaderLogoClick?(): void;
    title?: string;
  };
  isOpen?: boolean;
  setIsOpen?: Dispatch<React.SetStateAction<boolean>>;
  variant: "large" | "small";
  isWithOverlay?: boolean;
  footerButtons?: IFooterButtonsItem[];
  isContentScroll?: boolean;
  isAnimated?: boolean;
  wrapperClassName?: string;
  disableDefaultWrapperSpacing?: boolean;
}

export const Modal = ({
  children,
  header,
  lang,
  isOpen,
  setIsOpen,
  variant,
  isWithOverlay = true,
  isContentScroll = true,
  isAnimated = true,
  footerButtons = [],
  wrapperClassName,
  disableDefaultWrapperSpacing = false,
}: IModalProps) => {
  const Wrapper = isWithOverlay
    ? Overlay
    : (
        props: React.DetailedHTMLProps<
          React.HTMLAttributes<HTMLDivElement>,
          HTMLDivElement
        >,
      ) => <div {...props} />;
  return (
    <Wrapper
      className={joinClasses(
        !disableDefaultWrapperSpacing && !isContentScroll && styles.fixModal,
        wrapperClassName,
      )}
    >
      <div
        data-testid="Modal_WRAPPER"
        className={joinClasses(
          styles.contentWrap,
          isContentScroll && styles.contentWrapHeight,
          styles[`${variant}Variant`],
          !isAnimated && styles.noAnimation,
        )}
      >
        {header && (
          <div data-testid="Modal_HEADER" className={styles.contentHeader}>
            {header.goBackService && (
              <button
                aria-label={i18n.Modal.AriaBackButton[lang]}
                className={styles.posLeft}
                data-testid="IdentityHeaderGoBack_BTN"
                onClick={header.goBackService}
                type="button"
              >
                <ChevronLeftIcon
                  width="18px"
                  height="18px"
                  data-testid="ModalChevronLeft_ICON"
                />
              </button>
            )}
            {header?.handleHeaderLogoClick && (
              <button
                aria-label={i18n.Modal.AriaAuthorizationPageBtn[lang]}
                className={styles.posCenter}
                data-testid="ModalHeaderGoMain_BTN"
                onClick={header.handleHeaderLogoClick}
                type="button"
              >
                <EgovIcon
                  width="69px"
                  height="24px"
                  data-testid="ModalHeaderEgov_ICON"
                />
              </button>
            )}
            {header?.title && (
              <Typography
                tag="h3"
                fontClass="body1Medium"
                data-testid="Modal_TITLE"
                className={joinClasses(
                  styles.posLeft,
                  styles.title,
                  header.isClosable && styles.titleWithCloseButton,
                )}
              >
                {header.title}
              </Typography>
            )}
            {header?.isClosable && (
              <button
                className={styles.posRight}
                type="button"
                data-testid="ModalHeaderBtn_CLOSE"
                onClick={() => {
                  if (setIsOpen) {
                    setIsOpen(!isOpen);
                  }
                }}
              >
                <CloseIcon
                  data-testid="ModalClose_ICON"
                  width={14.5}
                  height={14.5}
                />
              </button>
            )}
          </div>
        )}
        <div
          className={isContentScroll ? styles.contentBody : undefined}
          data-testid="Modal_BODY"
        >
          {children}
        </div>
        {footerButtons.length > 0 && (
          <div className={styles.wrapper} data-testid="ModalFooterButton_WRAP">
            {footerButtons.map((item) => (
              <Button
                aria-label={item.text}
                data-testid={item.dataTestid}
                disabled={item.isDisabled}
                onClick={item.onClick}
                key={item.text}
                size="large"
                variant={item.variant}
              >
                {item.text}
              </Button>
            ))}
          </div>
        )}
      </div>
    </Wrapper>
  );
};
