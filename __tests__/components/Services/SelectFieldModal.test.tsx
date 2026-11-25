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
});
