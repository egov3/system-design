import { fireEvent, render, screen } from "@testing-library/react";

import { EmptyState } from "~components";

describe("EmptyState", () => {
  it("(1) Should render the description with the default icon and no button", () => {
    render(<EmptyState description="Ничего не найдено" />);

    expect(screen.getByTestId("EmptyState_DESCRIPTION")).toHaveTextContent(
      "Ничего не найдено",
    );
    expect(screen.getByTestId("EmptyState_ICON")).toBeInTheDocument();
    expect(screen.queryByTestId("EmptyState_BUTTON")).not.toBeInTheDocument();
  });

  it("(2) Should render a custom icon and call the button action", () => {
    const onButtonClick = jest.fn();
    render(
      <EmptyState
        description="Нет данных"
        icon={<svg data-testid="CUSTOM_ICON" />}
        buttonText="Обновить"
        onButtonClick={onButtonClick}
      />,
    );

    expect(screen.getByTestId("CUSTOM_ICON")).toBeInTheDocument();
    expect(screen.queryByTestId("EmptyState_ICON")).not.toBeInTheDocument();

    fireEvent.click(screen.getByTestId("EmptyState_BUTTON"));
    expect(onButtonClick).toHaveBeenCalledTimes(1);
  });

  it("(3) Should not render the button without a click handler", () => {
    render(<EmptyState description="Нет данных" buttonText="Обновить" />);

    expect(screen.queryByTestId("EmptyState_BUTTON")).not.toBeInTheDocument();
  });
});
