import { CheckIcon } from "@egov3/graphics/Basic/Check";
import { CloseIcon } from "@egov3/graphics/General/Close";
import { LoaderIcon } from "@egov3/graphics/General/Loader";

import { Typography } from "../../../baseComponents/Typography";
import { joinClasses } from "~utils/joinClasses";

import styles from "./PrecheckList.module.css";

export type TPrecheckStatus = "IN_PROGRESS" | "PASSED" | "FAILED";

export interface IPrecheckListItem {
  status: TPrecheckStatus;
  statusText: string;
  title: string;
}

export interface IPrecheckListProps {
  checks: IPrecheckListItem[];
  hint: string;
}

const statusView = {
  PASSED: {
    Icon: CheckIcon,
    iconClassName: styles.checkIconPassed,
    textClassName: styles.checkStatusPassed,
  },
  FAILED: {
    Icon: CloseIcon,
    iconClassName: styles.checkIconFailed,
    textClassName: styles.checkStatusFailed,
  },
  IN_PROGRESS: {
    Icon: LoaderIcon,
    iconClassName: styles.checkIconInProgress,
    textClassName: styles.secondaryText,
  },
} as const;

export const PrecheckList = ({ checks, hint }: IPrecheckListProps) => (
  <div className={styles.precheckWrapper} data-testid="PrecheckList_WRAPPER">
    <ul className={styles.checkList}>
      {checks.map(({ status, statusText, title }) => {
        const { Icon, iconClassName, textClassName } = statusView[status];

        return (
          <li
            key={title}
            className={styles.checkItem}
            data-testid="PrecheckList_CHECK_ITEM"
          >
            <Icon
              className={joinClasses(styles.checkIcon, iconClassName)}
              fill="currentColor"
            />
            <div
              className={styles.checkText}
              data-testid="PrecheckList_CHECK_TEXT"
            >
              <Typography
                tag="span"
                fontClass="body2Regular"
                data-testid="PrecheckList_CHECK_TITLE"
              >
                {title}
              </Typography>
              <Typography
                tag="span"
                fontClass="caption1Regular"
                className={textClassName}
                data-testid="PrecheckList_CHECK_STATUS"
              >
                {statusText}
              </Typography>
            </div>
          </li>
        );
      })}
    </ul>
    <Typography
      tag="p"
      fontClass="caption1Regular"
      className={styles.secondaryText}
      data-testid="PrecheckList_HINT"
    >
      {hint}
    </Typography>
  </div>
);
