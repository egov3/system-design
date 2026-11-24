import { fireEvent, render, screen, within } from "@testing-library/react";

import { serviceCardsSectionItems } from "__tests__/Mock/serviceCardsSectionItems";
import { ServiceCardsSection } from "~components";

describe("ServiceCardsSection", () => {
  it("(1) Should render a plain title and call the card handler", () => {
    const handleCardClick = jest.fn();
    render(
      <ServiceCardsSection
        title="Бизнес"
        cards={[{ ...serviceCardsSectionItems[0], onClick: handleCardClick }]}
      />,
    );

    expect(screen.getByTestId("Label_TEXT")).toHaveTextContent("Бизнес");
    expect(screen.getByTestId("ServiceCardsSection_GRID")).not.toHaveClass(
      "fourColumns",
    );

    fireEvent.click(screen.getByTestId("ServiceCardComponent_BUTTON"));

    expect(handleCardClick).toHaveBeenCalledTimes(1);
  });

  it("(2) Should render a title button and four columns grid", () => {
    const handleTitleClick = jest.fn();
    render(
      <ServiceCardsSection
        title="Бизнес"
        cards={serviceCardsSectionItems}
        onTitleClick={handleTitleClick}
        isFourColumns={true}
      />,
    );

    const grid = screen.getByTestId("ServiceCardsSection_GRID");
    expect(grid).toHaveClass("fourColumns");
    expect(
      within(grid).getAllByTestId("ServiceCardComponent_BUTTON"),
    ).toHaveLength(serviceCardsSectionItems.length);

    fireEvent.click(screen.getByTestId("ServiceCardsSection_TITLE_BTN"));

    expect(handleTitleClick).toHaveBeenCalledTimes(1);
  });
});
