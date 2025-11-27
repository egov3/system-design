import { Icons } from "@egov3/graphics";
import { i18n } from "~constants/i18n";
import type { ILangProps } from "~interfaces/common";
import styles from "./IdentityHeader.module.css";

export interface IPrimaryProps extends ILangProps {
  goMainPage: () => void;
}

export const IdentityHeader = ({ goMainPage, lang }: IPrimaryProps) => (
  <button
    aria-label={i18n.IdentityHeader.buttonIcon[lang]}
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
