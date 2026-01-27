import { BaseComponents } from "~baseComponents";
import { i18n } from "~constants/i18n";
import type { ILangProps } from "~interfaces/common";
import styles from "./MsgSearch.module.css";

export interface IMsgSearchProps extends ILangProps {
  handleClose: () => void;
  handleOnEnter: (value: string) => void;
}

const langDic = i18n.Common;

export const MsgSearch = ({
  lang,
  handleClose,
  handleOnEnter,
}: IMsgSearchProps) => {
  return (
    <div data-testid="MsgSearch_WRAPPER" className={styles.searchLayout}>
      <BaseComponents.SearchBar
        variant="slim"
        lang={lang}
        handleOnEnter={handleOnEnter}
      />
      <BaseComponents.Button
        data-testid="MsgSearch_CLOSE"
        aria-label={langDic.CloseBtn[lang]}
        size="small"
        variant="tinted"
        onClick={handleClose}
      >
        {langDic.CloseBtn[lang]}
      </BaseComponents.Button>
    </div>
  );
};
