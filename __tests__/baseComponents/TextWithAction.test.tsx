import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TextWithAction } from "~baseComponents";

describe("TextWithAction", () => {
  const textTemplate =
    "Перед загрузкой ознакомьтесь с @action<Требованиями к фотографии> и @action<Требованиями к образцу подписи>";
  const plainText =
    "Перед загрузкой ознакомьтесь с Требованиями к фотографии и Требованиями к образцу подписи";

  it("(1) Should keep the word order and bind the actions by position", async () => {
    const user = userEvent.setup();
    const onFirstAction = jest.fn();
    const onSecondAction = jest.fn();

    render(
      <TextWithAction
        textTemplate={textTemplate}
        actions={[onFirstAction, onSecondAction]}
      />,
    );

    expect(screen.getByTestId("TextWithAction_WRAPPER")).toHaveTextContent(
      plainText,
    );

    await user.click(screen.getAllByTestId("TextWithAction_ACTION")[1]);
    expect(onFirstAction).not.toHaveBeenCalled();
    expect(onSecondAction).toHaveBeenCalledTimes(1);
  });

  it("(2) Should render the tags as plain text when no actions are provided", () => {
    render(
      <TextWithAction textTemplate={textTemplate} fontClass="body1Regular" />,
    );

    expect(screen.getByTestId("TextWithAction_WRAPPER")).toHaveTextContent(
      plainText,
    );
    expect(
      screen.queryByTestId("TextWithAction_ACTION"),
    ).not.toBeInTheDocument();
  });

  it("(3) Should render a malformed tag verbatim without consuming an action", () => {
    const onAction = jest.fn();

    render(<TextWithAction textTemplate="@action<oops" actions={[onAction]} />);

    expect(screen.getByTestId("TextWithAction_WRAPPER")).toHaveTextContent(
      "@action<oops",
    );
    expect(
      screen.queryByTestId("TextWithAction_ACTION"),
    ).not.toBeInTheDocument();
  });
});
