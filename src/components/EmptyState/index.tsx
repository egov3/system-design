import { SearchIcon } from "@egov3/graphics/General/Search";

import { Button } from "../../baseComponents/Button";
import { Typography } from "../../baseComponents/Typography";
import styles from "./EmptyState.module.css";

export interface IEmptyStateProps {
  description: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

export const EmptyState = ({
  description,
  buttonText,
  onButtonClick,
}: IEmptyStateProps) => (
  <div className={styles.emptyWrapper} data-testid="EmptyState_WRAPPER">
    <div data-testid="EmptyState_ICON_WRAPPER" className={styles.iconWrapper}>
      <SearchIcon
        fill="var(--icon-secondary-color)"
        data-testid="EmptyState_ICON"
        width={32}
        height={32}
      />
    </div>
    <Typography
      data-testid="EmptyState_DESCRIPTION"
      tag="span"
      fontClass="body2Regular"
      className={styles.description}
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
