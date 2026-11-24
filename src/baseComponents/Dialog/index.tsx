// src/baseComponents/Dialog/index.tsx
import type React from "react";
import type { Dispatch } from "react";

import { CloseIcon } from "@egov3/graphics/General/Close";

import type { TButtonVariant } from "~interfaces/Button";
import type { ILangProps } from "~interfaces/common";

import { i18n } from "~constants/i18n";
import { joinClasses } from "~utils/joinClasses";

import typography from "../../styles/typography.module.css";
import { Button } from "../Button";
import { Overlay } from "../Overlay";
import { Typography } from "../Typography";
import styles from "./Dialog.module.css";

export type TDialogSize = "S" | "M" | "L";

export interface IDialogAction {
  text: string;
  onClick: () => void;
  isDisabled?: boolean;
  dataTestid?: string;
}

export interface IDialogFooterButton {
  text: string;
  onClick: () => void;
  isDisabled?: boolean;
  dataTestid?: string;
  variant?: TButtonVariant;
}

export interface IDialogHeader {
  title?: string;
  stepText?: string;
  isClosable?: boolean;
}

export interface IDialogProps extends ILangProps {
  children: React.ReactNode;
  isOpen?: boolean;
  setIsOpen?: Dispatch<React.SetStateAction<boolean>>;
  header?: IDialogHeader;
  additionalButton?: IDialogAction;
  footerButtons?: IDialogFooterButton[];
  size?: TDialogSize;
  isDividerTop?: boolean;
  isDividerBottom?: boolean;
  isContentScroll?: boolean;
  isWithOverlay?: boolean;
  isAnimated?: boolean;
  wrapperClassName?: string;
  className?: string;
}

const EMPTY_FOOTER_BUTTONS: IDialogFooterButton[] = [];

const SIZE_CLASS: Record<TDialogSize, string> = {
  S: styles.sizeS,
  M: styles.sizeM,
  L: styles.sizeL,
};

const PlainWrapper = (
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >,
) => <div {...props} />;

export const Dialog = ({
  children,
  lang,
  isOpen,
  setIsOpen,
  header,
  additionalButton,
  footerButtons = EMPTY_FOOTER_BUTTONS,
  size = "S",
  isDividerTop = false,
  isDividerBottom = false,
  isContentScroll = true,
  isWithOverlay = true,
  isAnimated = true,
  wrapperClassName,
  className,
}: IDialogProps) => {
  const Wrapper = isWithOverlay ? Overlay : PlainWrapper;
  const hasFooter = Boolean(additionalButton || footerButtons.length > 0);

  return (
    <Wrapper className={wrapperClassName}>
      <div
        data-testid="Dialog_WRAPPER"
        className={joinClasses(
          styles.dialog,
          SIZE_CLASS[size],
          !isAnimated && styles.noAnimation,
          className,
        )}
      >
        {header && (
          <div
            data-testid="Dialog_HEADER"
            className={joinClasses(
              styles.header,
              isDividerTop && styles.headerDivider,
            )}
          >
            <div className={styles.headerText} data-testid="Dialog_HEADER_TEXT">
              {header.stepText && (
                <Typography
                  tag="span"
                  fontClass="caption1Regular"
                  className={styles.step}
                  data-testid="Dialog_STEP"
                >
                  {header.stepText}
                </Typography>
              )}
              {header.title && (
                <Typography
                  tag="h3"
                  fontClass="subtitles2"
                  className={styles.title}
                  data-testid="Dialog_TITLE"
                >
                  {header.title}
                </Typography>
              )}
            </div>
            {header.isClosable && (
              <button
                aria-label={i18n.Common.CloseBtn[lang]}
                className={styles.closeButton}
                data-testid="DialogHeaderBtn_CLOSE"
                onClick={() => {
                  if (setIsOpen) {
                    setIsOpen(!isOpen);
                  }
                }}
                type="button"
              >
                <CloseIcon
                  data-testid="DialogClose_ICON"
                  height={20}
                  width={20}
                />
              </button>
            )}
          </div>
        )}

        <div
          data-testid="Dialog_BODY"
          className={joinClasses(
            styles.body,
            isContentScroll && styles.bodyScroll,
          )}
        >
          {children}
        </div>

        {hasFooter && (
          <div
            data-testid="Dialog_FOOTER"
            className={joinClasses(
              styles.footer,
              isDividerBottom && styles.footerDivider,
            )}
          >
            <div className={styles.footerLeft}>
              {additionalButton && (
                <button
                  type="button"
                  data-testid={additionalButton.dataTestid}
                  className={joinClasses(
                    styles.additionalButton,
                    typography.body3Medium,
                  )}
                  disabled={additionalButton.isDisabled}
                  onClick={additionalButton.onClick}
                >
                  {additionalButton.text}
                </button>
              )}
            </div>
            {footerButtons.length > 0 && (
              <div className={styles.footerRight}>
                {footerButtons.map((item) => (
                  <Button
                    key={item.text}
                    data-testid={item.dataTestid}
                    className={joinClasses(
                      styles.footerActionButton,
                      typography.body3Medium,
                    )}
                    size="medium"
                    variant={item.variant}
                    disabled={item.isDisabled}
                    onClick={item.onClick}
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
