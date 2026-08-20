import { Button, SearchBar } from "~baseComponents";
import { i18n } from "~constants/i18n";
import type { ILangProps } from "~interfaces/common";
import styles from "./MsgSearch.module.css";

export interface IMsgSearchProps extends ILangProps {
  handleClose: () => void;
  handleOnEnter: (value: string) => void;
  handleOnChange: (value: string) => void;
}

const langDic = i18n.Common;

export const MsgSearch = ({
  lang,
  handleClose,
  handleOnEnter,
  handleOnChange,
}: IMsgSearchProps) => {
  return (
    <div data-testid="MsgSearch_WRAPPER" className={styles.searchLayout}>
      <SearchBar
        variant="slim"
        lang={lang}
        handleOnEnter={handleOnEnter}
        handleOnChange={handleOnChange}
      />
      <Button
        data-testid="MsgSearch_CLOSE"
        aria-label={langDic.CloseBtn[lang]}
        size="small"
        variant="tinted"
        onClick={handleClose}
      >
        {langDic.CloseBtn[lang]}
      </Button>
    </div>
  );
};
