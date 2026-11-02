import { fireEvent, render, screen } from "@testing-library/react";

import { DropdownSelect } from "~baseComponents";

const options = [
  { label: "ID card", value: "idCard" },
  { label: "Passport", value: "passport" },
];

const setSelectedOption = jest.fn();

const renderDropdownSelect = (selectedOption = "") =>
  render(
    <DropdownSelect
      labelText="Select document type"
      name="Document type"
      options={options}
      selectedOption={selectedOption}
      setSelectedOption={setSelectedOption}
      lang="ru"
    />,
  );

describe("DropdownSelect", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("(1) Should select option and close panel", () => {
    renderDropdownSelect();

    fireEvent.click(screen.getByTestId("SelectBoxModal_BUTTON"));
    fireEvent.click(screen.getByText("Passport"));

    expect(setSelectedOption).toHaveBeenCalledWith("passport");
    expect(
      screen.queryByTestId("DropdownSelect_PANEL"),
    ).not.toBeInTheDocument();
  });

  it("(2) Should display selected option label in trigger", () => {
    renderDropdownSelect("idCard");

    expect(screen.getByTestId("SelectBoxModal_VALUE")).toHaveTextContent(
      "ID card",
    );
  });

  it("(3) Should close panel on outside click", () => {
    renderDropdownSelect();

    fireEvent.click(screen.getByTestId("SelectBoxModal_BUTTON"));
    fireEvent.mouseDown(document.body);

    expect(
      screen.queryByTestId("DropdownSelect_PANEL"),
    ).not.toBeInTheDocument();
  });

  it("(4) Should close panel on Escape", () => {
    renderDropdownSelect();

    fireEvent.click(screen.getByTestId("SelectBoxModal_BUTTON"));
    fireEvent.keyDown(document, { key: "Escape" });

    expect(
      screen.queryByTestId("DropdownSelect_PANEL"),
    ).not.toBeInTheDocument();
  });
});
