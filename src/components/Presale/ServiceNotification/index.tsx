import parse from "html-react-parser";

import styles from "./ServiceNotification.module.css";

export interface IServiceNotificationProps {
  notification: string;
}

export const ServiceNotification = ({
  notification,
}: IServiceNotificationProps) => {
  return (
    <div data-testid="ServiceNotification_WRAPPER" className={styles.wrapper}>
      {parse(notification)}
    </div>
  );
};
