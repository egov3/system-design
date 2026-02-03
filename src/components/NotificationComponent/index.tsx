import { Icons } from "@egov3/graphics";
import { useEffect } from "react";
import { BaseComponents } from "~baseComponents";
import type { INotificationComponent } from "~interfaces/INotificationComponent";
import { joinClasses } from "~utils/joinClasses";
import styles from "./NotificationComponent.module.css";

const notificationIconTypes = {
  success: Icons.Basic.Check,
  error: Icons.General.Clear,
  warning: Icons.General.WarningFilled,
  info: Icons.General.InfoFilled,
};

export const NotificationComponent = ({
  type = "info",
  open,
  text,
  toggleNotification,
}: INotificationComponent) => {
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        toggleNotification(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [open, toggleNotification]);

  if (!open) return null;

  const Icon = notificationIconTypes[type];

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
