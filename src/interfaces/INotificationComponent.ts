export interface INotificationComponent {
  open: boolean;
  text: string;
  isSuccess?: boolean;
  type?: NotificationType;
  toggleNotification: (open: boolean) => void;
}

export const NotificationTypeObj = {
  success: "success",
  error: "error",
  warning: "warning",
  info: "info",
} as const;

export type NotificationType = keyof typeof NotificationTypeObj;
