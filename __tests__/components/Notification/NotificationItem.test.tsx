import { render } from "@testing-library/react";
import { NotificationItem } from "~components";

describe("NotificationItem", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });
  it("(1) Should render the correct text", () => {
    const { getByText } = render(<NotificationItem text="Test notification" />);
    expect(getByText("Test notification")).toBeInTheDocument();
  });

  it("(2) Should apply the correct class", () => {
    const { container } = render(
      <NotificationItem text="Test notification" type="success" />,
    );
    expect(container.firstChild).toHaveClass("success");
  });

  it('(3) Should apply the success class when type is "success"', () => {
    const { container } = render(
      <NotificationItem type="success" text="Some Text" />,
    );
    expect(container.firstChild).toHaveClass("success");
  });

  it('(4) Should apply the error class when type is "error"', () => {
    const { container } = render(
      <NotificationItem type="error" text="Some Text" />,
    );
    expect(container.firstChild).toHaveClass("error");
  });

  it('(5) Should apply the warning class when type is "warning"', () => {
    const { container } = render(
      <NotificationItem type="warning" text="Some Text" />,
    );
    expect(container.firstChild).toHaveClass("warning");
  });

  it('(6) Should apply the info class when type is not "success", "warning", or "error"', () => {
    const { container } = render(<NotificationItem text="Some Text" />);
    expect(container.firstChild).toHaveClass("info");
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
        <NotificationItem type={type} text="Some Text" />,
      );

      expect(getByTestId(expectedTestId)).toBeInTheDocument();
    },
  );
});
