"use client";
import type { AnimationEvent } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
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
  const [closingTopId, setClosingTopId] = useState<string | null>(null);
  const topNotificationId = items[0]?.id ?? null;

  const topNotificationIdRef = useRef<string | null>(null);
  const closeTimersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(
    new Map(),
  );
  const itemRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const skipNextFlipRef = useRef(false);

  const clearCloseTimer = useCallback((id: string) => {
    const timer = closeTimersRef.current.get(id);
    if (!timer) {
      return;
    }
    clearTimeout(timer);
    closeTimersRef.current.delete(id);
  }, []);

  const removeNotification = useCallback(
    (id: string) => {
      clearCloseTimer(id);
      removeNotificationData(id);
    },
    [clearCloseTimer, removeNotificationData],
  );

  const startTopCloseAnimation = useCallback(
    (id: string) => {
      clearCloseTimer(id);
      setClosingTopId((current) => (current === id ? current : id));
    },
    [clearCloseTimer],
  );

  const closeNotification = useCallback(
    (id: string) => {
      if (id !== topNotificationId) {
        removeNotification(id);
        return;
      }
      startTopCloseAnimation(id);
    },
    [topNotificationId, startTopCloseAnimation, removeNotification],
  );

  const handleTopAnimationEnd = useCallback(
    (event: AnimationEvent<HTMLDivElement>, id: string) => {
      if (event.currentTarget !== event.target || closingTopId !== id) {
        return;
      }
      skipNextFlipRef.current = true;
      removeNotification(id);
      setClosingTopId(null);
    },
    [closingTopId, removeNotification],
  );

  useEffect(() => {
    topNotificationIdRef.current = topNotificationId;
  }, [topNotificationId]);

  useEffect(() => {
    items.forEach((item) => {
      if (closeTimersRef.current.has(item.id)) {
        return;
      }

      const timer = setTimeout(() => {
        if (topNotificationIdRef.current === item.id) {
          startTopCloseAnimation(item.id);
          return;
        }
        removeNotification(item.id);
      }, AUTO_CLOSE_DELAY_MS);

      closeTimersRef.current.set(item.id, timer);
    });

    const currentIds = new Set(items.map((item) => item.id));
    closeTimersRef.current.forEach((timer, id) => {
      if (currentIds.has(id)) {
        return;
      }
      clearTimeout(timer);
      closeTimersRef.current.delete(id);
    });
  }, [items, startTopCloseAnimation, removeNotification]);

  useEffect(
    () => () => {
      closeTimersRef.current.forEach((timer) => {
        clearTimeout(timer);
      });
      closeTimersRef.current.clear();
    },
    [],
  );

  if (items.length === 0) {
    return null;
  }

  return (
    <div className={styles.wrapper} data-testid="NotificationWrapper_LIST">
      {items.map((notification) => (
        <div
          key={notification.id}
          className={`${styles.item} ${closingTopId === notification.id ? styles.flyUp : ""}`}
          onAnimationEnd={(event) => {
            handleTopAnimationEnd(event, notification.id);
          }}
          ref={(el) => {
            if (el) {
              itemRefs.current.set(notification.id, el);
              return;
            }
            itemRefs.current.delete(notification.id);
          }}
          data-testid={`NotificationWrapper_ITEM_${notification.id}`}
        >
          <NotificationItem
            text={notification.text}
            type={notification.type}
            onClick={() => {
              closeNotification(notification.id);
            }}
          />
        </div>
      ))}
    </div>
  );
};
