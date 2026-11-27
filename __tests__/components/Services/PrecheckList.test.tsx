import { render, screen } from "@testing-library/react";

import type { IPrecheckListItem } from "~components";

import { PrecheckList } from "~components";

const checks: IPrecheckListItem[] = [
  {
    status: "PASSED",
    statusText: "Проверка пройдена",
    title: "Проверка гражданства",
  },
  {
    status: "FAILED",
    statusText: "Проверка не пройдена",
    title: "Проверка в базе МЦРИАП",
  },
  {
    status: "IN_PROGRESS",
    statusText: "Идет проверка",
    title: "Проверка активной заявки",
  },
];

const hint = "Проверка может занять до одной минуты";

describe("PrecheckList", () => {
  it("(1) Should render a title and a status text for every check and the hint", () => {
    render(<PrecheckList checks={checks} hint={hint} />);

    const titles = screen.getAllByTestId("PrecheckList_CHECK_TITLE");
    const statuses = screen.getAllByTestId("PrecheckList_CHECK_STATUS");

    expect(screen.getAllByTestId("PrecheckList_CHECK_ITEM")).toHaveLength(3);
    expect(titles[0]).toHaveTextContent("Проверка гражданства");
    expect(titles[1]).toHaveTextContent("Проверка в базе МЦРИАП");
    expect(titles[2]).toHaveTextContent("Проверка активной заявки");
    expect(statuses[0]).toHaveTextContent("Проверка пройдена");
    expect(statuses[1]).toHaveTextContent("Проверка не пройдена");
    expect(statuses[2]).toHaveTextContent("Идет проверка");
    expect(screen.getByTestId("PrecheckList_HINT")).toHaveTextContent(hint);
  });

  it("(2) Should style the status text and the hidden icon by the check status", () => {
    render(<PrecheckList checks={checks} hint={hint} />);

    const statuses = screen.getAllByTestId("PrecheckList_CHECK_STATUS");
    const icons = screen
      .getAllByTestId("PrecheckList_CHECK_ITEM")
      .map((item) => item.querySelector("svg"));

    expect(statuses[0]).toHaveClass("checkStatusPassed");
    expect(statuses[1]).toHaveClass("checkStatusFailed");
    expect(statuses[2]).toHaveClass("secondaryText");
    expect(icons[0]).toHaveClass("checkIconPassed");
    expect(icons[1]).toHaveClass("checkIconFailed");
    expect(icons[2]).toHaveClass("checkIconInProgress");
    icons.forEach((icon) => {
      expect(icon).toHaveAttribute("aria-hidden", "true");
    });
  });
});
