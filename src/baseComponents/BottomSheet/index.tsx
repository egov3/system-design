// src/baseComponents/BottomSheet/index.tsx
import { CloseIcon } from "@egov3/graphics/General/Close";
import type { Dispatch } from "react";
import { useDragToClose } from "~customHooks/useDragToClose";
import { joinClasses } from "~utils/joinClasses";
import { Overlay } from "../Overlay";
import { Typography } from "../Typography";
import styles from "./BottomSheet.module.css";

export interface IBottomSheetProps {
  children: React.ReactNode;
  title: string;
  setIsOpen: Dispatch<React.SetStateAction<boolean>>;
  variant: "large" | "small";
}

export const BottomSheet = ({
  children,
  title,
  setIsOpen,
  variant,
}: IBottomSheetProps): React.ReactNode => {
  const { grabberProps, sheetRef } = useDragToClose(setIsOpen);

  return (
    <Overlay>
      <div
        className={joinClasses(styles.contentWrap, styles[`${variant}Variant`])}
        data-testid="BottomSheet_WRAPPER"
        ref={sheetRef}
      >
        <div
          className={styles.grabber}
          data-testid="BottomSheet_GRABBER"
          {...grabberProps}
        />
        <div className={styles.contentHeader} data-testid="BottomSheet_HEADER">
          <Typography
            className={styles.posLeft}
            data-testid="BottomSheet_TITLE"
            fontClass="subtitles2"
            tag="h3"
          >
            {title}
          </Typography>
          <button
            className={styles.posRight}
            data-testid="BottomSheetHeaderBtn_CLOSE"
            onClick={() => {
              setIsOpen(false);
            }}
            type="button"
          >
            <CloseIcon
              data-testid="BottomSheetClose_ICON"
              height={24}
              width={24}
            />
          </button>
        </div>

        <div className={styles.contentBody} data-testid="BottomSheet_BODY">
          {children}
        </div>
      </div>
    </Overlay>
  );
};
