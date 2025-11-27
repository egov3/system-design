import { render, screen } from "@testing-library/react";
import { Components } from "~components";
import { i18n } from "~constants/i18n";

const { HelpNotificationItem } = Components;

describe("HelpNotificationItem component", () => {
  it("(1) Should render HelpNotificationItem with correct language", () => {
    const lang = "ru";
    render(
      <HelpNotificationItem lang={lang} isUnderline={false} isRead={true} />,
    );

    expect(
      screen.getByTestId("HelpNotificationMessage_READ").textContent,
    ).toEqual(i18n.HelpNotificationItem.NotificationsMessageRead[lang]);
  });

  it("(2) Should render HelpNotificationItem with underline", () => {
    const lang = "ru";
    render(
      <HelpNotificationItem lang={lang} isUnderline={true} isRead={false} />,
    );

    expect(screen.getByTestId("HelpNotification_CONTENT").className).toContain(
      "notificationLine",
    );
  });
});
