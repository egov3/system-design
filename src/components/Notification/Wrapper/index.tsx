"use client";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import type { INotificationData } from "~interfaces/Notification";
import { NotificationItem } from "../Item";
import styles from "./NotificationWrapper.module.css";

const AUTO_CLOSE_DELAY_MS = 7000;

interface INotificationWrapperProps {
  items: INotificationData[];
  removeNotificationData: (id: string) => void;
}

export const NotificationWrapper = ({
  items,
  removeNotificationData,
}: INotificationWrapperProps) => {
  const [closingWithFlyUpId, setClosingWithFlyUpId] = useState<string | null>(
    null,
  );
  const topNotificationId = items[0]?.id ?? null;

  const closeTimersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(
    new Map(),
  );
  const topNotificationIdRef = useRef<string | null>(null);
  const itemRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  useEffect(() => {
    topNotificationIdRef.current = topNotificationId;
  }, [topNotificationId]);

  const clearCloseTimer = useCallback((id: string) => {
    const timerId = closeTimersRef.current.get(id);
    if (!timerId) {
      return;
    }
    clearTimeout(timerId);
    closeTimersRef.current.delete(id);
  }, []);

  const removeNotification = useCallback(
    (id: string) => {
      clearCloseTimer(id);
      removeNotificationData(id);
    },
    [clearCloseTimer, removeNotificationData],
  );

  const closeNotification = useCallback(
    (notification: INotificationData) => {
      if (closingWithFlyUpId === notification.id) {
        return;
      }
      if (topNotificationId === notification.id) {
        setClosingWithFlyUpId(notification.id);
        const element = itemRefs.current.get(notification.id);
        if (element) {
          const handleAnimationEnd = (event: AnimationEvent) => {
            if (event.animationName.includes("flyUp")) {
              removeNotification(notification.id);
              setClosingWithFlyUpId(null);
              element.removeEventListener("animationend", handleAnimationEnd);
            }
          };
          element.addEventListener("animationend", handleAnimationEnd);
        }
        return;
      }
      removeNotification(notification.id);
    },
    [closingWithFlyUpId, topNotificationId, removeNotification],
  );

  useEffect(() => {
    for (const notification of items) {
      if (closeTimersRef.current.has(notification.id)) {
        continue;
      }

      const closeTimer = setTimeout(() => {
        if (topNotificationIdRef.current === notification.id) {
          closeNotification(notification);
        } else {
          removeNotification(notification.id);
        }
      }, AUTO_CLOSE_DELAY_MS);

      closeTimersRef.current.set(notification.id, closeTimer);
    }

    const currentIds = new Set(items.map((item) => item.id));
    closeTimersRef.current.forEach((timerId, notificationId) => {
      if (currentIds.has(notificationId)) {
        return;
      }
      clearTimeout(timerId);
      closeTimersRef.current.delete(notificationId);
    });
  }, [items, closeNotification, removeNotification]);

  useEffect(() => {
    return () => {
      closeTimersRef.current.forEach((timerId) => {
        clearTimeout(timerId);
      });
      closeTimersRef.current.clear();
    };
  }, []);

  if (items.length === 0) {
    return null;
  }

  return (
    <div className={styles.wrapper} data-testid="NotificationWrapper_LIST">
      {items.map((notification) => (
        <div
          key={notification.id}
          className={`${styles.item} ${closingWithFlyUpId === notification.id ? styles.flyUp : ""}`}
          ref={(el) => {
            if (el) {
              itemRefs.current.set(notification.id, el);
              return;
            }
            itemRefs.current.delete(notification.id);
          }}
          data-testid={notification.id}
        >
          <NotificationItem
            text={notification.text}
            type={notification.type}
            onClick={() => {
              closeNotification(notification);
            }}
          />
        </div>
      ))}
    </div>
  );
};
