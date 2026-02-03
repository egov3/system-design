import { fireEvent, render, screen } from "@testing-library/react";
import { Components } from "~components";
import { i18n } from "~constants/i18n";

describe("PresaleComponent.ServiceDetails", () => {
  it("(1) Should render service label", () => {
    const { getByText } = render(
      <Components.PresaleComponent.ServiceDetails
        passportDetails={i18n.Services.presaleMock.passport.P601}
        servicesDetails={i18n.Services.presaleMock.details.P601}
        lang="ru"
      />,
    );
    expect(getByText("Категория")).toHaveTextContent("Категория");
  });

  it("(2) Should show passport details after button click", () => {
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
