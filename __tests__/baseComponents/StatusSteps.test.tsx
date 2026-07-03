import { render, screen } from "@testing-library/react";
import { StatusSteps } from "~baseComponents";

describe("StatusSteps", () => {
  it("(1) Should render one item and title per step", () => {
    render(
      <StatusSteps
        steps={[
          { title: "Запрос отправлен", state: "completed" },
          { title: "Ответ получен", state: "current" },
        ]}
      />,
    );

    expect(screen.getByTestId("StatusSteps_ROOT")).toBeInTheDocument();
    expect(screen.getAllByTestId("StatusSteps_ITEM")).toHaveLength(2);
    const titles = screen.getAllByTestId("StatusSteps_TITLE");
    expect(titles[0]).toHaveTextContent("Запрос отправлен");
    expect(titles[1]).toHaveTextContent("Ответ получен");
  });

  it("(2) Should render subtitle only when provided", () => {
    render(
      <StatusSteps
        steps={[
          {
            title: "С подзаголовком",
            subtitle: "18 дек, в 18:23",
            state: "completed",
          },
          { title: "Без подзаголовка", state: "pending" },
        ]}
      />,
    );

    const subtitles = screen.getAllByTestId("StatusSteps_SUBTITLE");
    expect(subtitles).toHaveLength(1);
    expect(subtitles[0]).toHaveTextContent("18 дек, в 18:23");
  });

  it("(3) Should render a green dot for completed step with dot variant", () => {
    render(
      <StatusSteps
        steps={[
          {
            title: "Запрос отправлен",
            state: "completed",
            completedVariant: "dot",
          },
        ]}
      />,
    );

    expect(
      screen.getByTestId("StatusSteps_MARKER_COMPLETED_DOT"),
    ).toBeInTheDocument();
    expect(
      screen.queryByTestId("StatusSteps_MARKER_COMPLETED"),
    ).not.toBeInTheDocument();
  });

  it("(4) Should render a check icon for completed step by default", () => {
    render(
      <StatusSteps
        steps={[{ title: "Результат услуги", state: "completed" }]}
      />,
    );

    expect(
      screen.getByTestId("StatusSteps_MARKER_COMPLETED"),
    ).toBeInTheDocument();
    expect(screen.getByTestId("CheckIcon")).toBeInTheDocument();
    expect(
      screen.queryByTestId("StatusSteps_MARKER_COMPLETED_DOT"),
    ).not.toBeInTheDocument();
  });

  it("(5) Should render a custom icon for a completed step when provided", () => {
    render(
      <StatusSteps
        steps={[
          {
            title: "Результат услуги",
            state: "completed",
            icon: <span data-testid="CustomIcon" />,
          },
        ]}
      />,
    );

    expect(
      screen.getByTestId("StatusSteps_MARKER_COMPLETED"),
    ).toBeInTheDocument();
    expect(screen.getByTestId("CustomIcon")).toBeInTheDocument();
    expect(screen.queryByTestId("CheckIcon")).not.toBeInTheDocument();
  });

  it("(6) Should render an hourglass icon for the current step by default", () => {
    render(
      <StatusSteps steps={[{ title: "Ответ получен", state: "current" }]} />,
    );

    expect(
      screen.getByTestId("StatusSteps_MARKER_CURRENT"),
    ).toBeInTheDocument();
    expect(screen.getByTestId("HourglassIcon")).toBeInTheDocument();
  });

  it("(7) Should render a custom icon and mark the current step when provided", () => {
    render(
      <StatusSteps
        steps={[
          {
            title: "Ответ получен",
            state: "current",
            icon: <span data-testid="CustomIcon" />,
          },
        ]}
      />,
    );

    expect(
      screen.getByTestId("StatusSteps_MARKER_CURRENT"),
    ).toBeInTheDocument();
    expect(screen.getByTestId("CustomIcon")).toBeInTheDocument();
    expect(screen.queryByTestId("HourglassIcon")).not.toBeInTheDocument();
    expect(screen.getByTestId("StatusSteps_ITEM")).toHaveAttribute(
      "aria-current",
      "step",
    );
  });

  it("(8) Should render the passed icon without marking a pending step as current", () => {
    render(
      <StatusSteps
        steps={[
          {
            title: "Результат услуги",
            state: "pending",
            icon: <span data-testid="CustomIcon" />,
          },
        ]}
      />,
    );

    expect(screen.getByTestId("CustomIcon")).toBeInTheDocument();
    expect(screen.getByTestId("StatusSteps_ITEM")).not.toHaveAttribute(
      "aria-current",
    );
  });

  it("(9) Should render a solid accent circle for the current step", () => {
    render(
      <StatusSteps steps={[{ title: "Ответ получен", state: "current" }]} />,
    );

    expect(
      screen.getByTestId("StatusSteps_MARKER_CURRENT").className,
    ).toContain("circleCurrent");
  });

  it("(10) Should render N-1 connectors and mark the one after a completed step as success", () => {
    render(
      <StatusSteps
        steps={[
          { title: "Запрос отправлен", state: "completed" },
          { title: "Ответ получен", state: "current" },
          { title: "Результат услуги", state: "pending", icon: <span /> },
        ]}
      />,
    );

    const connectors = screen.getAllByTestId("StatusSteps_CONNECTOR");
    expect(connectors).toHaveLength(2);
    expect(connectors[0].className).toContain("connectorSuccess");
    expect(connectors[1].className).not.toContain("connectorSuccess");
  });

  it("(11) Should mark the connector after a current step as current", () => {
    render(
      <StatusSteps
        steps={[
          { title: "Ответ получен", state: "current" },
          { title: "Результат услуги", state: "pending", icon: <span /> },
        ]}
      />,
    );

    expect(screen.getByTestId("StatusSteps_CONNECTOR").className).toContain(
      "connectorCurrent",
    );
  });

  it("(12) Should forward aria-label to the list and merge a custom className", () => {
    render(
      <StatusSteps
        aria-label="Статус заявки"
        className="customClass"
        steps={[{ title: "Запрос отправлен", state: "completed" }]}
      />,
    );

    const root = screen.getByTestId("StatusSteps_ROOT");
    expect(root).toHaveAttribute("aria-label", "Статус заявки");
    expect(root.className).toContain("customClass");
  });
});
