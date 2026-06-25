import { fireEvent, render, screen } from "@testing-library/react";
import { Components } from "~components";
import { i18n } from "~constants/i18n";

const lang = "ru";
const langDic = i18n.QualityFeedback;

describe("QualityFeedback", () => {
  it("(1) Should render rating footer", () => {
    render(<Components.QualityFeedback lang={lang} />);

    expect(screen.getByText(langDic.title[lang])).toBeInTheDocument();
    expect(screen.getAllByTestId("QualityFeedbackRating_ICON")).toHaveLength(5);
    expect(screen.getByTestId("QualityFeedback_RATING_5")).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });

  it("(2) Should submit selected rating", () => {
    const onSubmitRating = jest.fn();
    render(
      <Components.QualityFeedback
        lang={lang}
        onSubmitRating={onSubmitRating}
      />,
    );

    fireEvent.click(screen.getByTestId("QualityFeedback_RATING_1"));
    fireEvent.click(screen.getByTestId("QualityFeedback_SUBMIT_BUTTON"));

    expect(onSubmitRating).toHaveBeenCalledWith(1);
  });
});
