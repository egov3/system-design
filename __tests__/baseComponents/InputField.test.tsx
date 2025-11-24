import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { BaseComponents } from "~baseComponents";

describe("InputField", () => {
  it("(1) Should handle focus", () => {
    const handleFocus = jest.fn();

    render(
      <BaseComponents.InputField
        id="input"
        aria-label="input field"
        labelText="Test label"
        variant="code"
        isClearable={true}
        setFocused={handleFocus}
      />,
    );

    const inputElement = screen.getByTestId("InputField_INPUT");

    fireEvent.focus(inputElement);
    expect(handleFocus).toHaveBeenCalled();
  });

  it("(2) Should clear input when clear icon is clicked", () => {
    const handleChange = jest.fn();

    render(
      <BaseComponents.InputField
        id="input"
        aria-label="input field"
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

  it("(3) Should handle press enter key", () => {
    const handleEnterPress = jest.fn();

    render(
      <BaseComponents.InputField
        id="input"
        aria-label="input field"
        labelText="Test label"
        onEnterPress={handleEnterPress}
      />,
    );

    const inputElement = screen.getByTestId("InputField_INPUT");

    fireEvent.keyDown(inputElement, { key: "Enter", code: "Enter" });

    expect(handleEnterPress).toHaveBeenCalled();
  });

  it("(4) Should provide correct ref for input element", () => {
    let refValue: HTMLInputElement | null = null;

    const TestComponent = () => {
      const ref = React.useRef<HTMLInputElement>(null);

      React.useEffect(() => {
        refValue = ref.current;
      }, []);

      return (
        <BaseComponents.InputField
          ref={ref}
          id="input"
          aria-label="input field"
          labelText="Test label"
          value="Test value"
        />
      );
    };

    render(<TestComponent />);

    const inputElement = screen.getByTestId("InputField_INPUT");
    expect(refValue).toBe(inputElement);
  });

  it("(5) Should handle controlled focused state", () => {
    const setFocused = jest.fn();

    render(
      <BaseComponents.InputField
        id="input"
        aria-label="input field"
        labelText="Test label"
        focused={true}
        setFocused={setFocused}
      />,
    );

    const inputElement = screen.getByTestId("InputField_INPUT");

    fireEvent.focus(inputElement);
    expect(setFocused).toHaveBeenCalledWith(true);

    fireEvent.blur(inputElement);
    expect(setFocused).toHaveBeenCalledWith(false);
  });

  it("(6) Should call onEnterPress when Enter key is pressed", () => {
    const handleEnterPress = jest.fn();

    render(
      <BaseComponents.InputField
        id="input"
        aria-label="input field"
        onEnterPress={handleEnterPress}
      />,
    );

    const inputElement = screen.getByTestId("InputField_INPUT");
    fireEvent.keyDown(inputElement, { key: "a", code: "KeyA" });
    expect(handleEnterPress).not.toHaveBeenCalled();

    fireEvent.keyDown(inputElement, { key: "Enter", code: "Enter" });
    expect(handleEnterPress).toHaveBeenCalledTimes(1);
    expect(handleEnterPress).toHaveBeenCalledWith(
      expect.objectContaining({ key: "Enter" }),
    );
  });

  it("(7) Should call onChange with empty string when clear icon is clicked", () => {
    const handleChange = jest.fn();

    render(
      <BaseComponents.InputField
        id="input"
        aria-label="input field"
        value="Some text"
        isClearable={true}
        onChange={handleChange}
      />,
    );

    const clearIcon = screen.getByTestId("Icons_CLEAR");
    fireEvent.click(clearIcon);

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({ value: "" }),
      }),
    );
  });

  it("(8) Should return early if onChange is undefined", () => {
    render(
      <BaseComponents.InputField
        id="input"
        aria-label="input field"
        value="Some text"
        isClearable={true}
      />,
    );

    const clearIcon = screen.getByTestId("Icons_CLEAR");
    expect(() => fireEvent.click(clearIcon)).not.toThrow();
  });
});
