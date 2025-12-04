import { Icons } from "@egov3/graphics";
import { fireEvent, render, screen } from "@testing-library/react";
import { BaseComponents } from "~baseComponents";
import { Components } from "~components";

const { HelpNotification } = Components;

describe("HelpNotification component", () => {
  const HelpNotificationText =
    "This is a help notification. It provides additional information when hovered over or clicked.";

  it("(1) Should render HelpNotification on mouse hover", () => {
    render(
      <HelpNotification
        icon={<Icons.General.Search />}
        ariaLabel="Help Notification"
        dataTestid="HelpNotification_DEFAULT"
      >
        <BaseComponents.Typography
          tag="span"
          fontClass="body2Regular"
          data-testid="HelpNotificationText"
        >
          {HelpNotificationText}
        </BaseComponents.Typography>
      </HelpNotification>,
    );

    const helpNotificationButton = screen.getByTestId(
      "HelpNotification_BUTTON",
    );

    expect(
      screen.queryByTestId("HelpNotificationText"),
    ).not.toBeInTheDocument();

    fireEvent.mouseEnter(helpNotificationButton);

    const helpNotificationText = screen.getByTestId("HelpNotificationText");

    expect(helpNotificationText.textContent).toEqual(HelpNotificationText);

    fireEvent.click(helpNotificationButton);
    fireEvent.mouseLeave(helpNotificationButton);

    expect(
      screen.queryByTestId("HelpNotificationText"),
    ).not.toBeInTheDocument();
  });

  it("(2) Should call handleOnClick on click when function is provided", () => {
    const handleOnClick = jest.fn();

    render(
      <HelpNotification
        icon={<Icons.General.Search />}
        ariaLabel="Help Notification"
        dataTestid="HelpNotification_DEFAULT"
        handleOnClick={handleOnClick}
      >
        <BaseComponents.Typography
          tag="span"
          fontClass="body2Regular"
          data-testid="HelpNotificationText"
        >
          {HelpNotificationText}
        </BaseComponents.Typography>
      </HelpNotification>,
    );

    const helpNotificationButton = screen.getByTestId(
      "HelpNotification_BUTTON",
    );

    fireEvent.click(helpNotificationButton);

    expect(handleOnClick).toHaveBeenCalled();
  });
});
