import { Icons } from "@egov3/graphics";
import type { Dispatch, SetStateAction } from "react";
import { BaseComponents } from "~baseComponents";
import { i18n } from "~constants/i18n";
import type { ILangProps } from "~interfaces/common";
import { IconToggleItem } from "../IconToggleItem";
import styles from "./SetUpAccess.module.css";

export interface ISetUpAccessProps extends ILangProps {
  lock: boolean;
  unlock: Dispatch<SetStateAction<boolean>>;
  setClose: Dispatch<SetStateAction<boolean>>;
  close: boolean;
}

export const SetUpAccess = ({
  lock,
  unlock,
  setClose,
  close,
  lang,
}: ISetUpAccessProps) => {
  const langDic = i18n.SetUpAccess;
  return (
    <>
      <div data-testid="SetUpAccess_WRAP" className={styles.wrap}>
        <IconToggleItem
          Icon={Icons.Logo.Kaspi}
          lock={lock}
          unlock={unlock}
          text={langDic.KaspiBank[lang]}
        />
        <IconToggleItem
          Icon={Icons.Logo.Halyk}
          lock={lock}
          unlock={unlock}
          text={langDic.HalykBank[lang]}
        />
        <BaseComponents.Typography
          tag="span"
          data-testid="SetUpAccess_INFO"
          className={styles.info}
          aria-label={langDic.SetUpAccessInfo[lang]}
          fontClass="caption1Regular"
        >
          {langDic.SetUpAccessInfo[lang]}
        </BaseComponents.Typography>
      </div>
      <div data-testid="SetUpAccessBtn_WRAP" className={styles.wrap}>
        <BaseComponents.Button
          className={styles.button}
          aria-label={langDic.SetUpAccessBtnSave[lang]}
          onClick={() => {
            setClose(!close);
          }}
          size="large"
          data-testid="SetUpAccessBtn_SAVE"
        >
          {langDic.SetUpAccessBtnSave[lang]}
        </BaseComponents.Button>
      </div>
    </>
  );
};
