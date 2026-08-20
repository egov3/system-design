import { render, screen } from "@testing-library/react";
import { socialCardItems } from "__tests__/Mock/socialCardItems";
import { SocialCard } from "~components";

describe("SocialCard", () => {
  it("(1) Should call onClick when the card is clicked", () => {
    const mockOnClick = jest.fn();
    render(
      <SocialCard
        title={socialCardItems[0].title}
        icon={socialCardItems[0].icon}
        handleOrderService={mockOnClick}
      />,
    );

    const cardButton = screen.getByTestId("SocialCard_BUTTON");
    cardButton.click();

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
