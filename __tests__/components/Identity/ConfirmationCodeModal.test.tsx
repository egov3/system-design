import { fireEvent, render, screen } from "@testing-library/react";

import { ConfirmationCodeModal } from "~components";
import { i18n } from "~constants/i18n";

const renderModal = (onSubmit = jest.fn()) => {
  const props = { onBack: jest.fn(), onSubmit };
  render(
    <ConfirmationCodeModal
      {...props}
      lang="ru"
      maskedPhone="+7 707 *** ** 07"
      codeLength={5}
    />,
  );
  return props;
};

const getFields = () =>
  screen.getAllByLabelText<HTMLInputElement>(i18n.CodeInput.AriaInputField.ru);

const pasteCode = (value: string) => {
  fireEvent.change(getFields()[0], { target: { value } });
};

const getFieldValues = () => getFields().map((field) => field.value);

describe("ConfirmationCodeModal", () => {
  it("(1) Should submit the full code and show the returned error", () => {
    const onSubmit = jest.fn((_code: string, setErrorText) => {
      setErrorText("Неверный код");
    });
    renderModal(onSubmit);

    expect(
      screen.getByTestId("ConfirmationCodeModal_DESCRIPTION"),
    ).toHaveTextContent("+7 707 *** ** 07");

    pasteCode("a");
    expect(getFieldValues()).toEqual(["", "", "", "", ""]);
    pasteCode("12345");

    expect(onSubmit).toHaveBeenCalledWith("12345", expect.any(Function));
    expect(screen.getByTestId("StatusText_TEXT")).toHaveTextContent(
      "Неверный код",
    );
    expect(getFieldValues()).toEqual(["", "", "", "", ""]);

    pasteCode("1");
    expect(screen.queryByTestId("StatusText_TEXT")).not.toBeInTheDocument();
  });

  it("(2) Should reset the code and call onBack on the back button", () => {
    const { onBack } = renderModal();

    pasteCode("12");
    fireEvent.click(screen.getByTestId("IdentityHeaderGoBack_BTN"));

    expect(onBack).toHaveBeenCalledTimes(1);
    expect(getFieldValues()).toEqual(["", "", "", "", ""]);
  });
});
