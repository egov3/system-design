import { TimeFilledIcon } from "@egov3/graphics/Additional/TimeFilled";
import { CheckedFilledIcon } from "@egov3/graphics/General/CheckedFilled";
import { InfoFilledIcon } from "@egov3/graphics/General/InfoFilled";
import { WarningFilledIcon } from "@egov3/graphics/General/WarningFilled";
import { Button, Typography } from "~baseComponents";
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
      <Typography
        tag="span"
        fontClass="caption1Regular"
        className={styles.titleCategory}
      >
        {msgItem.header.service}
      </Typography>
      <Typography
        tag="span"
        fontClass="caption1Regular"
        className={styles.title}
      >
        {msgItem.header.message}
      </Typography>
    </div>
    <div
      data-testid="MsgBodyDescription_WRAPPER"
      className={styles.descriptionWrapper}
    >
      {msgItem.description?.map((item) => (
        <div key={item.text}>
          {item.type === "error" && (
            <Typography
              tag="span"
              fontClass="body2Regular"
              className={joinClasses(
                styles.chatMsgText,
                styles["chatMsgText-error"],
              )}
            >
              <WarningFilledIcon />
              {item.text}
            </Typography>
          )}
          {item.type === "success" && (
            <Typography
              tag="span"
              fontClass="body2Regular"
              className={joinClasses(
                styles.chatMsgText,
                styles["chatMsgText-success"],
              )}
            >
              <CheckedFilledIcon />
              {item.text}
            </Typography>
          )}
          {item.type === "inProgress" && (
            <Typography
              tag="span"
              fontClass="body2Regular"
              className={joinClasses(
                styles.chatMsgText,
                styles["chatMsgText-inProgress"],
              )}
            >
              <TimeFilledIcon />
              {item.text}
            </Typography>
          )}
          {item.type === "info" && (
            <Typography
              tag="span"
              fontClass="body2Regular"
              className={joinClasses(
                styles.chatMsgText,
                styles["chatMsgText-info"],
              )}
            >
              <InfoFilledIcon />
              {item.text}
            </Typography>
          )}
        </div>
      ))}
    </div>
    <Button
      aria-label={langDic.AriaReadMoreButton[lang]}
      onClick={handleDetailsClick}
      variant={msgItem.isRead ? "secondary" : "tinted"}
      className={styles.readMoreBtn}
      disabled={msgItem.disabled}
    >
      {langDic.ReadMore[lang]}
    </Button>
    <Typography
      tag="time"
      fontClass="caption2Regular"
      data-testid="Msg_DATE"
      className={styles.chatMsgDate}
    >
      {msgItem.time}
    </Typography>
  </div>
);
