import { fireEvent, render, screen } from "@testing-library/react";
import { BaseComponents } from "~baseComponents";

describe("InputFieldGroup", () => {
  const length = 4;
  const code = ["1", "2", "", "4"];
  const ariaLabel = "code input";

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
});
