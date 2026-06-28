import { NotificationIcon } from "@egov3/graphics/General/Notification";
import { ServicesOutlineIcon } from "@egov3/graphics/General/ServicesOutline";
import { Typography } from "~baseComponents";
import { i18n } from "~constants/i18n";
import type { ILangProps } from "~interfaces/common";
import type { TMsgSubMenuKeys } from "~interfaces/Messages";
import styles from "./EmptyMessages.module.css";

export interface IEmptyMessagesProps extends ILangProps {
  pageType: TMsgSubMenuKeys;
}

const langDic = i18n.EmptyMessages;

export const EmptyMessages = ({ pageType, lang }: IEmptyMessagesProps) => (
  <div data-testid="MsgPageComponents_EMPTY">
    <div
      data-testid="MsgEmptyIcon_WRAPPER"
      className={styles.msgEmptyIconLayout}
    >
      <div data-testid="MsgEmpty_ICON" className={styles.msgEmptyIcon}>
        {pageType === "NOTIFICATIONS" ? (
          <NotificationIcon />
        ) : (
          <ServicesOutlineIcon />
        )}
      </div>
    </div>
    <div
      data-testid="MsgEmptyText_WRAPPER"
      className={styles.msgEmptyTextLayout}
    >
      <Typography
        tag="span"
        fontClass="body2Regular"
        className={styles.msgEmptyText}
      >
        {pageType === "NOTIFICATIONS"
          ? langDic.NotificationsMessageEmpty[lang]
          : langDic.ServiceMessageEmpty[lang]}
      </Typography>
    </div>
  </div>
);
