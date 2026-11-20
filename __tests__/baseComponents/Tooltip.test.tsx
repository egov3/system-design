import { render, screen } from "@testing-library/react";

import { Tooltip } from "~baseComponents";

describe("Tooltip", () => {
  it("(1) Should render the given text and a decorative arrow", () => {
    const text = "Мы улучшаем поиск,\nждите в следующем релизе!";
    render(<Tooltip text={text} />);

    expect(screen.getByRole("tooltip").textContent).toBe(text);
    expect(
      screen.getByRole("tooltip").querySelector('[aria-hidden="true"]'),
    ).toBeInTheDocument();
  });
});
