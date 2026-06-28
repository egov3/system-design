import { fireEvent, render, screen } from "@testing-library/react";
import { IdentityModal } from "~components";

describe("IdentityModal", () => {
  const navigator = jest.fn();
  const goBackService = jest.fn();

  // TODO: текст поменять
  test("(1) Should navigate to root page from main", () => {
    render(
      <IdentityModal
        goBackService={goBackService}
        handleLogoClick={navigator}
        lang="ru"
      >
        content
      </IdentityModal>,
    );

    const goMainPageButton = screen.getByTestId("ModalHeaderEgov_ICON");
    fireEvent.click(goMainPageButton);

    expect(navigator).toHaveBeenCalled();
  });

  test("(2) Should call goBackService when back button is clicked", () => {
    render(
      <IdentityModal
        goBackService={goBackService}
        handleLogoClick={navigator}
        lang="ru"
      >
        content
      </IdentityModal>,
    );

    const goBackButton = screen.getByTestId("IdentityHeaderGoBack_BTN");

    fireEvent.click(goBackButton);
    expect(goBackService).toHaveBeenCalled();
  });

  // TODO: текст поменять
  test("(3) Should navigate to identity main page when main button is clicked", () => {
    render(
      <IdentityModal
        goBackService={goBackService}
        handleLogoClick={navigator}
        lang="ru"
      >
        content
      </IdentityModal>,
    );

    const goMainPageButton = screen.getByTestId("ModalHeaderGoMain_BTN");
    fireEvent.click(goMainPageButton);

    expect(goBackService).toHaveBeenCalled();
  });

  test("(4) Should select lang", () => {
    const mockHandleLangChange = jest.fn();
    const lang = "kk";
    render(
      <IdentityModal
        goBackService={goBackService}
        handleLogoClick={navigator}
        lang="ru"
        handleLangChange={mockHandleLangChange}
      >
        content
      </IdentityModal>,
    );

    const selectLang = screen.getByTestId(`IdentityModule_FOOTER_BTN_${lang}`);
    fireEvent.click(selectLang);

    expect(mockHandleLangChange).toHaveBeenCalledWith(lang);
  });
});
