import { fireEvent, render, screen } from "@testing-library/react";

import { DropDownMenuAction } from "~baseComponents";

describe("DropDownMenuAction", () => {
  const action = jest.fn();

  const defaultProps = {
    icon: <svg data-testid="MoreIcon" />,
    items: [
      {
        icon: <svg />,
        text: "Редактировать",
        action,
      },
    ],
  };

  const getButton = () => screen.getByTestId("DropDownMenuAction_BUTTON");

  const getMenu = () => screen.queryByTestId("DropDownMenu_WRAPPER");

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("(1) Should render component and toggle menu", () => {
    render(<DropDownMenuAction {...defaultProps} />);

    expect(
      screen.getByTestId("DropDownMenuAction_WRAPPER"),
    ).toBeInTheDocument();
    expect(screen.getByTestId("MoreIcon")).toBeInTheDocument();
    expect(getMenu()).not.toBeInTheDocument();
    expect(getButton()).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(getButton());
    expect(getMenu()).toBeInTheDocument();
    expect(getButton()).toHaveAttribute("aria-expanded", "true");
    fireEvent.click(getButton());
    expect(getMenu()).not.toBeInTheDocument();
    expect(getButton()).toHaveAttribute("aria-expanded", "false");
  });

  it("(2) Should call action and close menu", () => {
    render(<DropDownMenuAction {...defaultProps} />);
    fireEvent.click(getButton());
    fireEvent.click(screen.getByText("Редактировать"));
    expect(action).toHaveBeenCalledTimes(1);
    expect(getMenu()).not.toBeInTheDocument();
    expect(getButton()).toHaveFocus();
  });

  it("(3) Should close menu on outside click", () => {
    render(<DropDownMenuAction {...defaultProps} />);

    fireEvent.click(getButton());
    fireEvent.mouseDown(document.body);

    expect(getMenu()).not.toBeInTheDocument();
  });

  it("(4) Should not close menu on inside click", () => {
    render(<DropDownMenuAction {...defaultProps} />);

    fireEvent.click(getButton());
    fireEvent.mouseDown(screen.getByTestId("DropDownMenu_WRAPPER"));

    expect(getMenu()).toBeInTheDocument();
  });

  it("(5) Should close menu on Escape key press", () => {
    render(<DropDownMenuAction {...defaultProps} />);

    fireEvent.click(getButton());
    fireEvent.keyDown(document, { key: "Escape" });

    expect(getMenu()).not.toBeInTheDocument();
    expect(getButton()).toHaveFocus();
  });

  it("(6) Should not close menu on other key press", () => {
    render(<DropDownMenuAction {...defaultProps} />);

    fireEvent.click(getButton());
    fireEvent.keyDown(document, { key: "Enter" });

    expect(getMenu()).toBeInTheDocument();
  });

  it("(7) Should not open menu when disabled", () => {
    render(<DropDownMenuAction {...defaultProps} disabled />);

    expect(getButton()).toBeDisabled();

    fireEvent.click(getButton());

    expect(getMenu()).not.toBeInTheDocument();
  });
});
