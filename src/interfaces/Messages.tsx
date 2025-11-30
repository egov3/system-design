export type TMsgSubMenuKeys = "REQUEST_HISTORY" | "NOTIFICATIONS";

type TMsgType = "success" | "inProgress" | "info" | "error" | "default";

interface IMsgBody {
  text: string;
  type: TMsgType;
}

export interface IMsgDataItem {
  id: number | string;
  header?: {
    serviceName: string;
    type: string;
  };
  description: IMsgBody[];
  path?: string;
  time: string;
  date: string;
  msgType: TMsgSubMenuKeys;
}

export interface INotificationItem {
  id: number | string;
  title: string;
  description: IMsgBody[];
  time: string;
  date: string;
}
