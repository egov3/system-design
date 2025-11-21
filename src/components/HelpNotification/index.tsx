import type React from "react";
import { useState } from "react";

import styles from "./HelpNotification.module.css";

export interface IHelpNotificationProps {
  icon: React.ReactNode;
  children: React.ReactNode;
  handleOnClick?: () => void;
  ariaLabel: string;
  dataTestid: string;
}
export const HelpNotification = ({
  icon,
  children,
  handleOnClick,
  ariaLabel,
  dataTestid,
}: IHelpNotificationProps) => {
  const [visible, setVisible] = useState(false);

  const handleMouseEnter = () => {
    setVisible(true);
  };

  const handleMouseLeave = () => {
    setVisible(false);
  };

  return (
    <button
      type="button"
      className={styles.wrap}
      data-testid={dataTestid}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onClick={() => {
        if (handleOnClick) {
          handleOnClick();
        }
      }}
      tabIndex={0}
      aria-expanded={visible}
      aria-label={ariaLabel}
    >
      <div className={styles.icon} data-testid="HelpNotification_BUTTON">
        {icon}
      </div>
      {visible && (
        <div
          className={styles.notification}
          data-testid="HelpNotification_NOTIFICATION"
        >
          <div className={styles.arrow} data-testid="HelpNotification_ARROW">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="13"
              viewBox="0 0 28 13"
            >
              <path d="M28 12.9988L0 12.9988C6.894 13.1061 10.7704 6.17509 12.6198 1.40184C13.0084 0.398973 14.9916 0.398973 15.3802 1.40184C17.2296 6.17509 21.106 13.1061 28 12.9988Z" />
            </svg>
          </div>
          <div className={styles.block} data-testid="HelpNotification_BLOCK">
            {children}
          </div>
        </div>
      )}
    </button>
  );
};
