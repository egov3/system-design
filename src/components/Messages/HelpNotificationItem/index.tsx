import { Typography } from "~baseComponents";
import { i18n } from "~constants/i18n";
import type { ILangProps } from "~interfaces/common";
import { joinClasses } from "~utils/joinClasses";
import styles from "./HelpNotificationItem.module.css";

export interface IHelpItemProps extends ILangProps {
  isRead: boolean;
  isUnderline?: boolean;
}

const langDic = i18n.HelpNotificationItem;

export const HelpNotificationItem = ({
  lang,
  isRead,
  isUnderline,
}: IHelpItemProps) => {
  const textContent = isRead
    ? langDic.NotificationsMessageRead[lang]
    : langDic.NotificationsMessageNotRead[lang];

  return (
    <div
      className={
        isUnderline
          ? joinClasses(styles.notificationContent, styles.notificationLine)
          : styles.notificationContent
      }
      data-testid="HelpNotification_CONTENT"
    >
      <Typography
        tag="span"
        fontClass="body2Regular"
        data-testid="HelpNotificationMessage_READ"
        aria-label={textContent}
      >
        {textContent}
      </Typography>
      <div
        className={joinClasses(
          styles.readMoreWrapper,
          styles[`readMoreWrapper-${isRead ? "secondary" : "tinted"}`],
        )}
        data-testid="NotificationsReadMore_WRAPPER"
      >
        <Typography
          tag="span"
          fontClass="caption1Medium"
          data-testid="NotificationsReadMore_TEXT"
          aria-label={langDic.ReadMore[lang]}
        >
          {langDic.ReadMore[lang]}
        </Typography>
      </div>
    </div>
  );
};
