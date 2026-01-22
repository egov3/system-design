import { BaseComponents } from "~baseComponents";
import { i18n } from "~constants/i18n";
import type { ILangProps } from "~interfaces/common";
import styles from "./HelpInstruction.module.css";

export const HelpInstruction = ({ lang }: ILangProps) => {
  const langDic = i18n.HelpComponent;

  return (
    <div className={styles.wrap} data-testid="HelpComponent_WRAP">
      <BaseComponents.Typography
        aria-label={langDic.NeedHeld[lang]}
        data-testid="HelpComponentNeed_HELP"
        fontClass="caption1Regular"
        tag="span"
      >
        {langDic.NeedHeld[lang]}
      </BaseComponents.Typography>
      <BaseComponents.Typography
        aria-label={langDic.DownloadInstructions[lang]}
        data-testid="HelpComponent_INSTRUCTIONS"
        fontClass="caption1Regular"
        tag="span"
      >
        <a
          className={styles.link}
          data-testid="IdentityLink_INSTRUCTIONS"
          href={"https://egov.kz/cms/ru/articles/communications/egovkzbot"}
          rel="noopener noreferrer"
          target="_blank"
        >
          {langDic.DownloadInstructions[lang]}
        </a>
      </BaseComponents.Typography>
    </div>
  );
};
