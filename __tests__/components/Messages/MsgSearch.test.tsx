import { fireEvent, render, screen } from "@testing-library/react";
import { Components } from "~components";
import type { ILangGeneric } from "~interfaces/common";

describe("MsgSearch", () => {
  const defaultProps = {
    lang: "ru" as keyof ILangGeneric<string>,
    handleClose: jest.fn(),
    handleOnEnter: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("(1) Should call handleOnEnter when enter is pressed with text", () => {
    const handleOnEnter = jest.fn();
    render(
      <Components.MsgSearch
        handleOnEnter={handleOnEnter}
        handleClose={() => {}}
        lang="ru"
      />,
    );

    const input = screen.getByTestId("SearchBar_INPUT");
    fireEvent.change(input, { target: { value: "test search" } });
    fireEvent.keyDown(input, { key: "Enter" });

    expect(handleOnEnter).toHaveBeenCalledWith("test search");
  });

  it("(2) Should call handleClose when close button is clicked", () => {
    render(<Components.MsgSearch {...defaultProps} />);

    const closeButton = screen.getByTestId("MsgSearch_CLOSE");
    fireEvent.click(closeButton);

    expect(defaultProps.handleClose).toHaveBeenCalled();
  });
});
