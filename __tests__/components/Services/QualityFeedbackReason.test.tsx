import { render, screen } from "@testing-library/react";
import { Components } from "~components";
import { i18n } from "~constants/i18n";

const lang = "ru";
const langDic = i18n.QualityFeedback;

describe("QualityFeedbackReason", () => {
  it("(1) Should render title and description", () => {
    render(<Components.QualityFeedbackReason lang={lang} />);

    expect(
      screen.getByTestId("QualityFeedbackReason_WRAP"),
    ).toBeInTheDocument();
    expect(screen.getByText(langDic.reasonTitle[lang])).toBeInTheDocument();
    expect(
      screen.getByText(langDic.reasonDescription[lang]),
    ).toBeInTheDocument();
  });
});
