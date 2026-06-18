import { HelpIcon } from "@egov3/graphics/General/Help";
import { MessagesCheckIcon } from "@egov3/graphics/General/MessagesCheck";
import { SearchIcon } from "@egov3/graphics/General/Search";
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
          icon={<SearchIcon data-testid="MsgIcons_SEARCH" />}
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
          icon={<MessagesCheckIcon data-testid="MsgIcons_READ" />}
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
          icon={<HelpIcon />}
        >
          <HelpNotificationItem lang={lang} isRead={true} isUnderline={true} />
          <HelpNotificationItem lang={lang} isRead={false} />
        </HelpNotification>
      </div>
    </div>
  </>
);
