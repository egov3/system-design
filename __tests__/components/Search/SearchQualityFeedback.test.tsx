import { fireEvent, render, screen } from "@testing-library/react";
import { Components } from "~components";
import { i18n } from "~constants/i18n";

const lang = "ru";
const langDic = i18n.SearchQualityFeedback;

describe("SearchQualityFeedback", () => {
  it("(1) Should render ratings and submit low rating", () => {
    const onLowRating = jest.fn();

    render(
      <Components.SearchQualityFeedback
        lang={lang}
        onLowRating={onLowRating}
      />,
    );

    expect(screen.getByText(langDic.title[lang])).toBeInTheDocument();
    expect(
      screen.getAllByTestId("SearchQualityFeedbackRating_ICON"),
    ).toHaveLength(5);
    expect(
      screen.getByTestId("SearchQualityFeedback_RATING_5"),
    ).toHaveAttribute("aria-pressed", "true");

    fireEvent.click(screen.getByTestId("SearchQualityFeedback_RATING_1"));
    fireEvent.click(screen.getByTestId("SearchQualityFeedback_SUBMIT_BUTTON"));

    expect(onLowRating).toHaveBeenCalledWith(1);
  });
});
