import { fireEvent, render, screen } from "@testing-library/react";
import { BaseComponents } from "~baseComponents";

describe("InputField", () => {
  it("(1) Should handle focus", () => {
    const handleFocus = jest.fn();

    render(
      <BaseComponents.InputField
        id="input"
        ariaLabel="input field"
        dataTestid="test-INPUT"
        labelText="Test label"
        variant="code"
        isClearable={true}
        onFocus={handleFocus}
      />,
    );

    const inputElement = screen.getByLabelText("Test label");

    fireEvent.focus(inputElement);
    expect(handleFocus).toHaveBeenCalled();
  });

  it("(2) Should handle blur", () => {
    const handleBlur = jest.fn();

    render(
      <BaseComponents.InputField
        id="input"
        ariaLabel="input field"
        labelText="Test label"
        type="number"
        onBlur={handleBlur}
      />,
    );

    const inputElement = screen.getByLabelText("Test label");

    fireEvent.blur(inputElement);
    expect(handleBlur).toHaveBeenCalled();
  });

  it("(3) Should clear input when clear icon is clicked", () => {
    const handleChange = jest.fn();

    render(
      <BaseComponents.InputField
        id="input"
        ariaLabel="input field"
        isClearable={true}
        focused={true}
        value="Some text"
        onChange={handleChange}
      />,
    );

    const clearIcon = screen.getByTestId("Icons_CLEAR");
    fireEvent.click(clearIcon);

    expect(handleChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({ value: "" }),
      }),
    );
  });

  it("(4) Should handle press enter key", () => {
    const handleEnterPress = jest.fn();

    render(
      <BaseComponents.InputField
        id="input"
        ariaLabel="input field"
        labelText="Test label"
        onEnterPress={handleEnterPress}
      />,
    );

    const inputElement = screen.getByLabelText("Test label");

    fireEvent.keyDown(inputElement, { key: "Enter", code: "Enter" });

    expect(handleEnterPress).toHaveBeenCalled();
  });
});
