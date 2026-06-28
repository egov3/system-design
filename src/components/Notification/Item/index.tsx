import { CheckIcon } from "@egov3/graphics/Basic/Check";
import { ClearIcon } from "@egov3/graphics/General/Clear";
import { InfoFilledIcon } from "@egov3/graphics/General/InfoFilled";
import { WarningFilledIcon } from "@egov3/graphics/General/WarningFilled";
import type { JSX, SVGProps } from "react";
import { Typography } from "~baseComponents";
import { joinClasses } from "~utils/joinClasses";
import { toPascalCase } from "~utils/string/toPascalCase";
import styles from "./NotificationComponent.module.css";

export type TNotificationType = "success" | "error" | "warning" | "info";

const notificationIconTypes = {
  success: CheckIcon,
  error: ClearIcon,
  warning: WarningFilledIcon,
  info: InfoFilledIcon,
} satisfies Record<
  TNotificationType,
  (props: SVGProps<SVGSVGElement>) => JSX.Element
>;

export interface INotificationComponentProps {
  text: string;
  type?: TNotificationType;
  onClick?: () => void;
}

export const NotificationItem = ({
  type = "info",
  text,
  onClick,
}: INotificationComponentProps) => {
  const Icon = notificationIconTypes[type];

  return (
    <button
      type="button"
      onClick={onClick}
      className={joinClasses(styles.snackbar, styles[type])}
      data-testid="NotificationComponent_SNACKBAR"
    >
      <Icon
        fill="var(--icon-white-nonconvert-color)"
        data-testid={`NotificationComponentIcon_${toPascalCase(type)}`}
      />
      <Typography
        aria-label={text}
        className={styles.text}
        data-testid="NotificationComponent_TEXT"
        fontClass="body2Regular"
        tag="span"
      >
        {text}
      </Typography>
    </button>
  );
};
