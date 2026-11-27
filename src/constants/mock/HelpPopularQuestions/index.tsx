import type { IHelpPopularQuestion } from "~components";

import { HELP_QUESTION_ANSWER } from "~constants/mock/HelpQuestionAnswer";
import { HELP_QUESTION_ITEM_TITLE } from "~constants/mock/HelpQuestionItem";

export const HELP_POPULAR_QUESTIONS: IHelpPopularQuestion[] = [
  {
    id: "question-1",
    title: HELP_QUESTION_ITEM_TITLE,
    answer: {
      title: HELP_QUESTION_ANSWER.TITLE,
      updatedDate: HELP_QUESTION_ANSWER.UPDATED_DATE,
      html: HELP_QUESTION_ANSWER.HTML,
    },
  },
  {
    id: "question-2",
    title: "Как изменить номер телефона?",
    answer: null,
  },
];
