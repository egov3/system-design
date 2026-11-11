import { fireEvent, render, screen } from "@testing-library/react";
import { createRef } from "react";

import { TextareaField } from "~baseComponents";

describe("TextareaField", () => {
  it("(1) Should handle textarea auto-expand on input", () => {
    const handleChange = jest.fn();

    render(
      <TextareaField
        id="textarea"
        aria-label="textarea field"
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
      <TextareaField
        id="textarea"
        aria-label="textarea field"
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

  it("(3) Should resize a prefilled textarea when value changes", () => {
    const scrollHeightSpy = jest
      .spyOn(HTMLTextAreaElement.prototype, "scrollHeight", "get")
      .mockReturnValue(140);
    const ref = createRef<HTMLTextAreaElement>();

    const { rerender } = render(
      <TextareaField
        ref={ref}
        id="textarea"
        aria-label="textarea field"
        labelText="Textarea label"
        value={"first line\nsecond line"}
      />,
    );

    const textareaElement = screen.getByTestId("TextAreaField_TEXTAREA");

    expect(textareaElement.style.height).toBe("140px");
    expect(ref.current).toBe(textareaElement);

    scrollHeightSpy.mockReturnValue(200);

    rerender(
      <TextareaField
        ref={ref}
        id="textarea"
        aria-label="textarea field"
        labelText="Textarea label"
        value={"first line\nsecond line\nthird line"}
      />,
    );

    expect(textareaElement.style.height).toBe("200px");
    scrollHeightSpy.mockRestore();
  });
});
