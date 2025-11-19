import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
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

    const inputElement = screen.getByTestId("InputField_INPUT");

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

    const inputElement = screen.getByTestId("InputField_INPUT");

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

    const inputElement = screen.getByTestId("InputField_INPUT");

    fireEvent.keyDown(inputElement, { key: "Enter", code: "Enter" });

    expect(handleEnterPress).toHaveBeenCalled();
  });

  it("(5) Should handle textarea auto-expand on input", () => {
    const handleChange = jest.fn();

    render(
      <BaseComponents.InputField
        id="textarea"
        ariaLabel="textarea field"
        labelText="Textarea label"
        autoExpand={true}
        value="Initial value"
        onChange={handleChange}
      />,
    );

    const textareaElement = screen.getByTestId("InputField_INPUT");

    Object.defineProperty(textareaElement, "scrollHeight", {
      get: () => 100,
      configurable: true,
    });

    fireEvent.input(textareaElement, {
      target: { value: "New longer text that should expand the textarea" },
    });

    expect(textareaElement.style.height).toBe("100px");
    expect(handleChange).toHaveBeenCalled();
  });

  it("(6) Should provide correct ref for input element", () => {
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
          ariaLabel="input field"
          labelText="Test label"
          value="Test value"
        />
      );
    };

    render(<TestComponent />);

    const inputElement = screen.getByTestId("InputField_INPUT");
    expect(refValue).toBe(inputElement);
  });

  it("(7) Should provide correct ref for textarea element when autoExpand is true", () => {
    let refValue: HTMLTextAreaElement | null = null;

    const TestComponent = () => {
      const ref = React.useRef<HTMLTextAreaElement>(null);

      React.useEffect(() => {
        refValue = ref.current;
      }, []);

      return (
        <BaseComponents.InputField
          ref={ref}
          id="textarea"
          ariaLabel="textarea field"
          labelText="Textarea label"
          autoExpand={true}
          value="Test value"
        />
      );
    };

    render(<TestComponent />);

    const textareaElement = screen.getByTestId("InputField_INPUT");
    expect(refValue).toBe(textareaElement);
  });

  it("(8) Should handle textarea input without onChange", () => {
    render(
      <BaseComponents.InputField
        id="textarea"
        ariaLabel="textarea field"
        labelText="Textarea label"
        autoExpand={true}
        value="Initial value"
      />,
    );

    const textareaElement = screen.getByTestId("InputField_INPUT");

    Object.defineProperty(textareaElement, "scrollHeight", {
      get: () => 80,
      configurable: true,
    });

    fireEvent.input(textareaElement, {
      target: { value: "Some text" },
    });

    expect(textareaElement.style.height).toBe("80px");
  });

  it("(9) Should handle controlled focused state", () => {
    const setFocused = jest.fn();

    render(
      <BaseComponents.InputField
        id="input"
        ariaLabel="input field"
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

  it("(10) Should handle uncontrolled focused state", () => {
    render(
      <BaseComponents.InputField
        id="input"
        ariaLabel="input field"
        labelText="Test label"
      />,
    );

    const inputElement = screen.getByTestId("InputField_INPUT");

    fireEvent.focus(inputElement);
    fireEvent.blur(inputElement);
  });
});
