import { fireEvent, render, screen } from "@testing-library/react";

import { SelectOrRadioField } from "~components";

describe("SelectOrRadioField", () => {
  const items = [
    { value: "1", label: "First" },
    { value: "2", label: "Second" },
  ];

  const defaultProps = {
    lang: "ru" as const,
    isModalMode: false,
    name: "field",
    legend: "Legend",
    placeholderText: "Placeholder",
    items,
    selectedValue: "",
    onSelect: jest.fn(),
    onOpenModal: jest.fn(),
  };

  it("(1) Should render a radio group and call onSelect when not in modal mode", () => {
    const onSelect = jest.fn();
    render(<SelectOrRadioField {...defaultProps} onSelect={onSelect} />);

    expect(screen.getByTestId("RadioGroup_FIELDSET")).toBeInTheDocument();
    fireEvent.click(screen.getAllByTestId("RadioGroupItem_INPUT")[1]);
    expect(onSelect).toHaveBeenCalledWith("2");
  });

  it("(2) Should render a select box button and call onOpenModal when in modal mode", () => {
    const onOpenModal = jest.fn();
    render(
      <SelectOrRadioField
        {...defaultProps}
        isModalMode={true}
        selectedValue="2"
        onOpenModal={onOpenModal}
      />,
    );

    expect(screen.getByTestId("SelectBoxModal_BUTTON")).toBeInTheDocument();
    expect(screen.getByTestId("SelectBoxModal_VALUE")).toHaveTextContent(
      "Second",
    );
    fireEvent.click(screen.getByTestId("SelectBoxModal_BUTTON"));
    expect(onOpenModal).toHaveBeenCalled();
  });

  it("(3) Should not render the hint when hintText is not provided", () => {
    render(<SelectOrRadioField {...defaultProps} />);
    expect(
      screen.queryByTestId("SelectOrRadioField_HINT"),
    ).not.toBeInTheDocument();
  });

  it("(4) Should render the hint when hintText is provided", () => {
    render(<SelectOrRadioField {...defaultProps} hintText="Some hint" />);
    expect(screen.getByTestId("SelectOrRadioField_HINT")).toHaveTextContent(
      "Some hint",
    );
  });
});
