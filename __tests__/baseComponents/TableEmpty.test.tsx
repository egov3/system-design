import { fireEvent, render, screen } from "@testing-library/react";

import { TableEmpty } from "~baseComponents";

describe("TableEmpty", () => {
  it("(1) Should render the ListMenu icon and description", () => {
    render(<TableEmpty description="No equipment added" />);

    expect(screen.getByTestId("TableEmpty_ICON")).toBeInTheDocument();
    expect(screen.getByTestId("TableEmpty_DESCRIPTION")).toHaveTextContent(
      "No equipment added",
    );
  });

  it("(2) Should render the button, handle its click and apply a class", () => {
    const onButtonClick = jest.fn();

    render(
      <TableEmpty
        description="No data"
        buttonText="Add equipment"
        onButtonClick={onButtonClick}
        className="custom-class"
      />,
    );

    fireEvent.click(screen.getByTestId("TableEmpty_BUTTON"));

    expect(onButtonClick).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId("TableEmpty_BUTTON_ICON")).toBeInTheDocument();
    expect(screen.getByTestId("TableEmpty_WRAPPER")).toHaveClass(
      "custom-class",
    );
  });

  it("(3) Should not render the button without a click handler", () => {
    render(<TableEmpty description="No data" buttonText="Add equipment" />);

    expect(screen.queryByTestId("TableEmpty_BUTTON")).not.toBeInTheDocument();
  });
});
