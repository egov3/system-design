import { fireEvent, render, screen } from "@testing-library/react";
import { Components } from "~components";

describe("PresaleComponent.ShowPassportBtn", () => {
  it("(1) Should render toggles showPassport state when clicked", () => {
    const setShowPassport = jest.fn();
    const showPassport = false;

    render(
      <Components.PresaleComponent.ShowPassportBtn
        setShowPassport={setShowPassport}
        showPassport={showPassport}
        lang="ru"
      />,
    );

    const button = screen.getByText("Подробный паспорт услуги");
    fireEvent.click(button);

    expect(setShowPassport).toHaveBeenCalledWith(true);
  });
});
