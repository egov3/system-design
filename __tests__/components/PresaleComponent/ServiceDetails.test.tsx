import { fireEvent, render, screen } from "@testing-library/react";
import { Components } from "~components";
import { lists, lists_2 } from "~constants/mockData";

describe("PresaleComponent.ServiceDetails", () => {
  it("(1) Should render service label", () => {
    render(
      <Components.PresaleComponent.ServiceDetails
        passportDetails={lists}
        servicesDetails={lists_2}
        lang="ru"
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
      <Components.PresaleComponent.ServiceDetails
        passportDetails={lists}
        servicesDetails={lists_2}
        lang="ru"
      />,
    );

    fireEvent.click(screen.getByTestId("ShowPassport_BTN"));

    expect(screen.getByTestId("PassportDetails_WRAPPER")).toBeInTheDocument();
  });
});
