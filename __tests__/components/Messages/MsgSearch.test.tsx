import { fireEvent, render, screen } from "@testing-library/react";
import { Components } from "~components";

describe("MsgSearch", () => {
  const defaultProps = {
    lang: "ru" as const,
    handleClose: jest.fn(),
    handleInputChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("(1) Should calls handleInputChange when input value changes", () => {
    render(<Components.MsgSearch {...defaultProps} />);

    const input = screen.getByTestId("MsgSearch_INPUT");
    fireEvent.change(input, { target: { value: "test search" } });

    expect(defaultProps.handleInputChange).toHaveBeenCalledWith("test search");
    expect(input).toHaveValue("test search");
  });

  it("(2) Should shows clear icon when input has value", () => {
    render(<Components.MsgSearch {...defaultProps} />);

    const input = screen.getByTestId("MsgSearch_INPUT");
    fireEvent.change(input, { target: { value: "test" } });

    const clearIcon = screen
      .getByTestId("MsgSearch_WRAPPER")
      .querySelectorAll("svg")[1];
    expect(clearIcon).toBeInTheDocument();
  });

  it("(3) Should clear input when clear icon is clicked", () => {
    render(<Components.MsgSearch {...defaultProps} />);

    const input = screen.getByTestId("MsgSearch_INPUT");
    fireEvent.change(input, { target: { value: "test" } });

    const clearIcon = screen
      .getByTestId("MsgSearch_WRAPPER")
      .querySelectorAll("svg")[1];
    fireEvent.click(clearIcon);

    expect(input).toHaveValue("");
    expect(defaultProps.handleInputChange).toHaveBeenCalledWith("");
  });

  it("(4) Should call handleClose when close button is clicked", () => {
    render(<Components.MsgSearch {...defaultProps} />);

    const closeButton = screen.getByTestId("MsgSearch_CLOSE");
    fireEvent.click(closeButton);

    expect(defaultProps.handleClose).toHaveBeenCalled();
  });
});
