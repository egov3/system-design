import { fireEvent, render, screen } from "@testing-library/react";
import { QualityFeedbackReason } from "~components";
import { i18n } from "~constants/i18n";

const lang = "ru";
const langDic = i18n.QualityFeedback;

describe("QualityFeedbackReason", () => {
  it("(1) Should render title, description and textarea", () => {
    render(
      <QualityFeedbackReason initialComment="Тест" lang={lang} />,
    );

    expect(screen.getByText(langDic.reasonTitle[lang])).toBeInTheDocument();
    expect(
      screen.getByText(langDic.reasonDescription[lang]),
    ).toBeInTheDocument();
    expect(screen.getByDisplayValue("Тест")).toBeInTheDocument();
  });

  it("(2) Should change comment", () => {
    render(<QualityFeedbackReason lang={lang} />);

    fireEvent.change(screen.getByTestId("QualityFeedbackReason_TEXTAREA"), {
      target: { value: "Комментарий" },
    });

    expect(screen.getByDisplayValue("Комментарий")).toBeInTheDocument();
  });
});
