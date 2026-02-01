import { render, screen } from "@testing-library/react";
import { Components } from "~components";

describe("PresaleComponent.PassportDetails", () => {
  it("(1) Should render PassportDetails for P601", () => {
    render(
      <Components.PresaleComponent.PassportDetails
        serviceId="P601"
        lang="ru"
      />,
    );

    const titles = screen.getAllByTestId("PassportDetails_WRAP");

    expect(titles.length).toBe(8);

    expect(titles[1]).toHaveTextContent(
      "Выдача информации о поступлении и движении средств вкладчика единого накопительного пенсионного фонда (без учета инвестиционного дохода)",
    );
  });

  it("(2) Should render PassportDetails for P305", () => {
    render(
      <Components.PresaleComponent.PassportDetails
        serviceId="P305"
        lang="ru"
      />,
    );

    const titles = screen.getAllByTestId("PassportDetails_WRAP");

    expect(titles.length).toBe(8);

    expect(titles[1]).toHaveTextContent(
      "Предоставление сведений о зарегистрированных правах (обременениях) на недвижимое имущество и его технических характеристиках",
    );
  });

  it("(3) Should render PassportDetails for P2203", () => {
    render(
      <Components.PresaleComponent.PassportDetails
        serviceId="P2203"
        lang="ru"
      />,
    );

    const titles = screen.getAllByTestId("PassportDetails_WRAP");

    expect(titles.length).toBe(8);

    expect(titles[1]).toHaveTextContent(
      "Снятие с регистрации по месту жительства населения Республики Казахстан",
    );
  });
});
