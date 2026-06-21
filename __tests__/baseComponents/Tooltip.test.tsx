import { render, screen } from "@testing-library/react";
import { BaseComponents } from "~baseComponents";

describe("Tooltip", () => {
  it("(1) Should render trigger, content and arrow", () => {
    render(
      <BaseComponents.Tooltip dataTestid="TestTooltip" text="Tooltip text">
        <button type="button">Trigger</button>
      </BaseComponents.Tooltip>,
    );

    expect(screen.getByTestId("TestTooltip_WRAP")).toBeInTheDocument();
    expect(screen.getByTestId("TestTooltip_CONTENT")).toHaveTextContent(
      "Tooltip text",
    );
    expect(screen.getByTestId("TestTooltip_ARROW")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Trigger" })).toBeInTheDocument();
  });
});
