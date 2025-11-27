import { render, screen } from "@testing-library/react";
import { Components } from "~components";
import type { IMsgDataItem } from "~interfaces/CustomersMsg";

const { CustomersMsg } = Components;

describe("CustomerMsg component", () => {
  it("(1) Should render CustomerMsg with correct message", () => {
    const msgItems: IMsgDataItem = {
      owner: "EGOV",
      id: 123456789,
      description: [{ text: "Thank you for your attention.", type: "success" }],
      time: "14:30",
      date: "2024-10-01",
      msgType: "NOTIFICATIONS",
    };
    render(<CustomersMsg msgItem={msgItems} />);

    expect(screen.getByTestId("MsgBody_TEXT").textContent).toEqual(
      msgItems.description[0].text,
    );
  });
});
