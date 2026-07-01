import { SearchIcon } from "@egov3/graphics/General/Search";
import { fireEvent, render, screen } from "@testing-library/react";
import { Typography } from "~baseComponents";
import { HelpNotification } from "~components";

describe("HelpNotification component", () => {
  const HelpNotificationText =
    "This is a help notification. It provides additional information when hovered over or clicked.";

  it("(1) Should render HelpNotification on mouse hover", () => {
    render(
      <HelpNotification
        icon={<SearchIcon />}
        ariaLabel="Help Notification"
        dataTestid="HelpNotification_DEFAULT"
      >
        <Typography
          tag="span"
          fontClass="body2Regular"
          data-testid="HelpNotificationText"
        >
          {HelpNotificationText}
        </Typography>
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
        icon={<SearchIcon />}
        ariaLabel="Help Notification"
        dataTestid="HelpNotification_DEFAULT"
        handleOnClick={handleOnClick}
      >
        <Typography
          tag="span"
          fontClass="body2Regular"
          data-testid="HelpNotificationText"
        >
          {HelpNotificationText}
        </Typography>
      </HelpNotification>,
    );

    const helpNotificationButton = screen.getByTestId(
      "HelpNotification_BUTTON",
    );

    fireEvent.click(helpNotificationButton);

    expect(handleOnClick).toHaveBeenCalled();
  });

  it("(3) Should open tooltip on click when no handleOnClick is provided", () => {
    render(
      <HelpNotification
        icon={<SearchIcon />}
        ariaLabel="Help Notification"
        dataTestid="HelpNotification_DEFAULT"
      >
        <Typography
          tag="span"
          fontClass="body2Regular"
          data-testid="HelpNotificationText"
        >
          {HelpNotificationText}
        </Typography>
      </HelpNotification>,
    );

    const helpNotificationButton = screen.getByTestId(
      "HelpNotification_BUTTON",
    );

    expect(
      screen.queryByTestId("HelpNotificationText"),
    ).not.toBeInTheDocument();

    fireEvent.click(helpNotificationButton);

    expect(screen.getByTestId("HelpNotificationText")).toBeInTheDocument();
  });

  it("(4) Should close tooltip on blur", () => {
    render(
      <HelpNotification
        icon={<SearchIcon />}
        ariaLabel="Help Notification"
        dataTestid="HelpNotification_DEFAULT"
      >
        <Typography
          tag="span"
          fontClass="body2Regular"
          data-testid="HelpNotificationText"
        >
          {HelpNotificationText}
        </Typography>
      </HelpNotification>,
    );

    const helpNotificationButton = screen.getByTestId(
      "HelpNotification_BUTTON",
    );

    fireEvent.mouseEnter(helpNotificationButton);

    expect(screen.getByTestId("HelpNotificationText")).toBeInTheDocument();

    fireEvent.blur(helpNotificationButton);

    expect(
      screen.queryByTestId("HelpNotificationText"),
    ).not.toBeInTheDocument();
  });
});
