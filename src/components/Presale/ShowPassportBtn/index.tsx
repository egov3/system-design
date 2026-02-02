import type { Dispatch, SetStateAction } from "react";
import { BaseComponents } from "~baseComponents";
import { i18n } from "~constants/i18n";
import type { ILangProps } from "~interfaces/common";
import { joinClasses } from "~utils/joinClasses";
import styles from "./ShowPassportBtn.module.css";

export interface IShowPassportBtnProps extends ILangProps {
  setShowPassport: Dispatch<SetStateAction<boolean>>;
  showPassport: boolean;
}

export const ShowPassportBtn = ({
  setShowPassport,
  showPassport,
  lang,
}: IShowPassportBtnProps) => {
  const langDic = i18n.Services.titles;

  return (
    <BaseComponents.Button
      aria-label={langDic.passportBtnText[lang]}
      data-testid="ShowPassport_BTN"
      onClick={() => {
        setShowPassport(!showPassport);
      }}
      size="small"
      variant="tinted"
      className={joinClasses(styles.errorBtn, styles.serviceDetailsPassport)}
    >
      <BaseComponents.Typography
        data-testid="ShowPassport_SPAN"
        fontClass="caption1Medium"
        tag="span"
      >
        {langDic.passportBtnText[lang]}
      </BaseComponents.Typography>
    </BaseComponents.Button>
  );
};
