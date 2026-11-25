import { render, screen, within } from "@testing-library/react";

import type { IPrecheckListItem } from "~components";

import { PrecheckList } from "~components";

const checks: IPrecheckListItem[] = [
  { title: "Первая проверка", status: "loading", description: "Выполняется" },
  { title: "Вторая проверка", status: "success", description: "Пройдена" },
  { title: "Третья проверка", status: "error", description: "Нет сведений" },
];

describe("PrecheckList", () => {
  it("(1) Should show each check with its status icon and message", () => {
    render(<PrecheckList checks={checks} />);
    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(3);
    checks.forEach(({ title, status, description }, index) => {
      const item = within(items[index]);
      expect(item.getByTestId("PrecheckList_CHECK_TITLE")).toHaveTextContent(
        title,
      );
      expect(item.getByTestId("PrecheckList_CHECK_STATUS")).toHaveTextContent(
        description,
      );
      expect(item.getByTestId("PrecheckList_CHECK_ICON")).toHaveClass(status);
    });
    expect(screen.queryByTestId("PrecheckList_HINT")).not.toBeInTheDocument();
  });

  it("(2) Should show a multiline hint when provided", () => {
    render(
      <PrecheckList
        checks={checks}
        hint={"Дождитесь проверки\nНе закрывайте страницу"}
      />,
    );
    expect(screen.getByTestId("PrecheckList_HINT").textContent).toBe(
      "Дождитесь проверки\nНе закрывайте страницу",
    );
  });

  it("(3) Should replace a pending check with its updated result", () => {
    const { rerender } = render(
      <PrecheckList checks={[checks[0]]} hint="Ожидайте" />,
    );
    rerender(
      <PrecheckList
        checks={[
          { ...checks[0], status: "error", description: "Проверка отклонена" },
        ]}
        hint="Повторите позже"
      />,
    );
    expect(screen.getByTestId("PrecheckList_CHECK_ICON")).toHaveClass("error");
    expect(screen.queryByText("Выполняется")).not.toBeInTheDocument();
    expect(screen.getByTestId("PrecheckList_CHECK_STATUS")).toHaveTextContent(
      "Проверка отклонена",
    );
    expect(screen.getByTestId("PrecheckList_HINT")).toHaveTextContent(
      "Повторите позже",
    );
  });
});
