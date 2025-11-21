export type TMsgSubMenuKeys = "REQUEST_HISTORY" | "NOTIFICATIONS";

type TMsgType = "success" | "inProgress" | "info" | "default";

interface IMsgBody {
  text: string;
  type: TMsgType;
}

export interface IMsgDataItem {
  owner: "CUSTOMER" | "EGOV";
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
