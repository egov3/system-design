import { Icons } from "@egov3/graphics";
import React from "react";
import { BaseComponents } from "~baseComponents";
import type { IMsgDataItem } from "~interfaces/Messages";
import { joinClasses } from "~utils/joinClasses";
import styles from "./MsgByType.module.css";

export const MsgByType = ({ msgItem }: { msgItem: IMsgDataItem }) => (
  <>
    {msgItem.header && (
      <div className={styles.titleWrapper}>
        <BaseComponents.Typography
          tag="span"
          fontClass="caption1Regular"
          className={styles.titleCategory}
        >
          {msgItem.header.serviceName}
        </BaseComponents.Typography>
        <BaseComponents.Typography
          tag="span"
          fontClass="caption1Regular"
          className={styles.title}
        >
          {msgItem.header.type}
        </BaseComponents.Typography>
      </div>
    )}
    {msgItem.description.map((item) => (
      <React.Fragment key={item.text}>
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
          <div
            className={joinClasses(
              styles.chatMsgText,
              styles["chatMsgText-inProgress"],
            )}
          >
            <Icons.Additional.TimeFilled />
            {item.text}
          </div>
        )}
        {item.type === "info" && (
          <div
            className={joinClasses(
              styles.chatMsgText,
              styles["chatMsgText-info"],
            )}
          >
            <Icons.General.InfoFilled />
            {item.text}
          </div>
        )}
      </React.Fragment>
    ))}
  </>
);
