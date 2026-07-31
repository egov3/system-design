import { fireEvent, render, screen } from "@testing-library/react";
import { QualityFeedbackReason } from "~components";
import { i18n } from "~constants/i18n";

const lang = "ru";
const langDic = i18n.QualityFeedback;

describe("QualityFeedbackReason", () => {
  it("(1) Should submit comment and cancel", () => {
    const comment = "feedback comment";
    const onCancel = jest.fn();
    const onSubmit = jest.fn();

    render(
      <QualityFeedbackReason
        lang={lang}
        onCancel={onCancel}
        onSubmit={onSubmit}
      />,
    );

    fireEvent.change(screen.getByTestId("QualityFeedbackReason_TEXTAREA"), {
      target: { value: comment },
    });
    fireEvent.click(screen.getByTestId("QualityFeedbackReason_SUBMIT_BUTTON"));
    fireEvent.click(screen.getByTestId("QualityFeedbackReason_CANCEL_BUTTON"));

    expect(screen.getByText(langDic.cancel[lang])).toBeInTheDocument();
    expect(onSubmit).toHaveBeenCalledWith(comment);
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it("(2) Should render initial comment and update it", () => {
    const initialComment = "initial feedback";
    const updatedComment = "updated feedback";
    const { rerender } = render(
      <QualityFeedbackReason
        initialComment={initialComment}
        lang={lang}
        onCancel={jest.fn()}
        onSubmit={jest.fn()}
      />,
    );

    expect(screen.getByTestId("QualityFeedbackReason_TEXTAREA")).toHaveValue(
      initialComment,
    );

    rerender(
      <QualityFeedbackReason
        initialComment={updatedComment}
        lang={lang}
        onCancel={jest.fn()}
        onSubmit={jest.fn()}
      />,
    );

    expect(screen.getByTestId("QualityFeedbackReason_TEXTAREA")).toHaveValue(
      updatedComment,
    );
  });

  it("(3) Should render custom texts", () => {
    const texts = {
      cancelButtonText: langDic.cancel.en,
      description: langDic.reasonDescription.en,
      submitButtonText: langDic.submit.en,
      title: langDic.reasonTitle.en,
    };

    render(
      <QualityFeedbackReason
        lang={lang}
        onCancel={jest.fn()}
        onSubmit={jest.fn()}
        {...texts}
      />,
    );

    expect(screen.getByText(texts.title)).toBeInTheDocument();
    expect(
      screen.getByTestId("QualityFeedbackReason_DESCRIPTION"),
    ).toHaveTextContent(texts.description.replace(/\s+/g, " "));
    expect(screen.getByText(texts.submitButtonText)).toBeInTheDocument();
    expect(screen.getByText(texts.cancelButtonText)).toBeInTheDocument();
  });
});
