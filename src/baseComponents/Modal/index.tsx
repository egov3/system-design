// src/baseComponents/Modal/index.tsx
import { Icons } from "@egov3/graphics";
import type React from "react";
import type { Dispatch } from "react";
import { i18n } from "~constants/i18n";
import type { ILangProps } from "~interfaces/common";
import { joinClasses } from "~utils/joinClasses";
import { Button } from "../Button";
import { Overlay } from "../Overlay";
import { Typography } from "../Typography";
import styles from "./Modal.module.css";

export interface IFooterButtonsItem {
  text: string;
  onClick: () => void;
  disabled?: boolean;
  dataTestid?: string;
}

type TPosition = "left" | "center" | "right";

type THeaderItem =
  | {
      position: TPosition;
      type: "back";
      goBackService: () => void;
    }
  | {
      position: TPosition;
      type: "logo";
      goIdentityMain: () => void;
    }
  | {
      position: TPosition;
      type: "title";
      title: string;
    }
  | {
      position: TPosition;
      type: "close";
    };

export interface IModalProps extends ILangProps {
  children: React.ReactNode;
  isOpen?: boolean;
  setIsOpen?: Dispatch<React.SetStateAction<boolean>>;
  variant: "large" | "small";
  isWithOverlay?: boolean;
  footerButtons?: IFooterButtonsItem[];
  isContentScroll?: boolean;
  headerConfig?: THeaderItem[];
}

export const Modal = ({
  children,
  lang,
  isOpen,
  setIsOpen,
  variant,
  isWithOverlay = true,
  isContentScroll = true,
  footerButtons = [],
  headerConfig = [],
}: IModalProps) => {
  const Wrapper = isWithOverlay
    ? Overlay
    : (
        props: React.DetailedHTMLProps<
          React.HTMLAttributes<HTMLDivElement>,
          HTMLDivElement
        >,
      ) => <div {...props} />;

  const left = headerConfig.find((e) => e.position === "left");
  const center = headerConfig.find((e) => e.position === "center");
  const right = headerConfig.find((e) => e.position === "right");

  const renderHeaderContent = (item?: THeaderItem) => {
    if (!item) return null;

    if (item.type === "back") {
      return (
        <button
          aria-label={i18n.Modal.AriaBackButton[lang]}
          className={styles.regGoBack}
          data-testid="IdentityHeaderGoBack_BTN"
          onClick={item.goBackService}
          type="button"
        >
          <Icons.Basic.ChevronLeft
            width="18px"
            height="18px"
            data-testid="ModalChevronLeft_ICON"
          />
        </button>
      );
    }

    if (item.type === "logo") {
      return (
        <button
          aria-label={i18n.Modal.AriaAuthorizationPageBtn[lang]}
          className={styles.logo}
          data-testid="IdentityHeaderGoMain_BTN"
          onClick={item.goIdentityMain}
          type="button"
        >
          <Icons.Logo.Egov
            width="69px"
            height="24px"
            data-testid="ModalEgov_ICON"
          />
        </button>
      );
    }

    if (item.type === "title") {
      return (
        <Typography
          tag="h3"
          fontClass="body1Medium"
          data-testid="Modal_TITLE"
          className={styles.title}
        >
          {item.title}
        </Typography>
      );
    }

    if (item.type === "close") {
      return (
        <button
          type="button"
          data-testid="ModalHeaderBtn_CLOSE"
          onClick={() => setIsOpen?.(!isOpen)}
          className={styles.regCloseBtn}
        >
          <Icons.General.Close
            data-testid="ModalClose_ICON"
            width={14.5}
            height={14.5}
          />
        </button>
      );
    }

    return null;
  };

  return (
    <Wrapper className={isContentScroll ? undefined : styles.fixModal}>
      <div
        data-testid="Modal_WRAPPER"
        className={joinClasses(
          styles.contentWrap,
          isContentScroll && styles.contentWrapHeight,
          styles[`${variant}Variant`],
        )}
      >
        {headerConfig.length > 0 && (
          <div className={styles.contentHeader} data-testid="Modal_HEADER">
            {left && (
              <div className={styles.posLeft} data-testid="ModalHeader_LEFT">
                {renderHeaderContent(left)}
              </div>
            )}
            {center && (
              <div
                className={styles.posCenter}
                data-testid="ModalHeader_CENTER"
              >
                {renderHeaderContent(center)}
              </div>
            )}
            {right && (
              <div className={styles.posRight} data-testid="ModalHeader_RIGHT">
                {renderHeaderContent(right)}
              </div>
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
    </Wrapper>
  );
};
