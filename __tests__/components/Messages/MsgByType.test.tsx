import { render, screen } from "@testing-library/react";
import { Components } from "~components";
import { msgItems } from "../../Mock/msgItems";

describe("MsgBody", () => {
  const mockHandleDetailsClick = jest.fn();
  it("(1) Should render MsgByType error variant when type is error", () => {
    render(
      <Components.MsgBody
        msgItem={msgItems[2]}
        lang="ru"
        handleDetailsClick={mockHandleDetailsClick}
      />,
    );

    const errorText = screen.getByText("Запрос отклонен");
    expect(errorText).toBeInTheDocument();
    expect(errorText).toHaveClass("chatMsgText-error");
  });

  it("(2) Should render MsgByType success variant when type is success", () => {
    render(
      <Components.MsgBody
        msgItem={msgItems[1]}
        lang="ru"
        handleDetailsClick={mockHandleDetailsClick}
      />,
    );

    const successText = screen.getByText("Запрос исполнен");
    expect(successText).toBeInTheDocument();
    expect(successText).toHaveClass("chatMsgText-success");
  });

  it("(3) Should render MsgByType inProgress variant when type is inProgress", () => {
    render(
      <Components.MsgBody
        msgItem={msgItems[0]}
        lang="ru"
        handleDetailsClick={mockHandleDetailsClick}
      />,
    );

    const inProgressText = screen.getByText("Запрос отправлен");
    expect(inProgressText).toBeInTheDocument();
    expect(inProgressText).toHaveClass("chatMsgText-inProgress");
  });
});
