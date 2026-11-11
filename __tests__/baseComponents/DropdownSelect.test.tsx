import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { DropdownSelect } from "~baseComponents";
import { i18n } from "~constants/i18n";

const options = [
  { label: "ID card", value: "idCard" },
  { label: "Passport", value: "passport" },
];

const setSelectedOption = jest.fn();

const renderSearchDropdownSelect = (isLoading = false) =>
  render(
    <DropdownSelect
      labelText="Select document type"
      name="Document type"
      options={options}
      selectedOption=""
      setSelectedOption={setSelectedOption}
      isWithSearch={true}
      isLoading={isLoading}
      lang="ru"
    />,
  );

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

  it("(5) Should show nothing found and close panel on trigger click", async () => {
    renderSearchDropdownSelect();

    fireEvent.click(screen.getByTestId("SelectBoxModal_BUTTON"));
    fireEvent.change(screen.getByTestId("SearchBar_INPUT"), {
      target: { value: "Driver license" },
    });

    await waitFor(() => {
      expect(screen.getByTestId("DropdownSelect_EMPTY_TEXT")).toHaveTextContent(
        i18n.DropdownSelect.NothingFound.ru,
      );
    });

    fireEvent.click(screen.getByTestId("SelectBoxModal_BUTTON"));

    expect(
      screen.queryByTestId("DropdownSelect_PANEL"),
    ).not.toBeInTheDocument();
  });

  it("(6) Should show no results while loading", () => {
    renderSearchDropdownSelect(true);

    fireEvent.click(screen.getByTestId("SelectBoxModal_BUTTON"));

    expect(screen.getByTestId("DropdownSelect_EMPTY_TEXT")).toHaveTextContent(
      i18n.DropdownSelect.NoResults.ru,
    );
  });

  it("(7) Should keep panel open on inside click and other keys", () => {
    renderSearchDropdownSelect();

    fireEvent.click(screen.getByTestId("SelectBoxModal_BUTTON"));
    fireEvent.mouseDown(screen.getByTestId("SearchBar_INPUT"));
    fireEvent.keyDown(document, { key: "Enter" });

    expect(screen.getByTestId("DropdownSelect_PANEL")).toBeInTheDocument();
  });
});
