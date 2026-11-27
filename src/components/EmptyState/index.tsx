import type { ReactNode } from "react";

import { SearchIcon } from "@egov3/graphics/General/Search";

import { Button } from "../../baseComponents/Button";
import { Typography } from "../../baseComponents/Typography";
import styles from "./EmptyState.module.css";

export interface IEmptyStateProps {
  description: string;
  icon?: ReactNode;
  buttonText?: string;
  onButtonClick?: () => void;
}

export const EmptyState = ({
  description,
  icon,
  buttonText,
  onButtonClick,
}: IEmptyStateProps) => (
  <div className={styles.emptyWrapper} data-testid="EmptyState_WRAPPER">
    <div
      className={styles.iconWrapper}
      aria-hidden="true"
      data-testid="EmptyState_ICON_WRAPPER"
    >
      {icon ?? (
        <SearchIcon
          fill="var(--icon-secondary-color)"
          width={32}
          height={32}
          data-testid="EmptyState_ICON"
        />
      )}
    </div>
    <Typography
      tag="span"
      fontClass="body2Regular"
      className={styles.description}
      data-testid="EmptyState_DESCRIPTION"
    >
      {description}
    </Typography>
    {buttonText && onButtonClick && (
      <Button
        aria-label={buttonText}
        size="medium"
        variant="tinted"
        data-testid="EmptyState_BUTTON"
        onClick={onButtonClick}
      >
        {buttonText}
      </Button>
    )}
  </div>
);
