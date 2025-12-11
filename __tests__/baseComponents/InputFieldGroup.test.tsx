import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BaseComponents } from "~baseComponents";

describe("InputFieldGroup", () => {
  const length = 4;
  const code = ["1", "2", "", "4"];
  const ariaLabel = "code input";

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("(1) Should render correct number of input fields", () => {
    render(
      <BaseComponents.InputFieldGroup
        length={length}
        code={code}
        aria-label={ariaLabel}
        handleInputChange={() => () => {}}
      />,
    );

    const inputs = Array.from({ length }).map((_, idx) =>
      screen.getByTestId(`InputFieldGroup_WRAPPER_INPUT_FIELD_${idx}`),
    );
    expect(inputs).toHaveLength(length);
  });

  it("(2) Should call handleInputChange on input change", () => {
    const handleInputChange = jest.fn(() => jest.fn());

    render(
      <BaseComponents.InputFieldGroup
        length={length}
        code={code}
        aria-label={ariaLabel}
        handleInputChange={handleInputChange}
      />,
    );

    const input0 = screen.getByTestId("InputFieldGroup_WRAPPER_INPUT_FIELD_0");
    fireEvent.change(input0, { target: { value: "5" } });

    expect(handleInputChange).toHaveBeenCalledWith(0);
  });

  it("(3) Should call handleKeyDown on key press", () => {
    const handleKeyDown = jest.fn(() => jest.fn());

    render(
      <BaseComponents.InputFieldGroup
        length={length}
        code={code}
        aria-label={ariaLabel}
        handleInputChange={() => () => {}}
        handleKeyDown={handleKeyDown}
      />,
    );

    const input1 = screen.getByTestId("InputFieldGroup_WRAPPER_INPUT_FIELD_1");
    fireEvent.keyDown(input1, { key: "Enter", code: "Enter" });

    expect(handleKeyDown).toHaveBeenCalledWith(1);
  });

  it("(4) Should handle controlled focused state", () => {
    const setFocused = jest.fn();

    render(
      <BaseComponents.InputFieldGroup
        length={length}
        code={code}
        aria-label={ariaLabel}
        focused={true}
        setFocused={setFocused}
        handleInputChange={() => () => {}}
      />,
    );

    const input2 = screen.getByTestId("InputFieldGroup_WRAPPER_INPUT_FIELD_2");

    fireEvent.focus(input2);
    expect(setFocused).toHaveBeenCalledWith(true);

    fireEvent.blur(input2);
    expect(setFocused).toHaveBeenCalledWith(false);
  });

  it("(5) Should filter non-digit characters and take only first digit", () => {
    const handleInputChange = jest.fn(() => jest.fn());

    render(
      <BaseComponents.InputFieldGroup
        length={length}
        code={code}
        aria-label={ariaLabel}
        handleInputChange={handleInputChange}
      />,
    );

    const input2 = screen.getByTestId("InputFieldGroup_WRAPPER_INPUT_FIELD_2");
    fireEvent.change(input2, { target: { value: "A" } });
    expect(handleInputChange).toHaveBeenCalledWith(2);
    fireEvent.change(input2, { target: { value: "567" } });
    expect(handleInputChange).toHaveBeenCalledWith(2);
  });

  it("(6) Should auto-focus next input when digit is entered", () => {
    render(
      <BaseComponents.InputFieldGroup
        length={length}
        code={code}
        aria-label={ariaLabel}
        handleInputChange={() => () => {}}
      />,
    );

    const input0 = screen.getByTestId("InputFieldGroup_WRAPPER_INPUT_FIELD_0");
    const input1 = screen.getByTestId("InputFieldGroup_WRAPPER_INPUT_FIELD_1");

    const focusMock = jest.fn();
    input1.focus = focusMock;

    fireEvent.change(input0, { target: { value: "3" } });

    jest.runAllTimers();

    expect(focusMock).toHaveBeenCalled();
  });

  it("(7) Should not auto-focus next input when on last input", () => {
    render(
      <BaseComponents.InputFieldGroup
        length={length}
        code={["1", "2", "3", ""]}
        aria-label={ariaLabel}
        handleInputChange={() => () => {}}
      />,
    );

    const input3 = screen.getByTestId("InputFieldGroup_WRAPPER_INPUT_FIELD_3");
    const focusMock = jest.fn();
    input3.focus = focusMock;

    fireEvent.change(input3, { target: { value: "4" } });

    jest.runAllTimers();

    expect(focusMock).not.toHaveBeenCalled();
  });

  it("(8) Should move to previous input on Backspace key", () => {
    render(
      <BaseComponents.InputFieldGroup
        length={length}
        code={["1", "", "3", "4"]}
        aria-label={ariaLabel}
        handleInputChange={() => () => {}}
      />,
    );

    const input1 = screen.getByTestId("InputFieldGroup_WRAPPER_INPUT_FIELD_1");
    const input0 = screen.getByTestId("InputFieldGroup_WRAPPER_INPUT_FIELD_0");
    const focusMock = jest.fn();
    input0.focus = focusMock;

    fireEvent.keyDown(input1, { key: "Backspace" });

    jest.runAllTimers();

    expect(focusMock).toHaveBeenCalled();
  });

  it("(9) Should not move to previous input on Backspace when at first input", () => {
    render(
      <BaseComponents.InputFieldGroup
        length={length}
        code={["", "2", "3", "4"]}
        aria-label={ariaLabel}
        handleInputChange={() => () => {}}
      />,
    );

    const input0 = screen.getByTestId("InputFieldGroup_WRAPPER_INPUT_FIELD_0");
    expect(() => {
      fireEvent.keyDown(input0, { key: "Backspace" });
    }).not.toThrow();
  });

  it("(10) Should handle paste with multiple digits starting from first field", () => {
    const handleInputChange = jest.fn(() => jest.fn());

    render(
      <BaseComponents.InputFieldGroup
        length={length}
        code={["", "", "", ""]}
        aria-label={ariaLabel}
        handleInputChange={handleInputChange}
      />,
    );

    const input0 = screen.getByTestId("InputFieldGroup_WRAPPER_INPUT_FIELD_0");
    const input3 = screen.getByTestId("InputFieldGroup_WRAPPER_INPUT_FIELD_3");
    const focusMock = jest.fn();
    input3.focus = focusMock;

    fireEvent.change(input0, { target: { value: "1234" } });

    jest.runAllTimers();

    expect(handleInputChange).toHaveBeenCalledTimes(4);
    expect(handleInputChange).toHaveBeenCalledWith(0);
    expect(handleInputChange).toHaveBeenCalledWith(1);
    expect(handleInputChange).toHaveBeenCalledWith(2);
    expect(handleInputChange).toHaveBeenCalledWith(3);
    expect(focusMock).toHaveBeenCalled();
  });

  it("(11) Should handle paste with multiple digits starting from middle field", () => {
    const handleInputChange = jest.fn(() => jest.fn());

    render(
      <BaseComponents.InputFieldGroup
        length={length}
        code={["1", "", "", ""]}
        aria-label={ariaLabel}
        handleInputChange={handleInputChange}
      />,
    );

    const input1 = screen.getByTestId("InputFieldGroup_WRAPPER_INPUT_FIELD_1");
    const input3 = screen.getByTestId("InputFieldGroup_WRAPPER_INPUT_FIELD_3");
    const focusMock = jest.fn();
    input3.focus = focusMock;

    fireEvent.change(input1, { target: { value: "567" } });

    jest.runAllTimers();

    expect(handleInputChange).toHaveBeenCalledWith(1);
    expect(handleInputChange).toHaveBeenCalledWith(2);
    expect(handleInputChange).toHaveBeenCalledWith(3);
    expect(focusMock).toHaveBeenCalled();
  });

  it("(12) Should handle paste with more digits than available fields", () => {
    const handleInputChange = jest.fn(() => jest.fn());

    render(
      <BaseComponents.InputFieldGroup
        length={length}
        code={["", "", "", ""]}
        aria-label={ariaLabel}
        handleInputChange={handleInputChange}
      />,
    );

    const input0 = screen.getByTestId("InputFieldGroup_WRAPPER_INPUT_FIELD_0");
    const input3 = screen.getByTestId("InputFieldGroup_WRAPPER_INPUT_FIELD_3");
    const focusMock = jest.fn();
    input3.focus = focusMock;

    fireEvent.change(input0, { target: { value: "123456789" } });

    jest.runAllTimers();

    expect(handleInputChange).toHaveBeenCalledTimes(4);
    expect(handleInputChange).toHaveBeenCalledWith(0);
    expect(handleInputChange).toHaveBeenCalledWith(1);
    expect(handleInputChange).toHaveBeenCalledWith(2);
    expect(handleInputChange).toHaveBeenCalledWith(3);
    expect(focusMock).toHaveBeenCalled();
  });

  it("(13) Should filter out non-digit characters when pasting", () => {
    const handleInputChange = jest.fn(() => jest.fn());

    render(
      <BaseComponents.InputFieldGroup
        length={length}
        code={["", "", "", ""]}
        aria-label={ariaLabel}
        handleInputChange={handleInputChange}
      />,
    );

    const input0 = screen.getByTestId("InputFieldGroup_WRAPPER_INPUT_FIELD_0");

    waitFor(() => {
      fireEvent.change(input0, { target: { value: "1A2B3C4D" } });
    });
    jest.runAllTimers();

    expect(handleInputChange).toHaveBeenCalledTimes(4);
    expect(handleInputChange).toHaveBeenCalledWith(0);
    expect(handleInputChange).toHaveBeenCalledWith(1);
    expect(handleInputChange).toHaveBeenCalledWith(2);
    expect(handleInputChange).toHaveBeenCalledWith(3);
  });

  it("(14) Should prevent letter key input", () => {
    render(
      <BaseComponents.InputFieldGroup
        length={length}
        code={code}
        aria-label={ariaLabel}
        handleInputChange={() => () => {}}
        handleKeyDown={() => () => {}}
      />,
    );

    const input0 = screen.getByTestId("InputFieldGroup_WRAPPER_INPUT_FIELD_0");
    const event = fireEvent.keyDown(input0, { key: "a" });

    expect(event).toBe(false);
  });

  it("(15) Should prevent special character key input", () => {
    render(
      <BaseComponents.InputFieldGroup
        length={length}
        code={code}
        aria-label={ariaLabel}
        handleInputChange={() => () => {}}
      />,
    );

    const input0 = screen.getByTestId("InputFieldGroup_WRAPPER_INPUT_FIELD_0");
    const event = fireEvent.keyDown(input0, { key: "@" });

    expect(event).toBe(false);
  });

  it("(16) Should allow modifier keys (Ctrl, Meta, Alt)", () => {
    const handleKeyDown = jest.fn(() => jest.fn());

    render(
      <BaseComponents.InputFieldGroup
        length={length}
        code={code}
        aria-label={ariaLabel}
        handleInputChange={() => () => {}}
        handleKeyDown={handleKeyDown}
      />,
    );

    const input0 = screen.getByTestId("InputFieldGroup_WRAPPER_INPUT_FIELD_0");

    fireEvent.keyDown(input0, { key: "a", metaKey: true });
    expect(handleKeyDown).toHaveBeenCalled();

    fireEvent.keyDown(input0, { key: "c", ctrlKey: true });
    expect(handleKeyDown).toHaveBeenCalled();

    fireEvent.keyDown(input0, { key: "v", altKey: true });
    expect(handleKeyDown).toHaveBeenCalled();
  });

  it("(17) Should allow special keys (Tab, Arrow keys, Delete)", () => {
    const handleKeyDown = jest.fn(() => jest.fn());

    render(
      <BaseComponents.InputFieldGroup
        length={length}
        code={code}
        aria-label={ariaLabel}
        handleInputChange={() => () => {}}
        handleKeyDown={handleKeyDown}
      />,
    );

    const input0 = screen.getByTestId("InputFieldGroup_WRAPPER_INPUT_FIELD_0");

    fireEvent.keyDown(input0, { key: "Tab" });
    expect(handleKeyDown).toHaveBeenCalled();

    fireEvent.keyDown(input0, { key: "ArrowLeft" });
    expect(handleKeyDown).toHaveBeenCalled();

    fireEvent.keyDown(input0, { key: "Delete" });
    expect(handleKeyDown).toHaveBeenCalled();
  });

  it("(18) Should apply custom className", () => {
    const customClass = "custom-input-class";

    render(
      <BaseComponents.InputFieldGroup
        length={length}
        code={code}
        aria-label={ariaLabel}
        handleInputChange={() => () => {}}
        className={customClass}
      />,
    );

    const inputFieldsContainer = screen.getByTestId("InputFieldGroup_WRAPPER");
    expect(inputFieldsContainer.className).toContain(customClass);
  });

  it("(19) Should render hintText when provided", () => {
    render(
      <BaseComponents.InputFieldGroup
        length={length}
        code={code}
        aria-label={ariaLabel}
        handleInputChange={() => () => {}}
        hintText="Enter verification code"
      />,
    );

    const hintText = screen.getByText("Enter verification code");
    expect(hintText).toBeInTheDocument();
  });

  it("(20) Should not render hintText when not provided", () => {
    render(
      <BaseComponents.InputFieldGroup
        length={length}
        code={code}
        aria-label={ariaLabel}
        handleInputChange={() => () => {}}
      />,
    );

    const hintText = screen.queryByText("Enter verification code");
    expect(hintText).not.toBeInTheDocument();
  });

  it("(21) Should apply error class to hintText when error is true", () => {
    render(
      <BaseComponents.InputFieldGroup
        length={length}
        code={code}
        aria-label={ariaLabel}
        handleInputChange={() => () => {}}
        hintText="Invalid code"
        error={true}
      />,
    );

    const hintText = screen.getByText("Invalid code");
    expect(hintText).toHaveClass("error");
  });

  it("(22) Should not apply error class to hintText when error is false", () => {
    render(
      <BaseComponents.InputFieldGroup
        length={length}
        code={code}
        aria-label={ariaLabel}
        handleInputChange={() => () => {}}
        hintText="Valid code"
        error={false}
      />,
    );

    const hintText = screen.getByText("Valid code");
    expect(hintText).not.toHaveClass("error");
  });
});
