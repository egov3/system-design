import { CheckIcon } from "@egov3/graphics/Basic/Check";
import { CloseIcon } from "@egov3/graphics/General/Close";
import { LoaderIcon } from "@egov3/graphics/General/Loader";

import { joinClasses } from "~utils/joinClasses";

import { Typography } from "../../../baseComponents/Typography";
import styles from "./PrecheckList.module.css";

export type TPrecheckStatus = "loading" | "success" | "error";

export interface IPrecheckListItem {
  title: string;
  status: TPrecheckStatus;
  description: string;
}

export interface IPrecheckListProps {
  checks: IPrecheckListItem[];
}

const statusIcons = {
  loading: LoaderIcon,
  success: CheckIcon,
  error: CloseIcon,
};

export const PrecheckList = ({ checks }: IPrecheckListProps) => (
  <ul className={styles.checkList} data-testid="PrecheckList_WRAPPER">
    {checks.map(({ title, status, description }) => {
      const Icon = statusIcons[status];
      return (
        <li
          key={title}
          className={styles.checkItem}
          data-testid="PrecheckList_CHECK_ITEM"
        >
          <Icon
            className={joinClasses(styles.checkIcon, styles[status])}
            fill="currentColor"
            aria-hidden
            data-testid="PrecheckList_CHECK_ICON"
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
              className={styles[`${status}Status`]}
              data-testid="PrecheckList_CHECK_STATUS"
            >
              {description}
            </Typography>
          </div>
        </li>
      );
    })}
  </ul>
);
