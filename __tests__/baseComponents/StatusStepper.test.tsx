import { NotificationIcon } from "@egov3/graphics/General/Notification";
import { ScheduleIcon } from "@egov3/graphics/General/Schedule";
import { StarIcon } from "@egov3/graphics/General/Star";
import { render, screen, within } from "@testing-library/react";
import { StatusStepper } from "~baseComponents";
import type {
  IStatusStepItem,
  TStatusStepState,
} from "~interfaces/StatusStepper";

const renderSteps = (steps: IStatusStepItem[]) =>
  render(<StatusStepper steps={steps} />);

const ALL_STATES: TStatusStepState[] = [
  "completed",
  "current",
  "pending",
  "error",
];

const DEFAULT_ICON_BY_STATE: Record<TStatusStepState, string> = {
  completed: "CheckIcon",
  current: "HourglassIcon",
  pending: "HourglassIcon",
  error: "CheckIcon",
};

const stepsForAllStates = (variant?: IStatusStepItem["variant"]) =>
  ALL_STATES.map((state) => ({ id: state, title: state, state, variant }));

describe("StatusStepper", () => {
  it("(1) Should render an item with a title per step and a subtitle only when provided", () => {
    renderSteps([
      {
        id: "sent",
        title: "Запрос отправлен",
        subtitle: "18 дек, в 18:23",
        state: "completed",
      },
      { id: "response", title: "Ответ получен", state: "pending" },
    ]);

    expect(screen.getByTestId("StatusStepper_ROOT")).toBeInTheDocument();
    expect(screen.getAllByTestId("StatusStepper_ITEM")).toHaveLength(2);

    const titles = screen.getAllByTestId("StatusStepper_TITLE");
    expect(titles[0]).toHaveTextContent("Запрос отправлен");
    expect(titles[1]).toHaveTextContent("Ответ получен");

    const subtitles = screen.getAllByTestId("StatusStepper_SUBTITLE");
    expect(subtitles).toHaveLength(1);
    expect(subtitles[0]).toHaveTextContent("18 дек, в 18:23");
  });

  it.each(ALL_STATES)(
    "(2) Should render a circle marker with the state class and the default icon for the %s state",
    (state) => {
      renderSteps(stepsForAllStates());

      const marker = screen.getByTestId(
        `StatusStepper_MARKER_${state.toUpperCase()}`,
      );
      expect(marker).toHaveClass(state);
      expect(
        within(marker).getByTestId(DEFAULT_ICON_BY_STATE[state]),
      ).toBeInTheDocument();
    },
  );

  it("(3) Should set aria-current only for the current step", () => {
    renderSteps(stepsForAllStates());

    const items = screen.getAllByTestId("StatusStepper_ITEM");
    expect(items[0]).not.toHaveAttribute("aria-current");
    expect(items[1]).toHaveAttribute("aria-current", "step");
    expect(items[2]).not.toHaveAttribute("aria-current");
    expect(items[3]).not.toHaveAttribute("aria-current");
  });

  it.each(ALL_STATES)(
    "(4) Should render a state-colored dot without a circle for the %s state of the dot variant",
    (state) => {
      renderSteps(stepsForAllStates("dot"));

      expect(
        screen.getByTestId(`StatusStepper_MARKER_${state.toUpperCase()}_DOT`),
      ).toHaveClass(state);
      expect(
        screen.queryByTestId(`StatusStepper_MARKER_${state.toUpperCase()}`),
      ).not.toBeInTheDocument();
    },
  );

  it("(5) Should render a custom icon instead of the default one, but ignore it for the dot variant", () => {
    renderSteps([
      {
        id: "circle",
        title: "Результат услуги",
        state: "completed",
        icon: <StarIcon width={20} height={20} />,
      },
      {
        id: "dot",
        title: "Запрос отправлен",
        state: "completed",
        variant: "dot",
        icon: <ScheduleIcon width={20} height={20} />,
      },
    ]);

    expect(screen.getByTestId("StarIcon")).toBeInTheDocument();
    expect(screen.queryByTestId("CheckIcon")).not.toBeInTheDocument();

    expect(
      screen.getByTestId("StatusStepper_MARKER_COMPLETED_DOT"),
    ).toBeInTheDocument();
    expect(screen.queryByTestId("ScheduleIcon")).not.toBeInTheDocument();
  });

  it("(6) Should render N-1 connectors colored by the state of the preceding step", () => {
    renderSteps([
      { id: "completed", title: "Completed", state: "completed" },
      { id: "current", title: "Current", state: "current" },
      { id: "error", title: "Error", state: "error" },
      { id: "pending", title: "Pending", state: "pending" },
      { id: "last", title: "Last", state: "pending" },
    ]);

    const connectors = screen.getAllByTestId("StatusStepper_CONNECTOR");
    expect(connectors).toHaveLength(4);
    expect(connectors[0]).toHaveClass("completed");
    expect(connectors[1]).toHaveClass("current");
    expect(connectors[2]).toHaveClass("error");
    expect(connectors[3]).toHaveClass("pending");
    expect(connectors[3]).not.toHaveClass("completed", "current", "error");
  });

  it("(7) Should fall back to currentColor fill for a custom icon and keep an explicitly provided fill", () => {
    renderSteps([
      {
        id: "no-fill",
        title: "Без fill",
        state: "completed",
        icon: <StarIcon width={20} height={20} />,
      },
      {
        id: "with-fill",
        title: "С fill",
        state: "completed",
        icon: <NotificationIcon width={20} height={20} fill="#ff0000" />,
      },
    ]);

    expect(
      screen.getByTestId("StarIcon").querySelector("path"),
    ).toHaveAttribute("fill", "currentColor");
    expect(
      screen.getByTestId("NotificationIcon").querySelector("path"),
    ).toHaveAttribute("fill", "#ff0000");
  });

  it("(8) Should forward aria-label to the list, merge a custom className and render no connectors for a single step", () => {
    render(
      <StatusStepper
        aria-label="Статус заявки"
        className="customClass"
        steps={[{ id: "sent", title: "Запрос отправлен", state: "completed" }]}
      />,
    );

    const root = screen.getByTestId("StatusStepper_ROOT");
    expect(root).toHaveAttribute("aria-label", "Статус заявки");
    expect(root).toHaveClass("customClass");
    expect(
      screen.queryByTestId("StatusStepper_CONNECTOR"),
    ).not.toBeInTheDocument();
  });
});
