import { fireEvent, render, screen } from "@testing-library/react";

import { EmptyState } from "~components";

describe("EmptyState", () => {
  it("(1) Should show the description and search icon without an action", () => {
    render(
      <EmptyState description={"Ничего не найдено\nИзмените условия поиска"} />,
    );

    expect(screen.getByTestId("EmptyState_DESCRIPTION").textContent).toBe(
      "Ничего не найдено\nИзмените условия поиска",
    );
    expect(screen.getByTestId("EmptyState_ICON")).toHaveAttribute(
      "width",
      "32",
    );
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("(2) Should hide the action when its callback is missing", () => {
    render(
      <EmptyState description="Ничего не найдено" buttonText="Повторить" />,
    );

    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("(3) Should hide the action when its label is missing", () => {
    const onButtonClick = jest.fn();
    render(
      <EmptyState
        description="Ничего не найдено"
        onButtonClick={onButtonClick}
      />,
    );

    expect(screen.queryByRole("button")).not.toBeInTheDocument();
    expect(onButtonClick).not.toHaveBeenCalled();
  });

  it("(4) Should call the supplied action without submitting a form", () => {
    const onButtonClick = jest.fn();
    render(
      <EmptyState
        description="Ничего не найдено"
        buttonText="Повторить"
        onButtonClick={onButtonClick}
      />,
    );

    const button = screen.getByRole("button", { name: "Повторить" });
    expect(button).toHaveAttribute("type", "button");
    fireEvent.click(button);
    expect(onButtonClick).toHaveBeenCalledTimes(1);
  });
});
