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
          text={langDic.kaspiBank[lang]}
        />
        <IconToggleItem
          Icon={Icons.Logo.Halyk}
          lock={lock}
          unlock={unlock}
          text={langDic.halykBank[lang]}
        />
        <BaseComponents.Typography
          tag="span"
          data-testid="SetUpAccess_INFO"
          className={styles.info}
          aria-label={langDic.setUpAccessInfo[lang]}
          fontClass="caption1Regular"
        >
          {langDic.setUpAccessInfo[lang]}
        </BaseComponents.Typography>
      </div>
      <div data-testid="SetUpAccessBtn_WRAP" className={styles.wrap}>
        <BaseComponents.Button
          className={styles.button}
          aria-label={langDic.setUpAccessBtnSave[lang]}
          onClick={() => setClose(!close)}
          size="large"
          data-testid="SetUpAccessBtn_SAVE"
        >
          {langDic.setUpAccessBtnSave[lang]}
        </BaseComponents.Button>
      </div>
    </>
  );
};
