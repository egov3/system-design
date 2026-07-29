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

  it("(4) Should handle a label action without changing the checked state", () => {
    const setChecked = jest.fn();
    const onActionClick = jest.fn();

    render(
      <Checkbox
        label="Consent to data processing."
        actionLabel="Details"
        onActionClick={onActionClick}
        checked={false}
        setChecked={setChecked}
      />,
    );

    fireEvent.click(screen.getByTestId("Checkbox_ACTION"));

    expect(onActionClick).toHaveBeenCalledTimes(1);
    expect(setChecked).not.toHaveBeenCalled();
  });

  it("(5) Should render hint text when provided", () => {
    render(
      <Checkbox
        label="Consent"
        hintText="Required to continue"
        checked={false}
        setChecked={jest.fn()}
      />,
    );

    expect(screen.getByTestId("CheckboxHint_TEXT")).toHaveTextContent(
      "Required to continue",
    );
  });
});
