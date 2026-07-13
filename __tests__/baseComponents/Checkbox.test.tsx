import { fireEvent, render, screen } from "@testing-library/react";
import { Checkbox } from "~baseComponents";

describe("Checkbox", () => {
  it("(1) Should change its boolean state", () => {
    const setChecked = jest.fn();
    render(
      <Checkbox label="Consent" checked={false} setChecked={setChecked} />,
    );
    fireEvent.click(screen.getByTestId("Checkbox_INPUT"));
    expect(setChecked).toHaveBeenCalledWith(true);
  });

  it("(2) Should support checked and disabled states", () => {
    render(
      <Checkbox
        label="Consent"
        checked={true}
        setChecked={jest.fn()}
        disabled={true}
      />,
    );
    const input = screen.getByTestId("Checkbox_INPUT");
    expect(input).toBeChecked();
    expect(input).toBeDisabled();
  });

  it("(3) Should support checked and enabled states", () => {
    render(<Checkbox label="Consent" checked={true} setChecked={jest.fn()} />);

    const input = screen.getByTestId("Checkbox_INPUT");
    expect(input).toBeChecked();
    expect(input).toBeEnabled();
    expect(
      screen.getByTestId("Checkbox_CONTROL").querySelector("path"),
    ).toHaveAttribute("fill", "var(--icon-accent-color)");
  });
});
