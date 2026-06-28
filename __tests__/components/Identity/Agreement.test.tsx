import { render, screen } from "@testing-library/react";
import { Agreement } from "~components";
import { i18n } from "~constants/i18n";


describe("Agreement component", () => {
  it("(1) Should render Agreement component with correct language", () => {
    const lang = "ru";
    const submitAgreementAndSign = jest.fn();
    render(
      <Agreement
        lang={lang}
        agreementText="Agreement text"
        submitAgreementAndSign={submitAgreementAndSign}
      />,
    );

    const submitButton = screen.getByTestId("IdentityBtn_AGREEMENT");
    expect(submitButton.textContent).toEqual(i18n.Agreement.SignButton[lang]);
  });
});
