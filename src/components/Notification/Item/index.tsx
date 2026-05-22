import { Icons } from "@egov3/graphics";
import type { JSX, SVGProps } from "react";
import { BaseComponents } from "~baseComponents";
import { joinClasses } from "~utils/joinClasses";
import { toPascalCase } from "~utils/string/toPascalCase";
import styles from "./NotificationComponent.module.css";

export type TNotificationType = "success" | "error" | "warning" | "info";

const notificationIconTypes = {
  success: Icons.Basic.Check,
  error: Icons.General.Clear,
  warning: Icons.General.WarningFilled,
  info: Icons.General.InfoFilled,
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
      <BaseComponents.Typography
        aria-label={text}
        className={styles.text}
        data-testid="NotificationComponent_TEXT"
        fontClass="body2Regular"
        tag="span"
      >
        {text}
      </BaseComponents.Typography>
    </button>
  );
};
