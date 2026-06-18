import { EgovIcon } from "@egov3/graphics/Logo/Egov";
import { i18n } from "~constants/i18n";
import type { ILangProps } from "~interfaces/common";
import styles from "./IdentityHeader.module.css";

export interface IPrimaryProps extends ILangProps {
  goMainPage: () => void;
}

export const IdentityHeader = ({ goMainPage, lang }: IPrimaryProps) => (
  <button
    aria-label={i18n.IdentityHeader.ButtonIcon[lang]}
    className={styles.mainIconJustify}
    data-testid="IdentityModule_BTN_LOGO"
    onClick={goMainPage}
    type="button"
  >
    <EgovIcon
      width="138px"
      height="48px"
      data-testid="IdentityModule_BTN_LOGO_ICON"
    />
  </button>
);
