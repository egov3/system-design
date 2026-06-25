import { fireEvent, render, screen } from "@testing-library/react";
import { Components } from "~components";
import { i18n } from "~constants/i18n";

const lang = "ru";
const langDic = i18n.QualityFeedback;

describe("QualityFeedbackReason", () => {
  it("(1) Should submit comment and cancel", () => {
    const comment = "Не нашел нужную услугу";
    const onCancel = jest.fn();
    const onSubmit = jest.fn();

    render(
      <Components.QualityFeedbackReason
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
    const { rerender } = render(
      <Components.QualityFeedbackReason
        initialComment="Первый отзыв"
        lang={lang}
        onCancel={jest.fn()}
        onSubmit={jest.fn()}
      />,
    );

    expect(screen.getByTestId("QualityFeedbackReason_TEXTAREA")).toHaveValue(
      "Первый отзыв",
    );

    rerender(
      <Components.QualityFeedbackReason
        initialComment="Обновленный отзыв"
        lang={lang}
        onCancel={jest.fn()}
        onSubmit={jest.fn()}
      />,
    );

    expect(screen.getByTestId("QualityFeedbackReason_TEXTAREA")).toHaveValue(
      "Обновленный отзыв",
    );
  });

  it("(3) Should render custom texts", () => {
    const texts = {
      cancelButtonText: "Закрыть",
      description: "Подробно опишите проблему",
      submitButtonText: "Сохранить",
      title: "Причина оценки",
    };

    render(
      <Components.QualityFeedbackReason
        lang={lang}
        onCancel={jest.fn()}
        onSubmit={jest.fn()}
        {...texts}
      />,
    );

    Object.values(texts).forEach((text) => {
      expect(screen.getByText(text)).toBeInTheDocument();
    });
  });
});
