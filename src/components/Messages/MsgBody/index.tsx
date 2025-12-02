import { Icons } from "@egov3/graphics";
import { BaseComponents } from "~baseComponents";
import { i18n } from "~constants/i18n";
import type { ILangProps } from "~interfaces/common";
import type { IMsgDataItem } from "~interfaces/Messages";
import { joinClasses } from "~utils/joinClasses";
import styles from "./MsgBody.module.css";

export interface IMsgBodyProps extends ILangProps {
  msgItem: IMsgDataItem;
  handleDetailsClick: () => void;
}

const langDic = i18n.MsgBody;

export const MsgBody = ({
  msgItem,
  lang,
  handleDetailsClick,
}: IMsgBodyProps) => (
  <div data-testid="MsgBody_WRAPPER" className={styles.msgBodyWrapper}>
    <div className={styles.titleWrapper}>
      <BaseComponents.Typography
        tag="span"
        fontClass="caption1Regular"
        className={styles.titleCategory}
      >
        {msgItem.header.service}
      </BaseComponents.Typography>
      <BaseComponents.Typography
        tag="span"
        fontClass="caption1Regular"
        className={styles.title}
      >
        {msgItem.header.message}
      </BaseComponents.Typography>
    </div>
    {msgItem.description?.map((item) => (
      <div key={item.text}>
        {item.type === "error" && (
          <BaseComponents.Typography
            tag="span"
            fontClass="body2Regular"
            className={joinClasses(
              styles.chatMsgText,
              styles["chatMsgText-error"],
            )}
          >
            <Icons.General.WarningFilled />
            {item.text}
          </BaseComponents.Typography>
        )}
        {item.type === "success" && (
          <BaseComponents.Typography
            tag="span"
            fontClass="body2Regular"
            className={joinClasses(
              styles.chatMsgText,
              styles["chatMsgText-success"],
            )}
          >
            <Icons.General.CheckedFilled />
            {item.text}
          </BaseComponents.Typography>
        )}
        {item.type === "inProgress" && (
          <BaseComponents.Typography
            tag="span"
            fontClass="body2Regular"
            className={joinClasses(
              styles.chatMsgText,
              styles["chatMsgText-inProgress"],
            )}
          >
            <Icons.Additional.TimeFilled />
            {item.text}
          </BaseComponents.Typography>
        )}
        {item.type === "info" && (
          <BaseComponents.Typography
            tag="span"
            fontClass="body2Regular"
            className={joinClasses(
              styles.chatMsgText,
              styles["chatMsgText-info"],
            )}
          >
            <Icons.General.InfoFilled />
            {item.text}
          </BaseComponents.Typography>
        )}
      </div>
    ))}
    <BaseComponents.Button
      aria-label={langDic.ariaReadMoreButton[lang]}
      onClick={handleDetailsClick}
      variant={msgItem.isRead ? "secondary" : "tinted"}
      style={{
        width: "100%",
      }}
    >
      {langDic.ReadMore[lang]}
    </BaseComponents.Button>
    <BaseComponents.Typography
      tag="time"
      fontClass="caption2Regular"
      data-testid="Msg_DATE"
      className={styles.chatMsgDate}
    >
      {msgItem.time}
    </BaseComponents.Typography>
  </div>
);
