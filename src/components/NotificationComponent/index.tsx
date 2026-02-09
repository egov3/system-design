import { Icons } from "@egov3/graphics";
import { type JSX, type SVGProps, useEffect } from "react";
import { BaseComponents } from "~baseComponents";
import { joinClasses } from "~utils/joinClasses";
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
  toggleNotification: (open: boolean) => void;
}

export const NotificationComponent = ({
  type = "info",
  text,
  toggleNotification,
}: INotificationComponentProps) => {
  const Icon = notificationIconTypes[type];

  useEffect(() => {
    const timer = setTimeout(() => {
      toggleNotification(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [toggleNotification]);

  return (
    <div
      className={joinClasses(styles.snackbar, styles[type])}
      data-testid="NotificationComponent_SNACKBAR"
    >
      <Icon
        fill="var(--icon-white-nonconvert-color)"
        data-testid="NotificationComponent_ICON"
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
    </div>
  );
};
