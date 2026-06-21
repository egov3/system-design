import { render, screen } from "@testing-library/react";
import { Components } from "~components";
import { i18n } from "~constants/i18n";

const lang = "ru";
const langDic = i18n.SearchQualityFeedback;

describe("SearchQualityFeedback", () => {
  it("(1) Should render feedback footer", () => {
    render(
      <Components.SearchQualityFeedback lang={lang} onLowRating={jest.fn()} />,
    );

    expect(screen.getByText(langDic.title[lang])).toBeInTheDocument();
    expect(screen.getByText(langDic.subtitle[lang])).toBeInTheDocument();
    expect(
      screen.getByTestId("SearchQualityFeedback_SUBMIT_BUTTON"),
    ).toHaveTextContent(langDic.submitRating[lang]);
  });
});
