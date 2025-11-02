"use client";

import { Icons } from "@egov3/graphics";
import Image from "next/image";
import { useState } from "react";
import { i18n } from "~constants/i18n";
import type { ILangGeneric, ILangProps } from "~interfaces/common";
import { languageList } from "~interfaces/TopHeader";
import { DividerIcon } from "~svg";
import { Button } from "../../baseComponents/Button";
import { Typography } from "../../baseComponents/Typography";
import styles from "./TopHeader.module.css";

export interface ITopHeaderProps extends ILangProps {
  handleLogout: () => void;
  handleBackToMainPage: () => void;
  handleLangChange: (lang: keyof ILangGeneric<string>) => void;
  isAuthorized: boolean;
  nameLabel?: string;
}

export const TopHeader = ({
  handleLogout,
  handleBackToMainPage,
  handleLangChange,
  isAuthorized,
  nameLabel,
  lang,
}: ITopHeaderProps): React.ReactNode => {
  const [openLang, setOpenLang] = useState(false);

  const AuthorizerBtnText = isAuthorized
    ? i18n.TopHeader.LogoutText[lang]
    : i18n.TopHeader.LoginText[lang];

  return (
    <header className={styles.topHeader} data-testid="TopHeader_HEADER">
      <div className={styles.topHeaderItem1} data-testid="TopHeader_ITEM1">
        <button
          data-testid="TopHeaderButton_ICON"
          aria-label={i18n.TopHeader.ButtonIcon[lang]}
          onClick={handleBackToMainPage}
          type="button"
        >
          <Icons.Logo.Egov
            className={styles.iconEgov}
            data-testid="TopHeaderEgov_ICON"
          />
        </button>
        <DividerIcon data-testid="TopHeaderDivider_ICON" />
        <div
          className={styles.nationalEmblemTitle}
          data-testid="TopHeaderNationalEmblem_TITLE"
        >
          <Image
            width={31.448}
            height={32}
            data-testid="TopHeaderNationalEmblem"
            alt={i18n.TopHeader.NationalEmblem[lang]}
            src="/NationalEmblem.webp"
          />
          <Typography
            tag="span"
            fontClass="caption2Regular"
            data-testid="TopHeaderTitle_TEXT"
            aria-label={i18n.TopHeader.TitleText[lang]}
          >
            {i18n.TopHeader.TitleText[lang]}
          </Typography>
        </div>
      </div>
      <div data-testid="TopHeader_ITEM2" className={styles.topHeaderItem2}>
        {/* TODO: Search */}
      </div>
      <div className={styles.topHeaderItem3} data-testid="TopHeader_ITEM3">
        <div className={styles.langIconWrap} data-testid="TopHeaderLang_WRAP">
          <button
            onClick={() => {
              setOpenLang(!openLang);
            }}
            type="button"
            data-testid="TopHeaderLang_BUTTON"
            aria-label={i18n.TopHeader.LangBtnAria[lang]}
          >
            <Icons.General.Language
              width={20}
              height={20}
              data-testid="TopHeaderLanguage_ICON"
            />
          </button>
          {openLang && (
            <div
              className={styles.langInterfaceWrap}
              data-testid="TopHeaderLangInterface_WRAP"
            >
              <div
                className={styles.langHeader}
                data-testid="TopHeaderLang_HEADER"
              >
                <Typography
                  tag="span"
                  fontClass="caption1Semibold"
                  data-testid="TopHeaderLang_TITLE"
                  aria-label={i18n.TopHeader.LangInterface_Title[lang]}
                >
                  {i18n.TopHeader.LangInterface_Title[lang]}
                </Typography>
              </div>
              <div
                data-testid="TopHeaderLangList_WRAP"
                className={styles.langListWrap}
              >
                {languageList.map(([langCode, langLabel]) => (
                  <button
                    onClick={() => {
                      handleLangChange(langCode);
                      setOpenLang(false);
                    }}
                    type="button"
                    key={langCode}
                    className={styles.langListBtn}
                    data-testid="TopHeaderLangList_BTN"
                    aria-label={langLabel}
                  >
                    <Typography
                      tag="span"
                      fontClass="body2Medium"
                      data-testid="TopHeaderLangList_LABEL"
                      aria-label={langLabel}
                    >
                      {langLabel}
                    </Typography>
                    <div
                      className={styles.langCheckWrap}
                      data-testid="TopHeaderLangCheck_WRAP"
                    >
                      {lang === langCode && (
                        <Icons.Basic.Check
                          width="20px"
                          height="20px"
                          data-testid="TopHeaderLangIcon_CHECK"
                        />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        <Image
          width={20}
          height={20}
          data-testid="TopHeaderBtnAccessibility_Icon"
          alt={i18n.TopHeader.TopHeaderBtnAccessibility_Icon[lang]}
          src="/img/accessibility-1.svg"
        />
        {isAuthorized && (
          <div
            className={styles.accountLabel}
            data-testid="TopHeaderAccount_LABEL"
          >
            <Icons.General.Account
              width={20}
              height={20}
              data-testid="TopHeaderBtnAccount_Icon"
              aria-label={i18n.TopHeader.TopHeaderBtnAccount_Icon[lang]}
            />
            <Typography
              tag="span"
              fontClass="caption1Medium"
              data-testid="TopHeaderName_LABEL"
              aria-label={nameLabel}
            >
              {nameLabel}
            </Typography>
          </div>
        )}
        <Button
          ariaLabel={i18n.TopHeader.TopHeaderLoginOrLogout_BTN[lang]}
          isRounded={true}
          data-testid="TopHeaderLoginOrLogout_BTN"
          size="small"
          onClick={handleLogout}
        >
          {AuthorizerBtnText}
        </Button>
      </div>
    </header>
  );
};
