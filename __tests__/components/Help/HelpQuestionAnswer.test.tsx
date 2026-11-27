import { render, screen } from "@testing-library/react";

import { HelpQuestionAnswer } from "~components";
import { i18n } from "~constants/i18n";
import { HELP_QUESTION_ANSWER } from "~constants/mock/HelpQuestionAnswer";

describe("HelpQuestionAnswer", () => {
  it("(1) Should show the answer title, updated date and text", () => {
    render(
      <HelpQuestionAnswer
        lang="kk"
        title={HELP_QUESTION_ANSWER.TITLE}
        updatedDate={HELP_QUESTION_ANSWER.UPDATED_DATE}
        html={HELP_QUESTION_ANSWER.HTML}
      />,
    );

    expect(screen.getByTestId("HelpQuestionAnswer_TITLE")).toHaveTextContent(
      HELP_QUESTION_ANSWER.TITLE,
    );
    expect(screen.getByTestId("HelpQuestionAnswer_UPDATED")).toHaveTextContent(
      `${i18n.HelpQuestionAnswer.Updated.kk} ${HELP_QUESTION_ANSWER.UPDATED_DATE}`,
    );
    expect(screen.getByTestId("HtmlContainer_WRAPPER")).toContainHTML(
      HELP_QUESTION_ANSWER.HTML,
    );
  });
});
