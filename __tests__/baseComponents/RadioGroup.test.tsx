import { fireEvent, render, screen } from "@testing-library/react";
import { BaseComponents } from "~baseComponents";

const radioGroupItems = [
  { label: "Option 1", value: "option1" },
  { label: "Option 2", value: "option2" },
];

const setSelectedOption = jest.fn();

describe("RadioGroup", () => {
  it("(1) Should check option if clicked", () => {
    render(
      <BaseComponents.RadioGroup
        radioGroupItems={radioGroupItems}
        setSelectedOption={setSelectedOption}
        selectedOption={radioGroupItems[0].value}
      />,
    );

    const options = screen.getAllByTestId("RadioGroupItem_LABEL");

    fireEvent.click(options[1]);

    expect(setSelectedOption).toHaveBeenCalledWith("option2");
  });

  it("(2) Should handle duplicate values correctly", () => {
    const duplicateItems = [
      { label: "First duplicate", value: "duplicate" },
      { label: "Second duplicate", value: "duplicate" },
      { label: "Unique option", value: "unique" },
    ];
    const setSelected = jest.fn();

    render(
      <BaseComponents.RadioGroup
        radioGroupItems={duplicateItems}
        setSelectedOption={setSelected}
        selectedOption=""
      />,
    );

    const options = screen.getAllByTestId("RadioGroupItem_LABEL");

    fireEvent.click(options[1]);
    expect(setSelected).toHaveBeenCalledWith("duplicate");

    fireEvent.click(options[2]);
    expect(setSelected).toHaveBeenCalledWith("unique");

    fireEvent.click(options[0]);
    expect(setSelected).toHaveBeenCalledWith("duplicate");
  });
});
