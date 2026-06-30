import { fireEvent, render, screen } from "@testing-library/react";
import { QualityFeedback } from "~components";
import { i18n } from "~constants/i18n";

const lang = "ru";
const langDic = i18n.QualityFeedback;

describe("QualityFeedback", () => {
  it("(1) Should render feedback footer", () => {
    render(<QualityFeedback lang={lang} />);

    expect(screen.getByText(langDic.title[lang])).toBeInTheDocument();
    expect(screen.getByText(langDic.subtitle[lang])).toBeInTheDocument();
    expect(screen.getByText(langDic.submitRating[lang])).toBeInTheDocument();
  });

  it("(2) Should submit feedback", () => {
    const onSubmitRating = jest.fn();
    render(
      <QualityFeedback
        lang={lang}
        onSubmitRating={onSubmitRating}
      />,
    );

    fireEvent.click(screen.getByTestId("QualityFeedback_SUBMIT_BUTTON"));

    expect(onSubmitRating).toHaveBeenCalledTimes(1);
  });
});
