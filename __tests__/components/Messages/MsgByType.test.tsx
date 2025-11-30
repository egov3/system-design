import { render, screen } from "@testing-library/react";
import { Components } from "~components";
import { msgItems } from "../../Mock/msgItems";

describe("MsgByType", () => {
  it("(1) Should render MsgByType error variant when type is error", () => {
    render(<Components.MsgByType msgItem={msgItems[2]} />);

    const errorText = screen.getByText("Запрос отклонен");
    expect(errorText).toBeInTheDocument();
    expect(errorText).toHaveClass("chatMsgText-error");
  });

  it("(2) Should render MsgByType success variant when type is success", () => {
    render(<Components.MsgByType msgItem={msgItems[1]} />);

    const successText = screen.getByText("Запрос исполнен");
    expect(successText).toBeInTheDocument();
    expect(successText).toHaveClass("chatMsgText-success");
  });

  it("(3) Should render MsgByType inProgress variant when type is inProgress", () => {
    render(<Components.MsgByType msgItem={msgItems[0]} />);

    const inProgressText = screen.getByText("Запрос отправлен");
    expect(inProgressText).toBeInTheDocument();
    expect(inProgressText).toHaveClass("chatMsgText-inProgress");
  });
});
