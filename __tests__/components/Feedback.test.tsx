import { fireEvent, render, screen } from "@testing-library/react";
import { Components } from "~components";

const { Feedback } = Components;

const mockProps = {
  onAction: jest.fn(),
  rating: 0,
  setRating: jest.fn(),
  value: "",
  onChange: jest.fn(),
  lang: "ru" as const,
};

describe("Feedback", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("(1) Should call setRating when emoji is clicked", () => {
    render(<Feedback {...mockProps} />);

    const angryEmoji = screen.getByLabelText("Очень плохо");
    const frowningEmoji = screen.getByLabelText("Плохо");
    const neutralEmoji = screen.getByLabelText("Нормально");
    const smileEmoji = screen.getByLabelText("Хорошо");
    const grinEmoji = screen.getByLabelText("Отлично");

    fireEvent.click(angryEmoji);
    expect(mockProps.setRating).toHaveBeenCalledWith(1);

    fireEvent.click(frowningEmoji);
    expect(mockProps.setRating).toHaveBeenCalledWith(2);

    fireEvent.click(neutralEmoji);
    expect(mockProps.setRating).toHaveBeenCalledWith(3);

    fireEvent.click(smileEmoji);
    expect(mockProps.setRating).toHaveBeenCalledWith(4);

    fireEvent.click(grinEmoji);
    expect(mockProps.setRating).toHaveBeenCalledWith(5);
  });

  it("(2) Should call onAction when send button is clicked", () => {
    render(<Feedback {...mockProps} />);

    const sendButton = screen.getByTestId("Feedback_BTN");
    fireEvent.click(sendButton);

    expect(mockProps.onAction).toHaveBeenCalledTimes(1);
  });

  it("(3) Should render input field with correct props", () => {
    const testValue = "Test feedback text";
    render(<Feedback {...mockProps} value={testValue} />);

    const input = screen.getByTestId("InputField_INPUT");
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue(testValue);
  });

  it("(4) Should call onChange when input value changes", () => {
    render(<Feedback {...mockProps} />);

    const input = screen.getByTestId("InputField_INPUT");
    fireEvent.change(input, { target: { value: "New feedback" } });

    expect(mockProps.onChange).toHaveBeenCalledTimes(1);
  });

  it("(5) Should apply correct colors for selected emojis", () => {
    const { rerender } = render(<Feedback {...mockProps} rating={1} />);

    const angryEmoji = screen.getByLabelText("Очень плохо");
    expect(angryEmoji).toHaveAttribute("data-color", "var(--icon-error-color)");

    rerender(<Feedback {...mockProps} rating={2} />);
    const frowningEmoji = screen.getByLabelText("Плохо");
    expect(frowningEmoji).toHaveAttribute(
      "data-color",
      "var(--icon-warning-color)",
    );

    rerender(<Feedback {...mockProps} rating={3} />);
    const neutralEmoji = screen.getByLabelText("Нормально");
    expect(neutralEmoji).toHaveAttribute(
      "data-color",
      "var(--icon-accent-color)",
    );

    rerender(<Feedback {...mockProps} rating={4} />);
    const smileEmoji = screen.getByLabelText("Хорошо");
    expect(smileEmoji).toHaveAttribute("data-color", "var(--icon-success)");

    rerender(<Feedback {...mockProps} rating={5} />);
    const grinEmoji = screen.getByLabelText("Отлично");
    expect(grinEmoji).toHaveAttribute("data-color", "var(--icon-success)");
  });

  it("(6) Should render unselected icons with tertiary color", () => {
    render(<Feedback {...mockProps} rating={3} />);

    expect(screen.getByLabelText("Очень плохо")).toHaveAttribute(
      "data-color",
      "var(--icon-tertiary)",
    );

    expect(screen.getByLabelText("Плохо")).toHaveAttribute(
      "data-color",
      "var(--icon-tertiary)",
    );

    expect(screen.getByLabelText("Хорошо")).toHaveAttribute(
      "data-color",
      "var(--icon-tertiary)",
    );

    expect(screen.getByLabelText("Отлично")).toHaveAttribute(
      "data-color",
      "var(--icon-tertiary)",
    );
  });
});
