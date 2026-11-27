import { fireEvent, render, screen } from "@testing-library/react";

import { HelpPopularQuestions } from "~components";
import { HELP_POPULAR_QUESTIONS } from "~constants/mock/HelpPopularQuestions";

const [questionWithAnswer, questionWithoutAnswer] = HELP_POPULAR_QUESTIONS;

const renderQuestions = (openQuestionId: string | null) => {
  const onToggle = jest.fn();
  render(
    <HelpPopularQuestions
      lang="kk"
      title="Танымал сұрақтар"
      questions={HELP_POPULAR_QUESTIONS}
      openQuestionId={openQuestionId}
      onToggle={onToggle}
    />,
  );

  return onToggle;
};

describe("HelpPopularQuestions", () => {
  it("(1) Should call onToggle with the clicked question id", () => {
    const onToggle = renderQuestions(null);

    fireEvent.click(
      screen.getByRole("button", { name: questionWithoutAnswer.title }),
    );

    expect(onToggle).toHaveBeenCalledWith(questionWithoutAnswer.id);
  });

  it("(2) Should show the answer only for the open question", () => {
    renderQuestions(questionWithAnswer.id);

    expect(screen.getAllByTestId("HelpQuestionAnswer_WRAPPER")).toHaveLength(1);
    expect(screen.getByTestId("HelpQuestionAnswer_TITLE")).toHaveTextContent(
      questionWithAnswer.answer?.title ?? "",
    );
  });

  it("(3) Should not show an answer that is not loaded yet", () => {
    renderQuestions(questionWithoutAnswer.id);

    expect(
      screen.queryByTestId("HelpQuestionAnswer_WRAPPER"),
    ).not.toBeInTheDocument();
  });
});
