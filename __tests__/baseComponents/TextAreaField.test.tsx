import { fireEvent, render, screen } from "@testing-library/react";
import { BaseComponents } from "~baseComponents";

describe("TextareaField", () => {
  it("(1) Should handle textarea auto-expand on input", () => {
    const handleChange = jest.fn();

    render(
      <BaseComponents.TextareaField
        id="textarea"
        ariaLabel="textarea field"
        labelText="Textarea label"
        value="Initial value"
        onChange={handleChange}
      />,
    );

    const textareaElement = screen.getByTestId("TextAreaField_TEXTAREA");

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

  it("(2) Should handle textarea without onChange", () => {
    render(
      <BaseComponents.TextareaField
        id="textarea"
        ariaLabel="textarea field"
        labelText="Textarea label"
        value="Initial value"
        variant="code"
      />,
    );

    const textareaElement = screen.getByTestId("TextAreaField_TEXTAREA");

    Object.defineProperty(textareaElement, "scrollHeight", {
      get: () => 80,
      configurable: true,
    });

    fireEvent.input(textareaElement, {
      target: { value: "Some text" },
    });

    expect(textareaElement.style.height).toBe("80px");
  });
});
