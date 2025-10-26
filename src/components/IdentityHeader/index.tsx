import Icons from "@egov3/graphics";
import { i18n } from "~constants/i18n";
import type { ILangProps } from "~interfaces/common";
import styles from "./IdentityHeader.module.css";

export interface IPrimaryProps extends ILangProps {
  goMainPage: () => void;
}

export const Primary = ({ goMainPage, lang }: IPrimaryProps) => (
  <button
    aria-label={i18n.IdentityHeader.ButtonIcon[lang]}
    className={styles.mainIconJustify}
    data-testid="IdentityModule_BTN_LOGO"
    onClick={goMainPage}
    type="button"
  >
    <Icons.Logo.Egov
      width="138px"
      height="48px"
      data-testid="IdentityModule_BTN_LOGO_ICON"
    />
  </button>
);

export interface ISecondaryProps extends ILangProps {
  goBackService: () => void;
  goIdentityMain: () => void;
}

export const Secondary = ({
  goBackService,
  goIdentityMain,
  lang,
}: ISecondaryProps) => (
  <div data-testid="IdentityHeader_WRAPPER" className={styles.identityHeader}>
    <button
      aria-label={i18n.IdentityHeader.ariaBackButton[lang]}
      className={styles.regGoBack}
      data-testid="IdentityHeaderGoBack_BTN"
      onClick={goBackService}
      type="button"
    >
      <Icons.Basic.ChevronLeft width="18px" height="18px" />
    </button>
    <button
      aria-label={i18n.IdentityHeader.ariaAuthorizationPageBtn[lang]}
      className={styles.logo}
      data-testid="IdentityHeaderGoMain_BTN"
      onClick={goIdentityMain}
      type="button"
    >
      <Icons.Logo.Egov width="69px" height="24px" />
    </button>
    <div data-testid="IdentityHeaderBtn_CLOSE" className={styles.regCloseBtn} />
  </div>
);

export const IdentityHeader = {
  Primary,
  Secondary,
};
