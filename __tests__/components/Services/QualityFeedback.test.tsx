import { fireEvent, render, screen } from "@testing-library/react";
import { Components } from "~components";
import { i18n } from "~constants/i18n";

const lang = "ru";
const langDic = i18n.QualityFeedback;

describe("QualityFeedback", () => {
  it("(1) Should render rating footer", () => {
    render(<Components.QualityFeedback lang={lang} onLowRating={jest.fn()} />);

    expect(screen.getByText(langDic.title[lang])).toBeInTheDocument();
    expect(screen.getAllByTestId("QualityFeedbackRating_ICON")).toHaveLength(5);
    expect(screen.getByTestId("QualityFeedback_RATING_5")).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });

  it("(2) Should open reason flow after low rating submit", () => {
    const onLowRating = jest.fn();
    render(
      <Components.QualityFeedback lang={lang} onLowRating={onLowRating} />,
    );

    fireEvent.click(screen.getByTestId("QualityFeedback_RATING_1"));
    expect(onLowRating).not.toHaveBeenCalled();

    fireEvent.click(screen.getByTestId("QualityFeedback_SUBMIT_BUTTON"));

    expect(onLowRating).toHaveBeenCalledWith(1);
  });

  it("(3) Should render success and custom content", () => {
    render(
      <Components.QualityFeedback
        isSuccessMode
        lang={lang}
        onLowRating={jest.fn()}
        successButtonText="Еще раз"
        successSubtitle="Подзаголовок"
        successTitle="Спасибо"
      />,
    );

    expect(screen.getByText("Спасибо")).toBeInTheDocument();
    expect(screen.getByText("Подзаголовок")).toBeInTheDocument();
    expect(screen.getByText("Еще раз")).toBeInTheDocument();
  });
});
