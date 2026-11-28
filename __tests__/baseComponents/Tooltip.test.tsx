import { fireEvent, render, screen } from "@testing-library/react";

import { Button, Tooltip } from "~baseComponents";

describe("Tooltip", () => {
  it("(1) Should describe a disabled trigger and render a decorative arrow", () => {
    const text = "Мы улучшаем поиск,\nждите в следующем релизе!";
    render(
      <Tooltip text={text}>
        <Button disabled>Поиск</Button>
      </Tooltip>,
    );

    expect(screen.getByRole("button")).toHaveAttribute(
      "aria-describedby",
      screen.getByRole("tooltip").id,
    );
    expect(screen.getByRole("button")).toHaveAccessibleDescription(text);
    expect(screen.getByTestId("Tooltip_WRAPPER")).toContainElement(
      screen.getByTestId("Tooltip_BUBBLE"),
    );
    expect(screen.getByRole("tooltip").textContent).toBe(text);
    expect(
      screen.getByRole("tooltip").querySelector('[aria-hidden="true"]'),
    ).toBeInTheDocument();
  });

  it("(2) Should preserve an existing description and generate unique tooltip IDs", () => {
    render(
      <>
        <Tooltip text="Первый">
          <button aria-describedby="existing-description">Первый</button>
        </Tooltip>
        <Tooltip text="Второй">
          <button>Второй</button>
        </Tooltip>
      </>,
    );

    const [firstTooltip, secondTooltip] = screen.getAllByRole("tooltip");
    const [firstButton, secondButton] = screen.getAllByRole("button");
    expect(firstTooltip.id).not.toBe(secondTooltip.id);
    expect(firstButton).toHaveAttribute(
      "aria-describedby",
      `existing-description ${firstTooltip.id}`,
    );
    expect(secondButton).toHaveAttribute("aria-describedby", secondTooltip.id);
  });

  it("(3) Should dismiss with Escape and reopen on the next hover or focus", () => {
    render(
      <Tooltip text="Описание">
        <button>Поиск</button>
      </Tooltip>,
    );

    const wrapper = screen.getByTestId("Tooltip_WRAPPER");
    fireEvent.keyDown(document, { key: "Enter" });
    expect(wrapper).toHaveAttribute("data-dismissed", "false");

    fireEvent.keyDown(document, { key: "Escape" });
    expect(wrapper).toHaveAttribute("data-dismissed", "true");

    fireEvent.mouseEnter(wrapper);
    expect(wrapper).toHaveAttribute("data-dismissed", "false");

    fireEvent.keyDown(document, { key: "Escape" });
    fireEvent.focus(screen.getByRole("button"));
    expect(wrapper).toHaveAttribute("data-dismissed", "false");
  });
});
