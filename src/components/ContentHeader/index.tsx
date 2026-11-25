import { UpdateIcon } from "@egov3/graphics/General/Update";

import type { ILangProps } from "~interfaces/common";

import { Typography } from "~baseComponents";
import { i18n } from "~constants/i18n";

import styles from "./ContentHeader.module.css";

export interface IContentHeaderProps extends ILangProps {
  isUpdateBtn?: boolean;
  title: string;
  handleUpdateData: () => void;
  updatedText: string;
}

export const ContentHeader = ({
  lang,
  isUpdateBtn = true,
  title,
  handleUpdateData,
  updatedText,
}: IContentHeaderProps) => {
  const langDic = i18n.ContentHeader;

  return (
    <div className={styles.wrapper} data-testid="ContentHeader_WRAPPER">
      <Typography
        aria-label={title}
        data-testid="ContentHeader_TITLE"
        fontClass="body1Medium"
        tag="span"
      >
        {title}
      </Typography>
      {isUpdateBtn && (
        <div className={styles.update} data-testid="ContentHeader_UPDATE">
          <Typography
            aria-label={updatedText}
            data-testid="ContentHeader_CONTENT"
            fontClass="caption1Regular"
            tag="span"
          >
            {updatedText}
          </Typography>
          <button
            type="button"
            aria-label={langDic.updateButton[lang]}
            className={styles.updateBtn}
            data-testid="ContentHeader_BUTTON"
            onClick={handleUpdateData}
          >
            <UpdateIcon width={20} height={20} />
          </button>
        </div>
      )}
    </div>
  );
};
