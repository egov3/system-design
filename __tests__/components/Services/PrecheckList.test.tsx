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
  it("(1) Should render a title and a status text for every check", () => {
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
  });

  it("(2) Should render the hint below the checks", () => {
    render(<PrecheckList checks={checks} hint={hint} />);

    expect(screen.getByTestId("PrecheckList_HINT")).toHaveTextContent(hint);
  });

  it("(3) Should color the status text by the check status", () => {
    render(<PrecheckList checks={checks} hint={hint} />);

    const statuses = screen.getAllByTestId("PrecheckList_CHECK_STATUS");

    expect(statuses[0]).toHaveClass("checkStatusPassed");
    expect(statuses[1]).toHaveClass("checkStatusFailed");
    expect(statuses[2]).toHaveClass("secondaryText");
  });

  it("(4) Should render the status icon of each check", () => {
    render(<PrecheckList checks={checks} hint={hint} />);

    const items = screen.getAllByTestId("PrecheckList_CHECK_ITEM");

    expect(items[0].querySelector("svg")).toHaveClass("checkIconPassed");
    expect(items[1].querySelector("svg")).toHaveClass("checkIconFailed");
    expect(items[2].querySelector("svg")).toHaveClass("checkIconInProgress");
  });

  it("(5) Should hide the status icons from screen readers", () => {
    render(<PrecheckList checks={checks} hint={hint} />);

    const items = screen.getAllByTestId("PrecheckList_CHECK_ITEM");

    items.forEach((item) => {
      expect(item.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
    });
  });
});
