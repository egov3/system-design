import { fireEvent, render, screen } from "@testing-library/react";

import { HelpQuestionItem } from "~components";
import { HELP_QUESTION_ITEM_TITLE } from "~constants/mock/HelpQuestionItem";

const renderItem = (isOpen: boolean) => {
  const onToggle = jest.fn();
  render(
    <HelpQuestionItem
      title={HELP_QUESTION_ITEM_TITLE}
      isOpen={isOpen}
      onToggle={onToggle}
    >
      <p data-testid="ANSWER">answer</p>
    </HelpQuestionItem>,
  );

  return onToggle;
};

describe("HelpQuestionItem", () => {
  it("(1) Should call onToggle and hide the content while closed", () => {
    const onToggle = renderItem(false);

    fireEvent.click(
      screen.getByRole("button", { name: HELP_QUESTION_ITEM_TITLE }),
    );

    expect(onToggle).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId("HelpQuestionItem_ICON_CLOSED")).toBeVisible();
    expect(screen.queryByTestId("ANSWER")).not.toBeInTheDocument();
  });

  it("(2) Should show the content and the open icon when open", () => {
    renderItem(true);

    expect(
      screen.getByRole("button", { name: HELP_QUESTION_ITEM_TITLE }),
    ).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByTestId("HelpQuestionItem_ICON_OPEN")).toBeVisible();
    expect(screen.getByTestId("ANSWER")).toBeInTheDocument();
  });
});
