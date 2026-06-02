import { act, fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import { Components } from "~components";
import type { INotificationData } from "~interfaces/Notification";

const createItems = (): INotificationData[] => [
  { id: "top", isOpen: true, text: "Top", type: "success" },
  { id: "second", isOpen: true, text: "Second", type: "warning" },
];

describe("NotificationWrapper", () => {
  const animateMock = jest.fn(() => ({ cancel: jest.fn() }));
  let rectTopByTestId: Record<string, number>;

  beforeEach(() => {
    jest.useFakeTimers();
    rectTopByTestId = {};

    jest
      .spyOn(HTMLElement.prototype, "getBoundingClientRect")
      .mockImplementation(function (this: HTMLElement) {
        const top = rectTopByTestId[this.dataset.testid ?? ""] ?? 0;
        return {
          x: 0,
          y: top,
          width: 0,
          height: 0,
          top,
          right: 0,
          bottom: top,
          left: 0,
          toJSON: () => ({}),
        } as DOMRect;
      });

    Object.defineProperty(HTMLElement.prototype, "animate", {
      configurable: true,
      value: animateMock,
    });
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
    jest.restoreAllMocks();
    animateMock.mockClear();
  });

  it("(1) Should render nothing for empty list", () => {
    const { queryByTestId } = render(
      <Components.NotificationWrapper
        items={[]}
        removeNotificationData={jest.fn()}
      />,
    );
    expect(queryByTestId("NotificationWrapper_LIST")).not.toBeInTheDocument();
  });

  it("(2) Should remove non-top notification on click", () => {
    const remove = jest.fn();
    render(
      <Components.NotificationWrapper
        items={createItems()}
        removeNotificationData={remove}
      />,
    );

    fireEvent.click(screen.getByText("Second"));
    expect(remove).toHaveBeenCalledWith("second");
  });

  it("(3) Should start flyUp for top and remove only on wrapper animation end", () => {
    const remove = jest.fn();
    render(
      <Components.NotificationWrapper
        items={createItems()}
        removeNotificationData={remove}
      />,
    );

    fireEvent.click(screen.getByText("Top"));
    const topItem = screen.getByTestId("NotificationWrapper_ITEM_top");
    expect(topItem).toHaveClass("flyUp");

    if (topItem.firstElementChild) {
      fireEvent.animationEnd(topItem.firstElementChild);
    }
    expect(remove).not.toHaveBeenCalled();

    fireEvent.animationEnd(topItem);
    expect(remove).toHaveBeenCalledWith("top");
  });

  it("(4) Should auto-close top through flyUp and non-top directly", () => {
    const remove = jest.fn();
    render(
      <Components.NotificationWrapper
        items={createItems()}
        removeNotificationData={remove}
      />,
    );

    act(() => {
      jest.advanceTimersByTime(7000);
    });

    expect(remove).toHaveBeenCalledWith("second");
    const topItem = screen.getByTestId("NotificationWrapper_ITEM_top");
    expect(topItem).toHaveClass("flyUp");

    fireEvent.animationEnd(topItem);
    expect(remove).toHaveBeenCalledWith("top");
  });

  it("(5) Should apply flyDown for new item and remove it after duration", () => {
    render(
      <Components.NotificationWrapper
        items={[{ id: "new", isOpen: true, text: "New", type: "info" }]}
        removeNotificationData={jest.fn()}
      />,
    );

    const newItem = screen.getByTestId("NotificationWrapper_ITEM_new");
    expect(newItem).toHaveClass("flyDown");

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(newItem).not.toHaveClass("flyDown");
  });

  it("(6) Should run FLIP on reorder and skip next FLIP after top removal", () => {
    const StatefulWrapper = () => {
      const [items, setItems] = useState(createItems());
      return (
        <Components.NotificationWrapper
          items={items}
          removeNotificationData={(id) => {
            setItems((prev) => prev.filter((item) => item.id !== id));
          }}
        />
      );
    };

    rectTopByTestId = {
      NotificationWrapper_ITEM_top: 0,
      NotificationWrapper_ITEM_second: 100,
    };

    const { rerender, unmount } = render(
      <Components.NotificationWrapper
        items={createItems()}
        removeNotificationData={jest.fn()}
      />,
    );

    rectTopByTestId = {
      NotificationWrapper_ITEM_top: 0,
      NotificationWrapper_ITEM_second: 20,
    };

    rerender(
      <Components.NotificationWrapper
        items={createItems()}
        removeNotificationData={jest.fn()}
      />,
    );
    expect(animateMock).toHaveBeenCalled();

    unmount();
    animateMock.mockClear();
    rectTopByTestId = {
      NotificationWrapper_ITEM_top: 0,
      NotificationWrapper_ITEM_second: 100,
    };
    render(<StatefulWrapper />);

    fireEvent.click(screen.getByText("Top"));
    rectTopByTestId = { NotificationWrapper_ITEM_second: 0 };
    fireEvent.animationEnd(screen.getByTestId("NotificationWrapper_ITEM_top"));

    expect(animateMock).not.toHaveBeenCalled();
  });
});
