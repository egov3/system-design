import { render, screen } from "@testing-library/react";
import { Components } from "~components";
import { i18n } from "~constants/i18n";

describe("PresaleComponent.PassportDetails", () => {
  it("(1) Should render PassportDetails for P601", () => {
    render(
      <Components.PresaleComponent.PassportDetails
        details={i18n.Services.presaleMock.passport.P601}
        lang="ru"
      />,
    );

    const titles = screen.getAllByTestId("PassportDetails_WRAP");

    expect(titles.length).toBe(2);

    expect(titles[1]).toHaveTextContent("Способы предоставления услуги");
  });

  it("(2) Should renders nothing when details array is empty", () => {
    render(
      <Components.PresaleComponent.PassportDetails details={[]} lang="ru" />,
    );

    const items = screen.queryAllByTestId("PassportDetails_WRAP");
    expect(items.length).toBe(0);
  });
});
