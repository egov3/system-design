import { Icons } from "@egov3/graphics";
import { BaseComponents } from "~baseComponents";
import { i18n } from "~constants/i18n";
import type { ILangProps } from "~interfaces/common";
import { HelpNotification } from "../HelpNotification";
import { HelpNotificationItem } from "../HelpNotificationItem";
import styles from "./MsgComponentHeader.module.css";

export interface MsgComponentHeaderProps extends ILangProps {
  headerText: string;
  headerAriaLabel: string;
  handleOpenSearch: () => void;
  handleReadAll: () => void;
}

const langDic = i18n.MsgComponentHeader;

export const MsgComponentHeader = ({
  lang,
  headerText,
  headerAriaLabel,
  handleOpenSearch,
  handleReadAll,
}: MsgComponentHeaderProps) => (
  <>
    <BaseComponents.Typography
      data-testid="MsgPageComponents_SECTION_TITLE"
      className={styles.msgContentHeaderTitle}
      tag="h1"
      fontClass="body1Medium"
      aria-label={headerAriaLabel}
    >
      {headerText}
    </BaseComponents.Typography>
    <div
      data-testid="MsgContentHeaderIcons_WRAPPER"
      className={styles.msgContentHeaderIconsLayout}
    >
      <div
        className={styles.msgContentHeaderIcons}
        data-testid="MsgPageComponents_ICONS"
      >
        <HelpNotification
          ariaLabel={langDic.AriaSearchButton[lang]}
          dataTestid="MsgHelpNotification_SEARCH"
          icon={<Icons.General.Search data-testid="MsgIcons_SEARCH" />}
          handleOnClick={() => {
            handleOpenSearch();
          }}
        >
          <BaseComponents.Typography
            tag="span"
            fontClass="body2Regular"
            aria-label={langDic.NotificationsStartSearching[lang]}
            data-testid="NotificationsStart_SEARCHING"
          >
            {langDic.NotificationsStartSearching[lang]}
          </BaseComponents.Typography>
        </HelpNotification>
        <HelpNotification
          ariaLabel={langDic.ReadAllBtn[lang]}
          dataTestid="MsgHelpNotification_CHECK"
          icon={<Icons.General.MessagesCheck data-testid="MsgIcons_READ" />}
          handleOnClick={handleReadAll}
        >
          <BaseComponents.Typography
            tag="span"
            fontClass="body2Regular"
            aria-label={langDic.NotificationsMarkAllMessages[lang]}
            data-testid="NotificationsMarkAll_MESSAGES"
            className={styles.messagesCheckText}
          >
            {langDic.NotificationsMarkAllMessages[lang]}
          </BaseComponents.Typography>
        </HelpNotification>
        <HelpNotification
          ariaLabel={langDic.AriaNotificationButton[lang]}
          dataTestid="MsgHelpNotification_HELP"
          icon={<Icons.General.Help />}
        >
          <HelpNotificationItem lang={lang} isRead={true} isUnderline={true} />
          <HelpNotificationItem lang={lang} isRead={false} />
        </HelpNotification>
      </div>
    </div>
  </>
);
