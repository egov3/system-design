import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MultiSelectModal } from "~baseComponents";

const options = [
  { label: "Option 1", value: "option1" },
  { label: "Option 2", value: "option2" },
  { label: "Option 3", value: "option3" },
];

const setSelectedOptions = jest.fn();

const renderMultiSelectModal = (selectedOptions: string[] = []) =>
  render(
    <MultiSelectModal
      labelText="Multi Select Modal label"
      modalTitle="Select options"
      options={options}
      selectedOptions={selectedOptions}
      setSelectedOptions={setSelectedOptions}
      lang="ru"
    />,
  );

describe("MultiSelectModal", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("(1) Should render title and disable submit button when nothing is checked", () => {
    renderMultiSelectModal();

    fireEvent.click(screen.getByTestId("SelectBoxModal_BUTTON"));

    expect(screen.getByTestId("Modal_TITLE")).toHaveTextContent(
      "Select options",
    );
    expect(screen.getByTestId("MultiSelectModal_SUBMIT")).toBeDisabled();
  });

  it("(2) Should submit checked options and close modal", () => {
    renderMultiSelectModal();

    fireEvent.click(screen.getByTestId("SelectBoxModal_BUTTON"));

    const [first, , third] = screen.getAllByTestId("Checkbox_INPUT");
    fireEvent.click(first);
    fireEvent.click(third);
    fireEvent.click(screen.getByTestId("MultiSelectModal_SUBMIT"));

    expect(setSelectedOptions).toHaveBeenCalledWith(["option1", "option3"]);
    expect(screen.queryByTestId("Modal_WRAPPER")).not.toBeInTheDocument();
  });

  it("(3) Should display selected option labels in trigger", () => {
    renderMultiSelectModal(["option1", "option2"]);

    expect(screen.getByTestId("SelectBoxModal_VALUE")).toHaveTextContent(
      "Option 1, Option 2",
    );
  });

  it("(4) Should filter options by search", async () => {
    renderMultiSelectModal();

    fireEvent.click(screen.getByTestId("SelectBoxModal_BUTTON"));
    fireEvent.change(screen.getByTestId("SearchBar_INPUT"), {
      target: { value: "option 2" },
    });

    await waitFor(() => {
      expect(screen.getAllByTestId("Checkbox_INPUT")).toHaveLength(1);
    });
    expect(screen.getByText("Option 2")).toBeInTheDocument();
  });

  it("(5) Should discard unsubmitted changes on close", () => {
    renderMultiSelectModal();

    fireEvent.click(screen.getByTestId("SelectBoxModal_BUTTON"));
    fireEvent.click(screen.getAllByTestId("Checkbox_INPUT")[0]);
    fireEvent.click(screen.getByTestId("ModalHeaderBtn_CLOSE"));

    expect(setSelectedOptions).not.toHaveBeenCalled();

    fireEvent.click(screen.getByTestId("SelectBoxModal_BUTTON"));

    expect(screen.getAllByTestId("Checkbox_INPUT")[0]).not.toBeChecked();
  });
});
