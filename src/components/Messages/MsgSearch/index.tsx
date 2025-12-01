import { Icons } from "@egov3/graphics";
import { useState } from "react";
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
}: IMsgSearchProps) => {
  const [value, setValue] = useState("");
  return (
    <div data-testid="MsgSearch_WRAPPER" className={styles.searchLayout}>
      <div
        data-testid="InputContainer_WRAPPER"
        className={styles.inputContainer}
      >
        <Icons.General.Search
          width={16}
          height={16}
          className={styles.searchIcon}
        />
        <input
          data-testid="MsgSearch_INPUT"
          value={value}
          aria-label={langDic.MsgSearchInputPlaceHolder[lang]}
          placeholder={langDic.MsgSearchInputPlaceHolder[lang]}
          onChange={(e) => {
            setValue(e.target.value);
            handleInputChange(e.target.value);
          }}
          className={styles.input}
        />
        {value && (
          <Icons.General.Clear
            width={16}
            height={16}
            className={styles.clearIcon}
            onClick={() => {
              setValue("");
              handleInputChange("");
            }}
          />
        )}
      </div>
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
};
