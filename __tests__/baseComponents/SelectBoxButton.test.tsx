import { fireEvent, render, screen } from "@testing-library/react";
import { BaseComponents } from "~baseComponents";

const setIsOpen = jest.fn();

describe("SelectBox", () => {
  it("(1) Should change title style if modal value is empty", () => {
    render(
      <BaseComponents.SelectBoxButton
        handleClick={setIsOpen}
        modalValue=""
        labelText="SelectBox"
        disabled={false}
        error={false}
        lang="en"
      />,
    );

    const label = screen.getByTestId("SelectBoxModal_LABEL");
    expect(label).toHaveClass("body2Regular");
  });

  it("(2) Should call setIsOpen when clicked", () => {
    render(
      <BaseComponents.SelectBoxButton
        handleClick={setIsOpen}
        modalValue="select value"
        labelText="SelectBox"
        disabled={false}
        error={false}
        lang="en"
      />,
    );

    const button = screen.getByTestId("SelectBoxModal_BUTTON");

    fireEvent.click(button);

    expect(setIsOpen).toHaveBeenCalled();
  });

  it("(3) Should change title style when error true", () => {
    render(
      <BaseComponents.SelectBoxButton
        handleClick={setIsOpen}
        modalValue="select value"
        labelText="SelectBox"
        disabled={false}
        error={true}
        lang="en"
      />,
    );

    const selectElement = screen.getByTestId("SelectBoxModal_LABEL");
    expect(selectElement).toHaveClass("errorLabel");
  });
});
