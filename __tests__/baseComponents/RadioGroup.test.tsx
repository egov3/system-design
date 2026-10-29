import { fireEvent, render, screen } from "@testing-library/react";

import { RadioGroup } from "~baseComponents";

const radioGroupItems = [
  { label: "ID card", value: "idCard" },
  { label: "Passport", value: "passport", hintText: "For travel abroad" },
];
const name = "documentType";
const legend = "Select a document type";

const setSelectedOption = jest.fn();

describe("RadioGroup", () => {
  it("(1) Should display hint text and check option if clicked", () => {
    render(
      <RadioGroup
        radioGroupItems={radioGroupItems}
        setSelectedOption={setSelectedOption}
        selectedOption={radioGroupItems[0].value}
        name={name}
        legend={legend}
      />,
    );

    expect(screen.getByTestId("RadioGroupItemHint_TEXT")).toBeInTheDocument();
    const options = screen.getAllByTestId("RadioGroupItem_LABEL");

    fireEvent.click(options[1]);

    expect(setSelectedOption).toHaveBeenCalledWith("passport");
  });

  it("(2) Should name the group by legend and pass name and required to inputs", () => {
    render(
      <RadioGroup
        radioGroupItems={radioGroupItems}
        setSelectedOption={setSelectedOption}
        selectedOption=""
        name={name}
        legend={legend}
        required
      />,
    );

    expect(screen.getByRole("group", { name: legend })).toBeInTheDocument();
    for (const input of screen.getAllByRole("radio")) {
      expect(input).toHaveAttribute("name", name);
      expect(input).toBeRequired();
    }
  });
});
