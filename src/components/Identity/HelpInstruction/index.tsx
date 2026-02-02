import { BaseComponents } from "~baseComponents";
import { i18n } from "~constants/i18n";
import type { ILangProps } from "~interfaces/common";
import styles from "./HelpInstruction.module.css";

export const HelpInstruction = ({ lang }: ILangProps) => {
  const langDic = i18n.HelpInstruction;

  return (
    <div className={styles.wrap} data-testid="HelpInstruction_WRAP">
      <BaseComponents.Typography
        aria-label={langDic.needHeld[lang]}
        data-testid="HelpInstructionNeed_HELP"
        fontClass="caption1Regular"
        tag="span"
      >
        {langDic.needHeld[lang]}
      </BaseComponents.Typography>
      <BaseComponents.Typography
        aria-label={langDic.downloadInstructions[lang]}
        data-testid="HelpInstruction_DOWNLOAD"
        fontClass="caption1Regular"
        tag="span"
      >
        <a
          className={styles.link}
          data-testid="HelpInstruction_LINK"
          href={"https://egov.kz/cms/ru/articles/communications/egovkzbot"}
          rel="noopener noreferrer"
          target="_blank"
        >
          {langDic.downloadInstructions[lang]}
        </a>
      </BaseComponents.Typography>
    </div>
  );
};
