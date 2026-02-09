import { render } from "@testing-library/react";
import { Components } from "~components";

describe("NotificationComponent", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });
  it("(1) Should render the correct text", () => {
    const { getByText } = render(
      <Components.NotificationComponent
        text="Test notification"
        toggleNotification={() => {}}
      />,
    );
    expect(getByText("Test notification")).toBeInTheDocument();
  });

  it("(2) Should apply the correct class", () => {
    const { container } = render(
      <Components.NotificationComponent
        text="Test notification"
        type="success"
        toggleNotification={() => {}}
      />,
    );
    expect(container.firstChild).toHaveClass("success");
  });

  it('(3) Should apply the success class when type is "success"', () => {
    const { container } = render(
      <Components.NotificationComponent
        type="success"
        toggleNotification={() => {}}
        text="Some Text"
      />,
    );
    expect(container.firstChild).toHaveClass("success");
  });

  it('(4) Should apply the error class when type is "error"', () => {
    const { container } = render(
      <Components.NotificationComponent
        type="error"
        toggleNotification={() => {}}
        text="Some Text"
      />,
    );
    expect(container.firstChild).toHaveClass("error");
  });

  it('(5) Should apply the warning class when type is "warning"', () => {
    const { container } = render(
      <Components.NotificationComponent
        type="warning"
        toggleNotification={() => {}}
        text="Some Text"
      />,
    );
    expect(container.firstChild).toHaveClass("warning");
  });

  it('(6) Should apply the info class when type is not "success", "warning", or "error"', () => {
    const { container } = render(
      <Components.NotificationComponent
        toggleNotification={() => {}}
        text="Some Text"
      />,
    );
    expect(container.firstChild).toHaveClass("info");
  });

  it("(7) Should call toggleNotification after 5 seconds", () => {
    const toggleNotification = jest.fn();
    render(
      <Components.NotificationComponent
        text="Test notification"
        toggleNotification={toggleNotification}
      />,
    );

    jest.advanceTimersByTime(5000);

    expect(toggleNotification).toHaveBeenCalledWith(false);
  });
});

describe("NotificationComponent icons", () => {
  it.each([
    [1, "success", "NotificationComponentIcon_Success"],
    [2, "error", "NotificationComponentIcon_Error"],
    [3, "warning", "NotificationComponentIcon_Warning"],
    [4, "info", "NotificationComponentIcon_Info"],
    [5, undefined, "NotificationComponentIcon_Info"],
  ] as const)(
    "(%i) Should render correct icon for type=%s",
    (_index, type, expectedTestId) => {
      const { getByTestId } = render(
        <Components.NotificationComponent
          type={type}
          toggleNotification={jest.fn()}
          text="Some Text"
        />,
      );

      expect(getByTestId(expectedTestId)).toBeInTheDocument();
    },
  );
});
