import { fireEvent, render, screen } from "@testing-library/react";
import { Components } from "~components";
import { i18n } from "~constants/i18n";

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
      <Components.PresaleComponent.ServiceDetails
        passportDetails={i18n.Services.presaleMock.passport.P601}
        servicesDetails={i18n.Services.presaleMock.details.P601}
        lang="ru"
      />,
    );
    expect(getByText("Категория")).toHaveTextContent("Категория");
  });

  it('(3) Should show passport details when serviceId="P305"', () => {
    render(
      <Components.PresaleComponent.ServiceDetails
        passportDetails={i18n.Services.presaleMock.passport.P601}
        servicesDetails={i18n.Services.presaleMock.details.P601}
        lang="ru"
      />,
    );

    fireEvent.click(screen.getByTestId("ShowPassport_BTN"));

    expect(screen.getByTestId("PassportDetails_WRAPPER")).toBeInTheDocument();
  });
});
