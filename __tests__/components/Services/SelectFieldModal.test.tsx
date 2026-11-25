import { fireEvent, render, screen } from "@testing-library/react";

import { SelectFieldModal } from "~components";

const defaultProps = {
  lang: "ru" as const,
  title: "Title",
  name: "field",
  options: [
    { value: "1", label: "First" },
    { value: "2", label: "Second" },
  ],
  selectedValue: "",
  onSelect: jest.fn(),
  confirmLabel: "Confirm",
  onConfirm: jest.fn(),
  onClose: jest.fn(),
};

describe("SelectFieldModal", () => {
  it("(1) Should select an option and confirm only when a value is selected", () => {
    const { rerender } = render(<SelectFieldModal {...defaultProps} />);
    expect(screen.getByTestId("SelectFieldModal_CONFIRM_BTN")).toBeDisabled();
    fireEvent.click(screen.getAllByTestId("RadioGroupItem_INPUT")[1]);
    expect(defaultProps.onSelect).toHaveBeenCalledWith("2");

    rerender(<SelectFieldModal {...defaultProps} selectedValue="1" />);
    fireEvent.click(screen.getByTestId("SelectFieldModal_CONFIRM_BTN"));
    expect(defaultProps.onConfirm).toHaveBeenCalled();
  });
});
