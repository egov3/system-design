import { fireEvent, render, screen } from "@testing-library/react";
import { Components } from "~components";
import { i18n } from "~constants/i18n";

const lang = "ru";
const langDic = i18n.QualityFeedback;

describe("QualityFeedback", () => {
  it("(1) Should render rating footer", () => {
    render(<Components.QualityFeedback lang={lang} onLowRating={jest.fn()} />);

    expect(screen.getByText(langDic.title[lang])).toBeInTheDocument();
    expect(screen.getByText(langDic.subtitle[lang])).toBeInTheDocument();
    expect(screen.getAllByTestId("QualityFeedbackRating_ICON")).toHaveLength(5);
    expect(screen.getByTestId("QualityFeedback_RATING_5")).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(
      screen.getAllByTestId("QualityFeedbackRating_TOOLTIP_CONTENT"),
    ).toHaveLength(5);
    expect(
      screen.getByText(langDic.ratingTooltipLabels.angry[lang]),
    ).toBeInTheDocument();
    expect(
      screen.getAllByTestId("QualityFeedbackRating_TOOLTIP_WRAP")[4],
    ).toHaveClass("ratingTooltipActive");
  });

  it("(2) Should handle positive and low rating", () => {
    const onLowRating = jest.fn();

    render(
      <Components.QualityFeedback lang={lang} onLowRating={onLowRating} />,
    );

    fireEvent.click(screen.getByTestId("QualityFeedback_RATING_5"));
    fireEvent.click(screen.getByTestId("QualityFeedback_SUBMIT_BUTTON"));

    expect(screen.getByText(langDic.thanksTitle[lang])).toBeInTheDocument();
    expect(screen.getByText(langDic.thanksSubtitle[lang])).toBeInTheDocument();
    expect(screen.getByTestId("QualityFeedback_LIKE_ICON")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("QualityFeedback_RESET_BUTTON"));
    expect(screen.getByTestId("QualityFeedback_RATING_5")).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    fireEvent.click(screen.getByTestId("QualityFeedback_RATING_1"));
    fireEvent.click(screen.getByTestId("QualityFeedback_SUBMIT_BUTTON"));

    expect(onLowRating).toHaveBeenCalledWith(1);
  });

  it("(3) Should render custom texts", () => {
    const texts = {
      submitButtonText: "Оценить",
      subtitle: "Кастомное описание",
      successButtonText: "Повторить",
      successSubtitle: "Кастомное описание успеха",
      successTitle: "Спасибо",
      title: "Кастомный заголовок",
    };

    render(
      <Components.QualityFeedback
        lang={lang}
        onLowRating={jest.fn()}
        {...texts}
      />,
    );

    expect(screen.getByText(texts.title)).toBeInTheDocument();
    expect(screen.getByText(texts.subtitle)).toBeInTheDocument();
    expect(screen.getByText(texts.submitButtonText)).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("QualityFeedback_SUBMIT_BUTTON"));

    expect(screen.getByText(texts.successTitle)).toBeInTheDocument();
    expect(screen.getByText(texts.successSubtitle)).toBeInTheDocument();
    expect(screen.getByText(texts.successButtonText)).toBeInTheDocument();
  });

  it("(4) Should render controlled success mode", () => {
    const onReset = jest.fn();

    render(
      <Components.QualityFeedback
        isSuccessMode
        lang={lang}
        onLowRating={jest.fn()}
        onReset={onReset}
      />,
    );

    expect(screen.getByTestId("QualityFeedback_THANKS")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("QualityFeedback_RESET_BUTTON"));

    expect(onReset).toHaveBeenCalledTimes(1);
  });
});
