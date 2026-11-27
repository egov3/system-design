import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { SelectFieldModal } from "~components";

const defaultProps = {
  lang: "ru" as const,
  title: "Title",
  name: "field",
  options: [
    { value: "1", label: "First" },
    { value: "2", label: "Second" },
  ],
  selected: "",
  onConfirm: jest.fn(),
  onClose: jest.fn(),
};

describe("SelectFieldModal", () => {
  it("(1) Should keep pending selection and confirm it with the chosen value", () => {
    render(<SelectFieldModal {...defaultProps} />);
    const confirmBtn = screen.getByTestId("SelectFieldModal_CONFIRM_BTN");
    expect(confirmBtn).toBeDisabled();
    expect(confirmBtn).toHaveTextContent("Выбрать");

    fireEvent.click(screen.getAllByTestId("RadioGroupItem_INPUT")[1]);
    fireEvent.click(confirmBtn);
    expect(defaultProps.onConfirm).toHaveBeenCalledWith("2");
  });

  it("(2) Should filter options by search and show empty state", async () => {
    render(
      <SelectFieldModal
        {...defaultProps}
        isWithSearch={true}
        emptyState={<div data-testid="EMPTY" />}
      />,
    );
    const input = screen.getByTestId("SearchBar_INPUT");

    fireEvent.change(input, { target: { value: "sec" } });
    await waitFor(() =>
      expect(screen.getAllByTestId("RadioGroupItem_TEXT")).toHaveLength(1),
    );
    expect(screen.getByText("Second")).toBeInTheDocument();

    fireEvent.change(input, { target: { value: "zzz" } });
    expect(await screen.findByTestId("EMPTY")).toBeInTheDocument();
  });

  it("(3) Should show default empty text, custom label and restore options on clear", async () => {
    render(
      <SelectFieldModal
        {...defaultProps}
        isWithSearch={true}
        isFixedHeight={true}
        confirmLabel="Custom"
      />,
    );
    expect(
      screen.getByTestId("SelectFieldModal_CONFIRM_BTN"),
    ).toHaveTextContent("Custom");

    fireEvent.change(screen.getByTestId("SearchBar_INPUT"), {
      target: { value: "zzz" },
    });
    expect(
      await screen.findByText("Отсутствуют результаты для выбора"),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("SearchBar_CLEAR_BUTTON"));
    await waitFor(() =>
      expect(screen.getAllByTestId("RadioGroupItem_TEXT")).toHaveLength(2),
    );
  });
});
