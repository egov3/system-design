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

  it("(9) Should render hintText when provided", () => {
    render(
      <BaseComponents.InputField
        id="input"
        aria-label="input field"
        labelText="Test label"
        hintText="This is a hint text"
        value="test"
      />,
    );

    const hintText = screen.getByText("This is a hint text");
    expect(hintText).toBeInTheDocument();
  });

  it("(10) Should not render hintText when not provided", () => {
    render(
      <BaseComponents.InputField
        id="input"
        aria-label="input field"
        labelText="Test label"
        value="test"
      />,
    );

    const hintText = screen.queryByText("This is a hint text");
    expect(hintText).not.toBeInTheDocument();
  });

  it("(11) Should apply error class to label and hintText when error is true", () => {
    render(
      <BaseComponents.InputField
        id="input"
        aria-label="input field"
        labelText="Test label"
        value="test"
        error={true}
        hintText="Error hint text"
      />,
    );

    const label = screen.getByText("Test label");
    const hintText = screen.getByText("Error hint text");

    expect(label).toHaveClass("error");
    expect(hintText).toHaveClass("error");
  });

  it("(12) Should not apply error class when error is false", () => {
    render(
      <BaseComponents.InputField
        id="input"
        aria-label="input field"
        labelText="Test label"
        hintText="Hint text"
        value="test"
        error={false}
      />,
    );

    const label = screen.getByText("Test label");
    const hintText = screen.getByText("Hint text");

    expect(label).not.toHaveClass("error");
    expect(hintText).not.toHaveClass("error");
  });
});
