import { fireEvent, render, screen } from "@testing-library/react";
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
    const handleInputChange = jest.fn();
    const handleKeyDown = jest.fn();

    render(
      <BaseComponents.InputFieldGroup
        length={length}
        code={code}
        ariaLabel={ariaLabel}
        handleInputChange={handleInputChange}
        handleKeyDown={handleKeyDown}
      />,
    );

    const inputs = Array.from({ length }).map((_, idx) =>
      screen.getByTestId(`InputField_inputCode_${idx}`),
    );
    expect(inputs).toHaveLength(length);
  });

  it("(2) Should call handleInputChange on input change", () => {
    const handleInputChange = jest.fn(() => jest.fn());
    const handleKeyDown = jest.fn(() => jest.fn());

    render(
      <BaseComponents.InputFieldGroup
        length={length}
        code={code}
        ariaLabel={ariaLabel}
        handleInputChange={handleInputChange}
        handleKeyDown={handleKeyDown}
      />,
    );

    const input0 = screen.getByTestId("InputField_inputCode_0");
    fireEvent.change(input0, { target: { value: "5" } });

    expect(handleInputChange).toHaveBeenCalledWith(0);
  });

  it("(3) Should call handleKeyDown on key press", () => {
    const handleInputChange = jest.fn(() => jest.fn());
    const handleKeyDown = jest.fn(() => jest.fn());

    render(
      <BaseComponents.InputFieldGroup
        length={length}
        code={code}
        ariaLabel={ariaLabel}
        handleInputChange={handleInputChange}
        handleKeyDown={handleKeyDown}
      />,
    );

    const input1 = screen.getByTestId("InputField_inputCode_1");
    fireEvent.keyDown(input1, { key: "Enter", code: "Enter" });

    expect(handleKeyDown).toHaveBeenCalledWith(1);
  });

  it("(4) Should handle controlled focused state", () => {
    const setFocused = jest.fn();
    const handleInputChange = jest.fn(() => jest.fn());
    const handleKeyDown = jest.fn(() => jest.fn());

    render(
      <BaseComponents.InputFieldGroup
        length={length}
        code={code}
        ariaLabel={ariaLabel}
        focused={true}
        setFocused={setFocused}
        handleInputChange={handleInputChange}
        handleKeyDown={handleKeyDown}
      />,
    );

    const input2 = screen.getByTestId("InputField_inputCode_2");

    fireEvent.focus(input2);
    expect(setFocused).toHaveBeenCalledWith(true);

    fireEvent.blur(input2);
    expect(setFocused).toHaveBeenCalledWith(false);
  });

  it("(5) Should filter non-digit characters and take only first digit", () => {
    const handleInputChange = jest.fn(() => jest.fn());
    const handleKeyDown = jest.fn(() => jest.fn());

    render(
      <BaseComponents.InputFieldGroup
        length={length}
        code={code}
        ariaLabel={ariaLabel}
        handleInputChange={handleInputChange}
        handleKeyDown={handleKeyDown}
      />,
    );

    const input2 = screen.getByTestId("InputField_inputCode_2");
    fireEvent.change(input2, { target: { value: "A" } });
    expect(handleInputChange).toHaveBeenCalledWith(2);
    fireEvent.change(input2, { target: { value: "567" } });
    expect(handleInputChange).toHaveBeenCalledWith(2);
  });

  it("(6) Should auto-focus next input when digit is entered", () => {
    const handleInputChange = jest.fn(() => jest.fn());
    const handleKeyDown = jest.fn(() => jest.fn());

    render(
      <BaseComponents.InputFieldGroup
        length={length}
        code={code}
        ariaLabel={ariaLabel}
        handleInputChange={handleInputChange}
        handleKeyDown={handleKeyDown}
      />,
    );

    const input0 = screen.getByTestId("InputField_inputCode_0");
    const input1 = screen.getByTestId("InputField_inputCode_1");

    const focusMock = jest.fn();
    input1.focus = focusMock;

    fireEvent.change(input0, { target: { value: "3" } });

    jest.runAllTimers();

    expect(focusMock).toHaveBeenCalled();
  });

  it("(7) Should not auto-focus next input when on last input", () => {
    const handleInputChange = jest.fn(() => jest.fn());
    const handleKeyDown = jest.fn(() => jest.fn());

    render(
      <BaseComponents.InputFieldGroup
        length={length}
        code={["1", "2", "3", ""]}
        ariaLabel={ariaLabel}
        handleInputChange={handleInputChange}
        handleKeyDown={handleKeyDown}
      />,
    );

    const input3 = screen.getByTestId("InputField_inputCode_3");
    const focusMock = jest.fn();
    input3.focus = focusMock;

    fireEvent.change(input3, { target: { value: "4" } });

    jest.runAllTimers();

    expect(focusMock).not.toHaveBeenCalled();
  });

  it("(8) Should move to previous input on Backspace key", () => {
    const handleInputChange = jest.fn(() => jest.fn());
    const handleKeyDown = jest.fn(() => jest.fn());

    render(
      <BaseComponents.InputFieldGroup
        length={length}
        code={["1", "", "3", "4"]}
        ariaLabel={ariaLabel}
        handleInputChange={handleInputChange}
        handleKeyDown={handleKeyDown}
      />,
    );

    const input1 = screen.getByTestId("InputField_inputCode_1");
    const input0 = screen.getByTestId("InputField_inputCode_0");
    const focusMock = jest.fn();
    input0.focus = focusMock;

    fireEvent.keyDown(input1, { key: "Backspace" });

    jest.runAllTimers();

    expect(focusMock).toHaveBeenCalled();
  });

  it("(9) Should not move to previous input on Backspace when at first input", () => {
    const handleInputChange = jest.fn(() => jest.fn());
    const handleKeyDown = jest.fn(() => jest.fn());

    render(
      <BaseComponents.InputFieldGroup
        length={length}
        code={["", "2", "3", "4"]}
        ariaLabel={ariaLabel}
        handleInputChange={handleInputChange}
        handleKeyDown={handleKeyDown}
      />,
    );

    const input0 = screen.getByTestId("InputField_inputCode_0");
    expect(() => {
      fireEvent.keyDown(input0, { key: "Backspace" });
    }).not.toThrow();
  });
});
