// src/baseComponents/Dialog/index.tsx
import type React from "react";
import type { Dispatch } from "react";

import { CloseIcon } from "@egov3/graphics/General/Close";

import type { ILangProps } from "~interfaces/common";

import { i18n } from "~constants/i18n";
import { joinClasses } from "~utils/joinClasses";

import { Overlay } from "../Overlay";
import { Typography } from "../Typography";
import styles from "./Dialog.module.css";

export type TDialogSize = "S" | "M" | "L";

export interface IDialogHeader {
  title?: string;
  stepText?: string;
  isClosable?: boolean;
}

export interface IDialogProps extends ILangProps {
  isOpen?: boolean;
  setIsOpen?: Dispatch<React.SetStateAction<boolean>>;
  header?: IDialogHeader;
  size?: TDialogSize;
  isDividerTop?: boolean;
  isWithOverlay?: boolean;
  wrapperClassName?: string;
  className?: string;
}

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
  lang,
  isOpen,
  setIsOpen,
  header,
  size = "S",
  isDividerTop = false,
  isWithOverlay = true,
  wrapperClassName,
  className,
}: IDialogProps) => {
  const Wrapper = isWithOverlay ? Overlay : PlainWrapper;

  return (
    <Wrapper className={wrapperClassName}>
      <div
        data-testid="Dialog_WRAPPER"
        className={joinClasses(styles.dialog, SIZE_CLASS[size], className)}
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
      </div>
    </Wrapper>
  );
};
