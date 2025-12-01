export type TMsgSubMenuKeys = "REQUEST_HISTORY" | "NOTIFICATIONS";

type TMsgType = "success" | "inProgress" | "info" | "error";

interface IMsgBody {
  text: string;
  type: TMsgType;
}

export interface IMsgDataItem {
  id: number | string;
  header: {
    service: string;
    message: string;
  };
  description?: IMsgBody[];
  time: string;
  msgType: TMsgSubMenuKeys;
}
