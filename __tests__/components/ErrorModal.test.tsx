import { fireEvent, render, screen } from "@testing-library/react";
import { ErrorModal } from "~components";
import type { ILangGeneric } from "~interfaces/common";

describe("ErrorModal", () => {
  const defaultProps = {
    lang: "ru" as keyof ILangGeneric<string>,
    isOpen: true,
    onClose: jest.fn(),
  };

  const onConfirm = jest.fn();

  const footerProps = {
    footerButtons: [
      {
        text: "Актуализировать сведения",
        onClick: onConfirm,
        dataTestid: "ErrorModal_CONFIRM_BTN",
      },
      {
        text: "Отмена",
        onClick: jest.fn(),
        dataTestid: "ErrorModal_CANCEL_BTN",
        variant: "secondary" as const,
      },
    ],
  };

  it("(1) Should render common error icon for non-auth errors", () => {
    render(<ErrorModal {...defaultProps} status={500} />);

    expect(screen.getByTestId("ErrorModal_ICON_COMMON")).toBeInTheDocument();
    expect(
      screen.queryByTestId("ErrorModal_ICON_AUTH"),
    ).not.toBeInTheDocument();
  });

  it("(2) Should render auth error icon for 401 status", () => {
    render(<ErrorModal {...defaultProps} status={401} />);

    expect(screen.getByTestId("ErrorModal_ICON_AUTH")).toBeInTheDocument();
    expect(
      screen.queryByTestId("ErrorModal_ICON_COMMON"),
    ).not.toBeInTheDocument();
  });

  it("(3) Should render title text", () => {
    render(<ErrorModal {...defaultProps} />);

    expect(screen.getByTestId("Title_TITLE")).toHaveTextContent("Внимание!");
  });

  it("(4) Should render custom message when provided", () => {
    const customMessage = "Кастомное сообщение об ошибке";
    render(<ErrorModal {...defaultProps} message={customMessage} />);

    expect(screen.getByTestId("Title_SUBTEXT")).toHaveTextContent(
      customMessage,
    );
  });

  it("(5) Should render default auth message for 401 error when no message provided", () => {
    render(<ErrorModal {...defaultProps} status={401} />);

    expect(screen.getByTestId("Title_SUBTEXT")).toHaveTextContent(
      "Чтобы продолжить, пожалуйста, авторизуйтесь.",
    );
  });

  it("(6) Should not render message when no message and not auth error", () => {
    render(<ErrorModal {...defaultProps} status={500} />);

    expect(screen.queryByTestId("Title_SUBTEXT")).not.toBeInTheDocument();
  });

  it("(7) Should render auth button for 401 error when onAuthAction provided", () => {
    const onAuthAction = jest.fn();
    render(
      <ErrorModal {...defaultProps} status={401} onAuthAction={onAuthAction} />,
    );

    const authButton = screen.getByTestId("ErrorModal_AUTH_BTN");
    expect(authButton).toBeInTheDocument();
    expect(authButton).toHaveTextContent("Авторизоваться");
  });

  it("(8) Should not render auth button for non 401 errors", () => {
    const onAuthAction = jest.fn();
    render(
      <ErrorModal {...defaultProps} status={500} onAuthAction={onAuthAction} />,
    );

    expect(screen.queryByTestId("ErrorModal_AUTH_BTN")).not.toBeInTheDocument();
  });

  it("(9) Should not render auth button for 401 error when onAuthAction not provided", () => {
    render(<ErrorModal {...defaultProps} status={401} />);

    expect(screen.queryByTestId("ErrorModal_AUTH_BTN")).not.toBeInTheDocument();
  });

  it("(10) Should call onClose when close button is clicked", () => {
    const onClose = jest.fn();
    render(<ErrorModal {...defaultProps} onClose={onClose} />);

    const closeButton = screen.getByTestId("ErrorModal_CLOSE_BTN");
    fireEvent.click(closeButton);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("(11) Should call onAuthAction when auth button is clicked", () => {
    const onAuthAction = jest.fn();
    render(
      <ErrorModal {...defaultProps} status={401} onAuthAction={onAuthAction} />,
    );

    const authButton = screen.getByTestId("ErrorModal_AUTH_BTN");
    fireEvent.click(authButton);

    expect(onAuthAction).toHaveBeenCalledTimes(1);
  });

  it("(12) Should support different languages", () => {
    render(<ErrorModal {...defaultProps} lang="kk" />);

    expect(screen.getByTestId("Title_TITLE")).toHaveTextContent(
      "Назар аударыңыз!",
    );
  });

  it("(13) Should render with custom message for auth error", () => {
    const customMessage = "Кастомное сообщение для 401 ошибки";
    render(
      <ErrorModal {...defaultProps} status={401} message={customMessage} />,
    );

    expect(screen.getByTestId("Title_SUBTEXT")).toHaveTextContent(
      customMessage,
    );
  });

  it("(14) Should render the footer buttons passed from above", () => {
    render(<ErrorModal {...defaultProps} status={412} {...footerProps} />);

    expect(screen.getByTestId("ModalFooterButton_WRAP")).toBeInTheDocument();
    expect(screen.getByTestId("ErrorModal_CONFIRM_BTN")).toHaveTextContent(
      "Актуализировать сведения",
    );
    expect(screen.getByTestId("ErrorModal_CANCEL_BTN")).toHaveTextContent(
      "Отмена",
    );
  });

  it("(15) Should not render the footer when footerButtons is not provided", () => {
    render(<ErrorModal {...defaultProps} status={412} />);

    expect(
      screen.queryByTestId("ModalFooterButton_WRAP"),
    ).not.toBeInTheDocument();
  });

  it("(16) Should call the onClick of the clicked footer button", () => {
    render(<ErrorModal {...defaultProps} status={412} {...footerProps} />);

    fireEvent.click(screen.getByTestId("ErrorModal_CONFIRM_BTN"));

    expect(onConfirm).toHaveBeenCalledTimes(1);
  });
});
