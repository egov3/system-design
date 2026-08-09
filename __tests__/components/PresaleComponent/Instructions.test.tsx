import { render, screen } from "@testing-library/react";
import { PresaleComponent } from "~components";
import { steps } from "~constants/mockData";

describe("PresaleComponent.Instructions", () => {
  it("(1) Should render instruction steps text", () => {
    render(<PresaleComponent.Instructions instructions={steps} lang="ru" />);

    expect(
      screen.getAllByTestId("InstructionsListItem_TEXT")[0],
    ).toHaveTextContent(steps[0].ru);
    expect(
      screen.getAllByTestId("InstructionsListItem_TEXT")[1],
    ).toHaveTextContent(steps[1].ru);
  });
});
