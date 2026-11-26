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
  });
});
