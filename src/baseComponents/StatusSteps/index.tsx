// src/baseComponents/StatusSteps/index.tsx

import { CheckIcon } from "@egov3/graphics/Basic/Check";
import { HourglassIcon } from "@egov3/graphics/General/Hourglass";
import type React from "react";
import { Typography } from "~baseComponents";
import type {
  IStatusStepItem,
  IStatusStepsProps,
} from "~interfaces/StatusSteps";
import { joinClasses } from "~utils/joinClasses";
import styles from "./StatusSteps.module.css";

const StepIcon = ({ step }: { step: IStatusStepItem }): React.ReactNode => {
  if (step.state === "completed" && step.completedVariant === "dot") {
    return (
      <span
        className={styles.dot}
        data-testid="StatusSteps_MARKER_COMPLETED_DOT"
      />
    );
  }

  if (step.state === "completed") {
    return (
      <span
        className={joinClasses(styles.circle, styles.circleSuccess)}
        data-testid="StatusSteps_MARKER_COMPLETED"
      >
        {step.icon ?? <CheckIcon width={20} height={20} fill="currentColor" />}
      </span>
    );
  }

  if (step.state === "current") {
    return (
      <span
        className={joinClasses(styles.circle, styles.circleCurrent)}
        data-testid="StatusSteps_MARKER_CURRENT"
      >
        {step.icon ?? (
          <HourglassIcon width={20} height={20} fill="currentColor" />
        )}
      </span>
    );
  }

  return (
    <span
      className={joinClasses(styles.circle, styles.circleTinted)}
      data-testid="StatusSteps_MARKER_PENDING"
    >
      {step.icon}
    </span>
  );
};

export const StatusSteps = ({
  steps,
  className,
  "aria-label": ariaLabel,
}: IStatusStepsProps): React.ReactNode => (
  <ol
    className={joinClasses(styles.root, className)}
    data-testid="StatusSteps_ROOT"
    aria-label={ariaLabel}
  >
    {steps.map((step, index) => (
      <li
        key={step.id ?? index}
        className={styles.item}
        data-testid="StatusSteps_ITEM"
        aria-current={step.state === "current" ? "step" : undefined}
      >
        <div className={styles.iconColumn}>
          <StepIcon step={step} />
          {index < steps.length - 1 && (
            <span
              data-testid="StatusSteps_CONNECTOR"
              className={joinClasses(
                styles.connector,
                step.state === "completed" && styles.connectorSuccess,
                step.state === "current" && styles.connectorCurrent,
              )}
            />
          )}
        </div>
        <div className={styles.textColumn}>
          <Typography
            tag="span"
            fontClass="body2Medium"
            className={styles.title}
            data-testid="StatusSteps_TITLE"
          >
            {step.title}
          </Typography>
          {step.subtitle && (
            <Typography
              tag="span"
              fontClass="body2Regular"
              className={styles.subtitle}
              data-testid="StatusSteps_SUBTITLE"
            >
              {step.subtitle}
            </Typography>
          )}
        </div>
      </li>
    ))}
  </ol>
);
