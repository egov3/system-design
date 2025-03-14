import React, { Dispatch, JSX } from "react";
import Icons from "@egov3/graphics";

import styles from "./Modal.module.css";
import { joinClasses } from "~utils/joinClasses";
import { Components } from "~components";

export interface IModalProps {
  open: boolean;
  children: JSX.Element;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
  headerTitle?: string;
  variant: "large" | "small";
}

export const Modal = ({
  open,
  setOpen,
  children,
  headerTitle,
  variant,
}: IModalProps) => {
  if (open) {
    return (
      <div data-testid="Modal_OVERLAY" className={styles.overlay}>
        <div
          data-testid="Modal_WRAPPER"
          className={joinClasses(
            styles.contentWrap,
            styles[`${variant}Variant`]
          )}
        >
          {headerTitle && headerTitle.length > 0 && (
            <div data-testid="Modal_HEADER" className={styles.contentHeader}>
              <Components.Typography
                tag="h3"
                fontClass="Body1Medium"
                data-testid="Modal_TITLE"
                className={styles.title}
              >
                {headerTitle}
              </Components.Typography>
              <button
                data-testid="ModalHeader_BTN"
                onClick={() => {
                  setOpen(!open);
                }}
              >
                <Icons.General.Close data-testid="Modal_ICON" />
              </button>
            </div>
          )}
          {children}
        </div>
      </div>
    );
  } else {
    return null;
  }
};
