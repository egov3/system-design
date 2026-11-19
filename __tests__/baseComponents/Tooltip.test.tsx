import { render, screen } from "@testing-library/react";

import { Tooltip } from "~baseComponents";

describe("Tooltip", () => {
  it("(1) Should describe the trigger and render a decorative arrow", () => {
    const text = "Мы улучшаем поиск,\nждите в следующем релизе!";
    render(
      <>
        <button aria-describedby="search-tooltip">Поиск</button>
        <Tooltip id="search-tooltip" text={text} />
      </>,
    );

    expect(screen.getByRole("button")).toHaveAttribute(
      "aria-describedby",
      screen.getByRole("tooltip").id,
    );
    expect(screen.getByRole("tooltip").textContent).toBe(text);
    expect(
      screen.getByRole("tooltip").querySelector('[aria-hidden="true"]'),
    ).toBeInTheDocument();
  });
});
