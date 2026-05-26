import type { NotificationTypeObj } from "~constants/Notification";

export type TNotificationType = keyof typeof NotificationTypeObj;

export interface INotificationData {
  id: string;
  isOpen: boolean;
  text: string;
  type: TNotificationType;
}
