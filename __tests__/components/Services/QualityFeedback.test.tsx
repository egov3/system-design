import { fireEvent, render, screen } from "@testing-library/react";
import { Components } from "~components";
import { i18n } from "~constants/i18n";

const lang = "ru";
const langDic = i18n.QualityFeedback;

describe("QualityFeedback", () => {
  it("(1) Should render rating footer with tooltips", () => {
    render(<Components.QualityFeedback lang={lang} />);

    expect(screen.getByText(langDic.title[lang])).toBeInTheDocument();
    expect(screen.getAllByTestId("QualityFeedbackRating_ICON")).toHaveLength(5);
    expect(screen.getAllByTestId("QualityFeedbackRating_TOOLTIP")).toHaveLength(
      5,
    );
  });

  it("(2) Should call low rating callback", () => {
    const onLowRating = jest.fn();
    render(
      <Components.QualityFeedback lang={lang} onLowRating={onLowRating} />,
    );

    fireEvent.click(screen.getByTestId("QualityFeedback_RATING_1"));
    fireEvent.click(screen.getByTestId("QualityFeedback_SUBMIT_BUTTON"));

    expect(onLowRating).toHaveBeenCalledWith(1);
  });
});
