import { render, screen } from "@testing-library/react";
import { Auth } from "~components";
import { i18n } from "~constants/i18n";

describe("Auth component", () => {
  const lang = "ru";
  const handleDownloadAppClick = jest.fn();
  const handleRegistrationClick = jest.fn();
  const handleEdsClick = jest.fn();

  it("(1) Should render Auth component with correct language", () => {
    render(
      <Auth
        lang={lang}
        handleDownloadAppClick={handleDownloadAppClick}
        handleRegistrationClick={handleRegistrationClick}
        handleEdsClick={handleEdsClick}
        qrCode={<div data-testid="AuthStepComponentQRCode" />}
      />,
    );

    expect(
      screen.getByTestId("AuthStepComponentLoginBox_TITLE").textContent,
    ).toEqual(i18n.Auth.Welcome[lang]);
  });
});
