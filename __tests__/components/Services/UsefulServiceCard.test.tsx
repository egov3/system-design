import { render, screen } from "@testing-library/react";
import { usefulServiceCardItems } from "__tests__/Mock/usefulServiceCardItems";
import { UsefulServiceCard } from "~components";

describe("UsefulServiceCard", () => {
  it("(1) Should call onClick when the card is clicked", () => {
    const mockOnClick = jest.fn();
    render(
      <UsefulServiceCard
        title={usefulServiceCardItems[0].title}
        label={usefulServiceCardItems[0].label}
        icon={usefulServiceCardItems[0].icon}
        handleOrderService={mockOnClick}
      />,
    );

    const cardButton = screen.getByTestId("UsefulServiceCard_BUTTON");
    cardButton.click();

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
