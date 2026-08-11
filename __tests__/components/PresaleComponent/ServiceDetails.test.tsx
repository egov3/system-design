import { fireEvent, render, screen } from "@testing-library/react";
import { PresaleComponent } from "~components";
import { htmlText } from "~constants/mock";
import { passportDetails, serviceDetails } from "~constants/mockData";

describe("PresaleComponent.ServiceDetails", () => {
  it("(1) Should show passport details after button click", () => {
    render(
      <PresaleComponent.ServiceDetails
        passportDetails={passportDetails}
        servicesDetails={serviceDetails}
        lang="ru"
        howItWorksText={""}
      />,
    );

    fireEvent.click(screen.getByTestId("ShowPassport_BTN"));

    expect(screen.getByTestId("PassportDetails_WRAPPER")).toBeInTheDocument();
  });

  it("(2) Should show how it works modal after button click", () => {
    render(
      <PresaleComponent.ServiceDetails
        passportDetails={passportDetails}
        servicesDetails={serviceDetails}
        lang="ru"
        howItWorksText={htmlText}
      />,
    );

    fireEvent.click(screen.getByTestId("HowItWorks_BTN"));

    expect(screen.getByTestId("HowItWorks_WRAPPER")).toBeInTheDocument();
  });
});
