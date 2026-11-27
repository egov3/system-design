import type { ILangProps } from "~interfaces/common";

import { HtmlContainer, Typography } from "~baseComponents";
import { i18n } from "~constants/i18n";

import styles from "./HelpQuestionAnswer.module.css";

export interface IHelpQuestionAnswerProps extends ILangProps {
  title: string;
  updatedDate: string;
  html: string;
}

const langDic = i18n.HelpQuestionAnswer;

export const HelpQuestionAnswer = ({
  lang,
  title,
  updatedDate,
  html,
}: IHelpQuestionAnswerProps) => (
  <div className={styles.answer} data-testid="HelpQuestionAnswer_WRAPPER">
    <Typography
      data-testid="HelpQuestionAnswer_TITLE"
      fontClass="heading3"
      tag="h3"
    >
      {title}
    </Typography>
    <Typography
      className={styles.updated}
      data-testid="HelpQuestionAnswer_UPDATED"
      fontClass="caption1Regular"
      tag="span"
    >
      {`${langDic.Updated[lang]} ${updatedDate}`}
    </Typography>
    <HtmlContainer html={html} />
  </div>
);
