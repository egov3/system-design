import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { SelectFieldModal } from "~components";

const options = [
  { value: "1", label: "First" },
  { value: "2", label: "Second" },
];

const defaultProps = {
  lang: "ru" as const,
  title: "Title",
  name: "field",
  options,
  selectedValue: "",
  onSelect: jest.fn(),
  confirmLabel: "Confirm",
  onConfirm: jest.fn(),
  onClose: jest.fn(),
  onSearchChange: jest.fn(),
};

describe("SelectFieldModal", () => {
  it("renders options, confirms, shows empty state, and supports search", async () => {
    const { rerender } = render(<SelectFieldModal {...defaultProps} />);
    expect(screen.getByTestId("SelectFieldModal_CONFIRM_BTN")).toBeDisabled();
    fireEvent.click(screen.getAllByTestId("RadioGroupItem_INPUT")[1]);
    expect(defaultProps.onSelect).toHaveBeenCalledWith("2");

    rerender(<SelectFieldModal {...defaultProps} selectedValue="1" />);
    fireEvent.click(screen.getByTestId("SelectFieldModal_CONFIRM_BTN"));
    expect(defaultProps.onConfirm).toHaveBeenCalled();

    rerender(
      <SelectFieldModal
        {...defaultProps}
        options={[]}
        emptyState={<div data-testid="EMPTY" />}
      />,
    );
    expect(screen.getByTestId("EMPTY")).toBeInTheDocument();

    rerender(<SelectFieldModal {...defaultProps} isWithSearch={true} />);
    const input = screen
      .getByTestId("SelectFieldModal_SEARCH")
      .querySelector("input")!;
    fireEvent.change(input, { target: { value: "a" } });
    await waitFor(() =>
      expect(defaultProps.onSearchChange).toHaveBeenCalledWith("a"),
    );
  });
});
