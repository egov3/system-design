export type TMsgSubMenuKeys = "REQUEST_HISTORY" | "NOTIFICATIONS";

type TMsgType = "success" | "inProgress" | "info" | "error";

type TSupportMsgType = "APPROVED" | "CREATED";

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
  isRead: boolean;
  msgType: TMsgSubMenuKeys;
  status: TSupportMsgType;
}
