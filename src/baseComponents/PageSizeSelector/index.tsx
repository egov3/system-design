import type { Dispatch, SetStateAction } from "react";

import { CheckIcon } from "@egov3/graphics/Basic/Check";

import {
  DEFAULT_PAGE_SIZES,
  type TPageSize,
} from "~constants/PageSizeSelector";

import { Typography } from "../Typography";
import styles from "./PageSizeSelector.module.css";

export type { TPageSize };

export interface IPageSizeSelectorProps {
  pageSize: TPageSize;
  setPageSize: (value: TPageSize) => void;
  setIsOpenPageSize: Dispatch<SetStateAction<boolean>>;
}

export const PageSizeSelector = ({
  pageSize,
  setPageSize,
  setIsOpenPageSize,
}: IPageSizeSelectorProps) => (
  <div
    className={styles.pageSizeSelectorWrap}
    data-testid="PageSizeSelector_WRAP"
  >
    <div
      data-testid="PageSizeSelectorList_WRAP"
      className={styles.pageSizeListWrap}
    >
      {DEFAULT_PAGE_SIZES.map((num) => (
        <button
          key={num}
          type="button"
          className={styles.pageSizeListBtn}
          onClick={() => {
            setPageSize(num);
            setIsOpenPageSize(false);
          }}
          data-testid="PageSizeSelectorList_BTN"
        >
          <Typography
            tag="span"
            fontClass="body2Medium"
            data-testid="PageSizeSelectorList_LABEL"
          >
            {num}
          </Typography>
          <div
            className={styles.pageSizeCheckWrap}
            data-testid="PageSizeSelectorCheck_WRAP"
          >
            {num === pageSize && (
              <CheckIcon
                data-testid="PageSizeSelectorIcon_CHECK"
                height="20px"
                width="20px"
              />
            )}
          </div>
        </button>
      ))}
    </div>
  </div>
);
