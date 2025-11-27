import { BaseComponents } from "~baseComponents";
import type { IMsgDataItem } from "~interfaces/CustomersMsg";
import styles from "./CustomersMsg.module.css";

export const CustomersMsg = ({ msgItem }: { msgItem: IMsgDataItem }) => (
  <div data-testid="Msg_DIVIDER" className={styles.chatMsgDivider}>
    <div className={styles.chatMsgWrapper}>
      {msgItem.description.length > 0 &&
        msgItem.description.map((descriptionItem) => (
          <BaseComponents.Typography
            tag="span"
            fontClass="body2Regular"
            data-testid="MsgBody_TEXT"
            key={descriptionItem.text}
            className={styles.chatMsgText}
          >
            {descriptionItem.text}
          </BaseComponents.Typography>
        ))}
      <BaseComponents.Typography
        tag="time"
        fontClass="caption2Regular"
        data-testid="MsgBody_TIME"
        className={styles.chatMsgDate}
      >
        {msgItem.time}
      </BaseComponents.Typography>
    </div>
  </div>
);
