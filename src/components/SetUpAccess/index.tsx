import { Icons } from "@egov3/graphics";
import SystemDesign from "@egov3/system-design";
import type { Dispatch, SetStateAction } from "react";
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
  const SetUpAccessLang = i18n.SetUpAccess;
  return (
    <>
      <div data-testid="SetUpAccess_WRAP" className={styles.wrap}>
        <IconToggleItem
          Icon={Icons.Logo.Kaspi}
          lock={lock}
          unlock={unlock}
          text={SetUpAccessLang.kaspiBank[lang]}
        />
        <IconToggleItem
          Icon={Icons.Logo.Halyk}
          lock={lock}
          unlock={unlock}
          text={SetUpAccessLang.halykBank[lang]}
        />
        <SystemDesign.BaseComponents.Typography
          tag="span"
          data-testid="SetUpAccess_INFO"
          className={styles.info}
          aria-label={SetUpAccessLang.setUpAccessInfo[lang]}
          fontClass="caption1Regular"
        >
          {SetUpAccessLang.setUpAccessInfo[lang]}
        </SystemDesign.BaseComponents.Typography>
      </div>
      <div data-testid="SetUpAccessBtn_WRAP" className={styles.wrap}>
        <SystemDesign.BaseComponents.Button
          className={styles.button}
          ariaLabel={SetUpAccessLang.setUpAccessBtnSave[lang]}
          onClick={() => setClose(!close)}
          size="large"
          dataTestid="SetUpAccessBtn_SAVE"
        >
          {SetUpAccessLang.setUpAccessBtnSave[lang]}
        </SystemDesign.BaseComponents.Button>
      </div>
    </>
  );
};
