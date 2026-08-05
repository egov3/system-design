import { fireEvent, render, screen } from "@testing-library/react";
import { PresaleComponent } from "~components";
import { htmlText } from "~constants/mock";
import { passportDetails, serviceDetails } from "~constants/mockData";

describe("PresaleComponent.ServiceDetails", () => {
  it("(1) Should render service label", () => {
    render(
      <PresaleComponent.ServiceDetails
        passportDetails={passportDetails}
        servicesDetails={serviceDetails}
        lang="ru"
        howItWorksText={htmlText}
      />,
    );
    expect(screen.getAllByTestId("ServiceDetails_TITLE")[0]).toHaveTextContent(
      "Заголовок 1",
    );
    expect(
      screen.getAllByTestId("ServiceDetails_DESCRIPTION")[0],
    ).toHaveTextContent("Подзаголовок 1");
  });

  it("(2) Should show passport details after button click", () => {
    render(
      <PresaleComponent.ServiceDetails
        passportDetails={passportDetails}
        servicesDetails={serviceDetails}
        lang="ru"
        howItWorksText={htmlText}
      />,
    );

    fireEvent.click(screen.getByTestId("ShowPassport_BTN"));

    expect(screen.getByTestId("PassportDetails_WRAPPER")).toBeInTheDocument();
  });
});
