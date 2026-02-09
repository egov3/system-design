import { render, screen } from "@testing-library/react";
import { Components } from "~components";
import { passportDetails } from "~constants/mockData";

describe("PresaleComponent.PassportDetails", () => {
  it("(1) Should render PassportDetails correctly", () => {
    render(
      <Components.PresaleComponent.PassportDetails
        details={passportDetails}
        lang="ru"
      />,
    );

    const titles = screen.getAllByTestId("PassportDetails_WRAP");

    expect(titles.length).toBe(2);

    expect(screen.getAllByTestId("PassportDetails_TITLE")[0]).toHaveTextContent(
      "Заголовок",
    );
    expect(
      screen.getAllByTestId("PassportDetails_DESCRIPTION")[0],
    ).toHaveTextContent("Подзаголовок");
  });

  it("(2) Should renders nothing when details array is empty", () => {
    render(
      <Components.PresaleComponent.PassportDetails details={[]} lang="ru" />,
    );

    const items = screen.queryAllByTestId("PassportDetails_WRAP");
    expect(items.length).toBe(0);
  });
});
