import { fireEvent, render, screen } from "@testing-library/react";
import { DropdownSelect } from "~baseComponents";

const options = [
  { label: "Option 1", value: "option1" },
  { label: "Option 2", value: "option2" },
];

const setSelectedOption = jest.fn();

const renderDropdownSelect = (selectedOption = "") =>
  render(
    <DropdownSelect
      labelText="Dropdown Select label"
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
    fireEvent.click(screen.getByText("Option 2"));

    expect(setSelectedOption).toHaveBeenCalledWith("option2");
    expect(
      screen.queryByTestId("DropdownSelect_PANEL"),
    ).not.toBeInTheDocument();
  });

  it("(2) Should display selected option label in trigger", () => {
    renderDropdownSelect("option1");

    expect(screen.getByTestId("SelectBoxModal_VALUE")).toHaveTextContent(
      "Option 1",
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
