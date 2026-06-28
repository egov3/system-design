import { Modal, Typography } from "~baseComponents";
import { languageList } from "~constants/common";
import { i18n } from "~constants/i18n";
import type { ILangProps } from "~interfaces/common";
import { joinClasses } from "~utils/joinClasses";
import styles from "./IdentityModal.module.css";

export interface IIdentityModalProps extends ILangProps {
  children: React.ReactNode;
  goBackService(): void;
  handleLangChange?: (langCode: string) => void;
  handleLogoClick: () => void;
}

export const IdentityModal = ({
  children,
  goBackService,
  handleLangChange,
  lang,
  handleLogoClick,
}: IIdentityModalProps) => {
  const langDic = i18n.Common;

  return (
    <div
      className={styles.overlayModalFix}
      data-testid="IdentityModule_OVERLAY"
    >
      <Modal
        variant="small"
        isWithOverlay={false}
        lang="ru"
        isAnimated={false}
        header={{
          handleHeaderLogoClick: handleLogoClick,
          goBackService: goBackService,
        }}
        isContentScroll={false}
      >
        <div className={styles.loginBox} data-testid="IdentityModule_LOGIN_BOX">
          <div
            className={styles.loginBody}
            data-testid="IdentityModule_LOGIN_BODY"
          >
            {children}
          </div>
        </div>
      </Modal>
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
              <Typography
                aria-label={langLabel}
                data-testid={`IdentityModule_FOOTER_${langCode}`}
                fontClass="caption1Semibold"
                tag="span"
              >
                {langCode.toLocaleUpperCase()}
              </Typography>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
