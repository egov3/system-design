import type { ReactNode } from "react";
import { joinClasses } from "~utils/joinClasses";
import styles from "./Tooltip.module.css";

export interface ITooltipProps {
  children: ReactNode;
  text: string;
  className?: string;
  dataTestid?: string;
}

export const Tooltip = ({
  children,
  className,
  dataTestid = "Tooltip",
  text,
}: ITooltipProps) => (
  <span
    className={joinClasses(styles.tooltipWrap, className)}
    data-testid={`${dataTestid}_WRAP`}
  >
    {children}
    <span
      className={styles.tooltip}
      data-testid={`${dataTestid}_CONTENT`}
      role="tooltip"
    >
      {text}
      <span className={styles.tooltipArrow} data-testid={`${dataTestid}_ARROW`}>
        <svg
          aria-hidden="true"
          fill="none"
          height="10"
          viewBox="0 0 28 10"
          width="28"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 0.000923361H28C21.0355 -0.0803776 17.1506 5.22512 15.3241 8.80723C14.8685 9.7006 13.1315 9.7006 12.6759 8.80723C10.8494 5.22512 6.96449 -0.0803776 0 0.000923361Z"
            fill="currentColor"
          />
        </svg>
      </span>
    </span>
  </span>
);
