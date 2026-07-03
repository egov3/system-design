// src/baseComponents/StatusStepper/index.tsx

import { CheckIcon } from "@egov3/graphics/Basic/Check";
import { HourglassIcon } from "@egov3/graphics/General/Hourglass";
import { cloneElement, type ReactNode } from "react";
import type {
  IStatusStepItem,
  IStatusStepperProps,
  TStatusStepState,
} from "~interfaces/StatusStepper";
import { joinClasses } from "~utils/joinClasses";
import { Typography } from "../Typography";
import styles from "./StatusStepper.module.css";

type TCircleIcon = (props: {
  width: number;
  height: number;
  fill: string;
}) => ReactNode;

const circleMap: Record<TStatusStepState, { DefaultIcon: TCircleIcon }> = {
  completed: { DefaultIcon: CheckIcon },
  current: { DefaultIcon: HourglassIcon },
  error: { DefaultIcon: CheckIcon },
  pending: { DefaultIcon: HourglassIcon },
};

const StepIcon = ({ step }: { step: IStatusStepItem }): ReactNode => {
  if (step.variant === "dot") {
    return (
      <span
        className={joinClasses(styles.dot, styles[step.state])}
        data-testid={`StatusStepper_MARKER_${step.state.toUpperCase()}_DOT`}
      />
    );
  }

  const { DefaultIcon } = circleMap[step.state];

  return (
    <span
      className={joinClasses(styles.circle, styles[step.state])}
      data-testid={`StatusStepper_MARKER_${step.state.toUpperCase()}`}
    >
      {step.icon ? (
        cloneElement(step.icon, {
          fill: step.icon.props.fill ?? "currentColor",
        })
      ) : (
        <DefaultIcon width={20} height={20} fill="currentColor" />
      )}
    </span>
  );
};

export const StatusStepper = ({
  steps,
  className,
  "aria-label": ariaLabel,
}: IStatusStepperProps): ReactNode => (
  <ol
    className={joinClasses(styles.layout, className)}
    data-testid="StatusStepper_ROOT"
    aria-label={ariaLabel}
  >
    {steps.map((step, index) => (
      <li
        key={step.id}
        className={styles.item}
        data-testid="StatusStepper_ITEM"
        aria-current={step.state === "current" ? "step" : undefined}
      >
        <div
          className={styles.iconColumn}
          data-testid="StatusStepper_ICON_COLUMN"
        >
          <StepIcon step={step} />
          {index < steps.length - 1 && (
            <span
              data-testid="StatusStepper_CONNECTOR"
              className={joinClasses(styles.connector, styles[step.state])}
            />
          )}
        </div>
        <div
          className={styles.textColumn}
          data-testid="StatusStepper_TEXT_COLUMN"
        >
          <Typography
            tag="span"
            fontClass="body2Medium"
            className={styles.title}
            data-testid="StatusStepper_TITLE"
            aria-label={step.title}
          >
            {step.title}
          </Typography>
          {step.subtitle && (
            <Typography
              tag="span"
              fontClass="body2Regular"
              className={styles.subtitle}
              data-testid="StatusStepper_SUBTITLE"
              aria-label={step.subtitle}
            >
              {step.subtitle}
            </Typography>
          )}
        </div>
      </li>
    ))}
  </ol>
);
