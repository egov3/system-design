import { fireEvent, render, screen } from "@testing-library/react";
import { CodeInput } from "~components";
import { i18n } from "~constants/i18n";

describe("CodeInput", () => {
  const defaultProps = {
    lang: "ru" as const,
    title: "Введите код подтверждения",
    description: "Введите код, отправленный на номер +7 (707) 707-70-07",
    code: new Array(5).fill(""),
    handleInputChange: jest.fn(() => jest.fn()),
  };

  it("(1) Should render title, description, inputs and error text", () => {
    const errorText = "Введённый OTP-код неверен";
    render(<CodeInput {...defaultProps} errorText={errorText} />);

    expect(screen.getByTestId("CodeInput_TITLE")).toHaveTextContent(
      defaultProps.title,
    );
    expect(screen.getByTestId("CodeInput_DESCRIPTION")).toHaveTextContent(
      defaultProps.description,
    );
    expect(
      screen.getAllByLabelText(i18n.CodeInput.AriaInputField.ru),
    ).toHaveLength(5);
    expect(screen.getByTestId("StatusText_TEXT")).toHaveTextContent(errorText);
    expect(
      screen.queryByTestId("CodeInput_RESEND_BTN"),
    ).not.toBeInTheDocument();
  });

  it("(2) Should render resend button and pass its disabled state and click", () => {
    const onClick = jest.fn();
    const { rerender } = render(
      <CodeInput
        {...defaultProps}
        resendButton={{
          label: "Отправить код повторно (00:34)",
          isDisabled: true,
          onClick,
        }}
      />,
    );

    const resendButton = screen.getByTestId("CodeInput_RESEND_BTN");
    expect(resendButton).toHaveTextContent("Отправить код повторно (00:34)");
    expect(resendButton).toBeDisabled();
    expect(screen.queryByTestId("StatusText_WRAP")).not.toBeInTheDocument();

    rerender(
      <CodeInput
        {...defaultProps}
        resendButton={{ label: "Отправить код повторно", onClick }}
      />,
    );

    fireEvent.click(screen.getByTestId("CodeInput_RESEND_BTN"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
