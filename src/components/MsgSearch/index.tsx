import { Icons } from "@egov3/graphics";
import { BaseComponents } from "~baseComponents";
import { i18n } from "~constants/i18n";
import type { ILangProps } from "~interfaces/common";
import styles from "./MsgSearch.module.css";

export interface IMsgSearchProps extends ILangProps {
  handleClose: () => void;
  handleInputChange: (value: string) => void;
}

const langDic = i18n.MsgSearch;

export const MsgSearch = ({
  lang,
  handleClose,
  handleInputChange,
}: IMsgSearchProps) => (
  <div data-testid="MsgSearch_WRAPPER" className={styles.searchLayout}>
    <BaseComponents.InputField
      id="MsgSearch"
      data-testid="MsgSearch_INPUT"
      ariaLabel={langDic.MsgSearchInputPlaceHolder[lang]}
      placeholder={langDic.MsgSearchInputPlaceHolder[lang]}
      inputLeftIcon={<Icons.General.Search width="16" height="16" />}
      onChange={(e) => handleInputChange(e.target.value)}
      className={styles.inputContainer}
    />
    <BaseComponents.Button
      data-testid="MsgSearch_CLOSE"
      aria-label={langDic.MsgSearchButton[lang]}
      size="small"
      variant="tinted"
      onClick={handleClose}
    >
      {langDic.MsgSearchButton[lang]}
    </BaseComponents.Button>
  </div>
);
