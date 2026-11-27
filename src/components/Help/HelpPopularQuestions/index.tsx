import type { ILangProps } from "~interfaces/common";

import { Label } from "~baseComponents";

import {
  type IHelpQuestionAnswerProps,
  HelpQuestionAnswer,
} from "../HelpQuestionAnswer";
import { HelpQuestionItem } from "../HelpQuestionItem";
import styles from "./HelpPopularQuestions.module.css";

export interface IHelpPopularQuestion {
  id: string;
  title: string;
  answer: Omit<IHelpQuestionAnswerProps, "lang"> | null;
}

export interface IHelpPopularQuestionsProps extends ILangProps {
  title: string;
  questions: IHelpPopularQuestion[];
  openQuestionId: string | null;
  onToggle: (questionId: string) => void;
}

export const HelpPopularQuestions = ({
  lang,
  title,
  questions,
  openQuestionId,
  onToggle,
}: IHelpPopularQuestionsProps) => (
  <div className={styles.page} data-testid="HelpPopularQuestions_PAGE">
    <Label isSpaced={true} text={title} variant="big" />
    <div className={styles.list} data-testid="HelpPopularQuestions_LIST">
      {questions.map((question) => (
        <HelpQuestionItem
          key={question.id}
          title={question.title}
          isOpen={question.id === openQuestionId}
          onToggle={() => {
            onToggle(question.id);
          }}
        >
          {question.answer !== null && (
            <HelpQuestionAnswer lang={lang} {...question.answer} />
          )}
        </HelpQuestionItem>
      ))}
    </div>
  </div>
);
