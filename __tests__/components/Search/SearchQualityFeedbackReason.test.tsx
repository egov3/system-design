import { fireEvent, render, screen } from "@testing-library/react";
import { Components } from "~components";
import { i18n } from "~constants/i18n";

const lang = "ru";
const langDic = i18n.SearchQualityFeedback;

describe("SearchQualityFeedbackReason", () => {
  it("(1) Should submit comment and cancel", () => {
    const comment = "Не нашел нужную услугу";
    const onCancel = jest.fn();
    const onSubmit = jest.fn();

    render(
      <Components.SearchQualityFeedbackReason
        lang={lang}
        onCancel={onCancel}
        onSubmit={onSubmit}
      />,
    );

    fireEvent.change(
      screen.getByTestId("SearchQualityFeedbackReason_TEXTAREA"),
      { target: { value: comment } },
    );
    fireEvent.click(
      screen.getByTestId("SearchQualityFeedbackReason_SUBMIT_BUTTON"),
    );
    fireEvent.click(
      screen.getByTestId("SearchQualityFeedbackReason_CANCEL_BUTTON"),
    );

    expect(screen.getByText(langDic.cancel[lang])).toBeInTheDocument();
    expect(onSubmit).toHaveBeenCalledWith(comment);
    expect(onCancel).toHaveBeenCalledTimes(1);
  });
});
