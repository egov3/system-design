import { render, screen } from "@testing-library/react";
import { Components } from "~components";
import { i18n } from "~constants/i18n";

describe("EmptyMessages component", () => {
  it("(1) Should render EmptyMessages with 'REQUEST_HISTORY' pageType", () => {
    render(<Components.EmptyMessages pageType="REQUEST_HISTORY" lang="ru" />);

    const textWrapper = screen.getByTestId("MsgEmptyText_WRAPPER");

    expect(textWrapper).toHaveTextContent(
      i18n.EmptyMessages.ServiceMessageEmpty.ru,
    );
  });

  it("(2) Should render EmptyMessages with 'NOTIFICATIONS' pageType", () => {
    render(<Components.EmptyMessages pageType="NOTIFICATIONS" lang="ru" />);

    const textWrapper = screen.getByTestId("MsgEmptyText_WRAPPER");

    expect(textWrapper).toHaveTextContent(
      i18n.EmptyMessages.NotificationsMessageEmpty.ru,
    );
  });
});
