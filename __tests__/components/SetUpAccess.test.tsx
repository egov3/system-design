import { fireEvent, render, screen } from "@testing-library/react";
import { Components } from "~components";

const { SetUpAccess } = Components;

describe("SetUpAccess", () => {
  const defaultProps = {
    lang: "ru" as const,
    lock: false,
    close: false,
    unlock: jest.fn(),
    setClose: jest.fn(),
  };

  it("(1) Should call setClose when save button is clicked", () => {
    const setClose = jest.fn();
    render(<SetUpAccess {...defaultProps} setClose={setClose} close={false} />);

    const saveButton = screen.getByTestId("SetUpAccessBtn_SAVE");
    fireEvent.click(saveButton);

    expect(setClose).toHaveBeenCalledTimes(1);
    expect(setClose).toHaveBeenCalledWith(true);
  });

  it("(2) Should call setClose with inverted close value", () => {
    const setClose = jest.fn();
    const { rerender } = render(
      <SetUpAccess {...defaultProps} setClose={setClose} close={false} />,
    );

    const saveButton = screen.getByTestId("SetUpAccessBtn_SAVE");
    fireEvent.click(saveButton);
    expect(setClose).toHaveBeenCalledWith(true);

    rerender(
      <SetUpAccess {...defaultProps} setClose={setClose} close={true} />,
    );

    fireEvent.click(saveButton);
    expect(setClose).toHaveBeenCalledWith(false);
  });
});
