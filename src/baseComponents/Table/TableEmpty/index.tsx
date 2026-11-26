import type { ReactNode } from "react";

import { AddIcon } from "@egov3/graphics/General/Add";
import { ListMenuIcon } from "@egov3/graphics/General/ListMenu";

import { joinClasses } from "~utils/joinClasses";

import { Button } from "../../Button";
import { Typography } from "../../Typography";
import styles from "./TableEmpty.module.css";

export interface ITableEmptyProps {
  description: ReactNode;
  buttonText?: string;
  onButtonClick?: () => void;
  className?: string;
}

export const TableEmpty = ({
  description,
  buttonText,
  onButtonClick,
  className,
}: ITableEmptyProps) => (
  <div
    className={joinClasses(styles.wrapper, className)}
    data-testid="TableEmpty_WRAPPER"
  >
    <div className={styles.message}>
      <div className={styles.iconWrapper} data-testid="TableEmpty_ICON_WRAPPER">
        <ListMenuIcon
          width={24}
          height={24}
          fill="var(--icon-primary-color)"
          aria-hidden="true"
          data-testid="TableEmpty_ICON"
        />
      </div>
      <Typography
        tag="span"
        fontClass="body2Regular"
        className={styles.description}
        data-testid="TableEmpty_DESCRIPTION"
      >
        {description}
      </Typography>
    </div>
    {buttonText && onButtonClick && (
      <Button
        variant="text"
        size="medium"
        aria-label={buttonText}
        data-testid="TableEmpty_BUTTON"
        onClick={onButtonClick}
      >
        <AddIcon
          width={20}
          height={20}
          fill="currentColor"
          aria-hidden="true"
          data-testid="TableEmpty_BUTTON_ICON"
        />
        {buttonText}
      </Button>
    )}
  </div>
);
