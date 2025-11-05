import { fireEvent, render, screen } from "@testing-library/react";
import { BaseComponents } from "~baseComponents";

const radioGroupItems = [
  { label: "Option 1", value: "option1" },
  { label: "Option 2", value: "option2" },
];

const setSelectedOption=jest.fn();

describe("RadioGroup", () => {
  it("(1) Should check option if clicked", () => {
    render(<BaseComponents.RadioGroup
      radioGroupItems={radioGroupItems}
      setSelectedOption={setSelectedOption}
      selectedOption={radioGroupItems[0].value}
    />);
    
    const options =screen.getAllByTestId("RadioGroupItem_LABEL");

    fireEvent.click(options[1]);

    expect(setSelectedOption).toHaveBeenCalledWith("option2");
  });
});
