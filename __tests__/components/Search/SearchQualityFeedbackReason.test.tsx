import { render, screen } from "@testing-library/react";
import { Components } from "~components";
import { i18n } from "~constants/i18n";

const lang = "ru";
const langDic = i18n.SearchQualityFeedback;

describe("SearchQualityFeedbackReason", () => {
  it("(1) Should render reason description", () => {
    render(
      <Components.SearchQualityFeedbackReason
        lang={lang}
        onCancel={jest.fn()}
        onSubmit={jest.fn()}
      />,
    );

    expect(screen.getByText(langDic.reasonTitle[lang])).toBeInTheDocument();
    expect(
      screen.getByTestId("SearchQualityFeedbackReason_DESCRIPTION"),
    ).toHaveTextContent(langDic.reasonDescription[lang]);
  });
});
