import { fireEvent, render, screen } from "@testing-library/react";
import { Components } from "~components";

describe("ServiceDetails.ShowPassportBtn", () => {
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

  it('(2) Should render when serviceId="P305"', () => {
    const { getByText } = render(
      <Components.PresaleComponent.ServiceDetails serviceId="P305" lang="ru" />,
    );
    expect(
      getByText(
        "Предоставление сведений о зарегистрированных правах (обременениях) на недвижимое имущество и его технических характеристиках",
      ),
    ).toHaveTextContent(
      "Предоставление сведений о зарегистрированных правах (обременениях) на недвижимое имущество и его технических характеристиках",
    );
  });

  it('(3) Should show passport details when serviceId="P305"', () => {
    render(
      <Components.PresaleComponent.ServiceDetails serviceId="P305" lang="ru" />,
    );

    fireEvent.click(screen.getByTestId("ShowPassport_BTN"));

    expect(screen.getByTestId("PassportDetails_WRAPPER")).toBeInTheDocument();
  });
});
