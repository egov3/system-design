import Icons from "@egov3/graphics";

import type { ILangProps } from "~interfaces/common";

import styles from "./IdentityHeader.module.css";

export interface IIdentityHeaderProps extends ILangProps {
  goBackService: () => void;
  goMain: () => void;
}
export const IdentityHeader = ({
  goBackService,
  goMain,
  lang,
}: IIdentityHeaderProps) => {
  const langDic = {
    ariaAuthorizationPageBtn: {
      ru: "Кнопка для перехода на страницу авторизации",
      kk: "kkКнопка для перехода на страницу авторизации",
      en: "enКнопка для перехода на страницу авторизации",
    },
    ariaBackButton: {
      ru: "Кнопка для перехода назад",
      kk: "kkКнопка для перехода назад",
      en: "enКнопка для перехода назад",
    },
  };

  return (
    <div data-testid="IdentityHeader_WRAPPER" className={styles.identityHeader}>
      <button
        aria-label={langDic.ariaBackButton[lang]}
        className={styles.regGoBack}
        data-testid="IdentityHeaderGoBack_BTN"
        onClick={goBackService}
        type="button"
      >
        <Icons.Basic.ChevronLeft width="18px" height="18px" />
      </button>
      <button
        aria-label={langDic.ariaAuthorizationPageBtn[lang]}
        className={styles.logo}
        data-testid="IdentityHeaderGoMain_BTN"
        onClick={goMain}
        type="button"
      >
        <Icons.Logo.Egov width="69px" height="24px" />
      </button>
      <div
        data-testid="IdentityHeaderBtn_CLOSE"
        className={styles.regCloseBtn}
      ></div>
    </div>
  );
};
