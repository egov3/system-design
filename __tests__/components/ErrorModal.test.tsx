import { fireEvent, render, screen } from "@testing-library/react";
import { Components } from "~components";
import type { ILangGeneric } from "~interfaces/common";

const { ErrorModal } = Components;

describe("ErrorModal", () => {
  const defaultProps = {
    lang: "ru" as keyof ILangGeneric<string>,
    open: true,
    onClose: jest.fn(),
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

    expect(screen.getByTestId("ErrorModal_TITLE")).toHaveTextContent(
      "Внимание!",
    );
  });

  it("(4) Should render custom message when provided", () => {
    const customMessage = "Кастомное сообщение об ошибке";
    render(<ErrorModal {...defaultProps} message={customMessage} />);

    expect(screen.getByTestId("ErrorModal_MESSAGE")).toHaveTextContent(
      customMessage,
    );
  });

  it("(5) Should render default auth message for 401 error when no message provided", () => {
    render(<ErrorModal {...defaultProps} status={401} />);

    expect(screen.getByTestId("ErrorModal_MESSAGE")).toHaveTextContent(
      "Чтобы продолжить, пожалуйста, авторизуйтесь.",
    );
  });

  it("(6) Should not render message when no message and not auth error", () => {
    render(<ErrorModal {...defaultProps} status={500} />);

    expect(screen.queryByTestId("ErrorModal_MESSAGE")).not.toBeInTheDocument();
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

    expect(screen.getByTestId("ErrorModal_TITLE")).toHaveTextContent(
      "Назар аударыңыз!",
    );
  });

  it("(13) Should render with custom message for auth error", () => {
    const customMessage = "Кастомное сообщение для 401 ошибки";
    render(
      <ErrorModal {...defaultProps} status={401} message={customMessage} />,
    );

    expect(screen.getByTestId("ErrorModal_MESSAGE")).toHaveTextContent(
      customMessage,
    );
  });
});
