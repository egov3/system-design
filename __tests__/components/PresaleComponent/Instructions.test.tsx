import { render, screen } from "@testing-library/react";
import { Components } from "~components";
import { steps } from "~constants/mockData";

describe("PresaleComponent.Instructions", () => {
  it("(1) Should render instruction steps text", () => {
    render(
      <Components.PresaleComponent.Instructions
        instructions={steps}
        lang="ru"
      />,
    );

    expect(
      screen.getAllByTestId("InstructionsListItem_TEXT")[0],
    ).toHaveTextContent("Шаг 1");
    expect(
      screen.getAllByTestId("InstructionsListItem_TEXT")[1],
    ).toHaveTextContent("Шаг 2");
    expect(
      screen.getAllByTestId("InstructionsListItem_TEXT")[2],
    ).toHaveTextContent("Шаг 3");
  });
});
