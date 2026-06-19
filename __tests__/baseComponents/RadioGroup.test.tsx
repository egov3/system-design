import { fireEvent, render, screen } from "@testing-library/react";
import { BaseComponents } from "~baseComponents";

const radioGroupItems = [
  { label: "Option 1", value: "option1" },
  { label: "Option 2", value: "option2" },
];

const setSelectedOption = jest.fn();
const setSelectedDuplicateKey = jest.fn();

describe("RadioGroup", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("(1) Should check option if clicked", () => {
    render(
      <BaseComponents.RadioGroup
        radioGroupItems={radioGroupItems}
        setSelectedOption={setSelectedOption}
        selectedOption={radioGroupItems[0].value}
      />,
    );

    const options = screen.getAllByTestId("RadioGroupItem_LABEL");

    fireEvent.click(options[1]);

    expect(setSelectedOption).toHaveBeenCalledWith("option2");
  });

  it("(2) Should call setSelectedDuplicateKey if provided", () => {
    render(
      <BaseComponents.RadioGroup
        radioGroupItems={[
          { label: "Option 1", value: "option1" },
          { label: "Option 1 duplicate", value: "option1" },
        ]}
        setSelectedDuplicateKey={setSelectedDuplicateKey}
        setSelectedOption={setSelectedOption}
        selectedOption=""
      />,
    );

    const options = screen.getAllByTestId("RadioGroupItem_LABEL");

    fireEvent.click(options[1]);

    expect(setSelectedDuplicateKey).toHaveBeenCalledWith("option1::1");
  });

  it("(3) Should sync duplicate key from selectedOption", () => {
    render(
      <BaseComponents.RadioGroup
        radioGroupItems={radioGroupItems}
        selectedDuplicateKey="wrong-key"
        setSelectedDuplicateKey={setSelectedDuplicateKey}
        setSelectedOption={setSelectedOption}
        selectedOption="option2"
      />,
    );

    expect(setSelectedDuplicateKey).toHaveBeenCalledWith("option2::0");
  });

  it("(4) Should not call callbacks if selected item is not found", () => {
    render(
      <BaseComponents.RadioGroup
        radioGroupItems={radioGroupItems}
        setSelectedDuplicateKey={setSelectedDuplicateKey}
        setSelectedOption={setSelectedOption}
        selectedOption=""
      />,
    );

    const options = screen.getAllByTestId("RadioGroupItem_LABEL");
    const findSpy = jest
      .spyOn(Array.prototype, "find")
      .mockImplementationOnce(() => undefined);

    fireEvent.click(options[0]);
    findSpy.mockRestore();

    expect(setSelectedOption).not.toHaveBeenCalled();
    expect(setSelectedDuplicateKey).not.toHaveBeenCalled();
  });
});
