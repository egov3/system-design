import { fireEvent, render, screen } from "@testing-library/react";
import { Components } from "~components";

describe("IdentityModal", () => {
  const navigator = jest.fn(() => jest.fn());
  const goBackService = jest.fn();

  test("(1) Should navigate to root page from main", () => {
    render(
      <Components.IdentityModal
        goBackService={goBackService}
        isMain={true}
        navigator={navigator}
        lang="ru"
      >
        content
      </Components.IdentityModal>,
    );

    const goMainPageButton = screen.getByTestId("IdentityModule_BTN_LOGO_ICON");
    fireEvent.click(goMainPageButton);

    expect(navigator).toHaveBeenCalledWith({
      owner: "IdentityModal",
      route: "/",
    });
  });

  test("(2) Should call goBackService when back button is clicked", () => {
    render(
      <Components.IdentityModal
        goBackService={goBackService}
        isMain={false}
        navigator={navigator}
        lang="ru"
      >
        content
      </Components.IdentityModal>,
    );

    const goBackButton = screen.getByTestId("IdentityHeaderGoBack_BTN");

    fireEvent.click(goBackButton);
    expect(goBackService).toHaveBeenCalled();
  });

  test("(3) Should navigate to identity main page when main button is clicked", () => {
    render(
      <Components.IdentityModal
        goBackService={goBackService}
        isMain={false}
        navigator={navigator}
        lang="ru"
      >
        content
      </Components.IdentityModal>,
    );

    const goMainPageButton = screen.getByTestId("IdentityHeaderGoMain_BTN");
    fireEvent.click(goMainPageButton);

    expect(navigator).toHaveBeenCalledWith({
      owner: "IdentityModal",
      route: "/identity/main",
    });
  });

  test("(4) Should select lang", () => {
    const mockHandleLangChange = jest.fn();
    const lang = "kk";
    render(
      <Components.IdentityModal
        goBackService={goBackService}
        isMain={false}
        navigator={navigator}
        lang="ru"
        handleLangChange={mockHandleLangChange}
      >
        content
      </Components.IdentityModal>,
    );

    const selectLang = screen.getByTestId(`IdentityModule_FOOTER_BTN_${lang}`);
    fireEvent.click(selectLang);

    expect(mockHandleLangChange).toHaveBeenCalledWith(lang);
  });
});
