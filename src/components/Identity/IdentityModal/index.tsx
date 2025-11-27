import { BaseComponents } from "~baseComponents";
import { languageList } from "~constants/common";
import { i18n } from "~constants/i18n";
import type { ILangProps, IRouterClosure } from "~interfaces/common";
import { joinClasses } from "~utils/joinClasses";
import { IdentityHeader } from "../IdentityHeader";
import styles from "./IdentityModal.module.css";

export interface IIdentityModalProps extends ILangProps {
  children: React.ReactNode;
  goBackService(): void;
  handleLangChange?: (langCode: string) => void;
  isMain: boolean;
  navigator: (closure: IRouterClosure) => () => void;
}

export const IdentityModal = ({
  children,
  goBackService,
  handleLangChange,
  isMain,
  lang,
  navigator,
}: IIdentityModalProps) => {
  const langDic = i18n.Common;
  const goMainClosure = {
    primary: { owner: "IdentityModal", route: "/" },
    secondary: { owner: "IdentityModal", route: "/identity/main" },
  };

  return (
    <>
      <BaseComponents.Modal
        variant="small"
        withOverlay={false}
        lang="ru"
        header={
          isMain
            ? undefined
            : {
                goIdentityMain: navigator(goMainClosure.secondary),
                goBackService: goBackService,
              }
        }
      >
        <div className={styles.loginBox} data-testid="IdentityModule_LOGIN_BOX">
          <div
            className={styles.loginBody}
            data-testid="IdentityModule_LOGIN_BODY"
          >
            {isMain && (
              <IdentityHeader
                goMainPage={navigator(goMainClosure.primary)}
                lang={lang}
              />
            )}
            {children}
          </div>
        </div>
      </BaseComponents.Modal>
      {handleLangChange && (
        <div
          className={styles.langFooterWrapper}
          data-testid="IdentityModule_FOOTER"
        >
          {languageList.map(([langCode, langLabel]) => (
            <button
              type="button"
              data-testid={`IdentityModule_FOOTER_BTN_${langCode}`}
              key={langCode}
              className={joinClasses(
                styles.langFooter,
                langCode === lang
                  ? styles.langFooterActive
                  : styles.langFooterNotActive,
              )}
              aria-label={langDic.LangBtnAria[lang]}
              onClick={() => {
                handleLangChange(langCode);
              }}
            >
              <BaseComponents.Typography
                aria-label={langLabel}
                data-testid={`IdentityModule_FOOTER_${langCode}`}
                fontClass="caption1Semibold"
                tag="span"
              >
                {langCode.toLocaleUpperCase()}
              </BaseComponents.Typography>
            </button>
          ))}
        </div>
      )}
    </>
  );
};
