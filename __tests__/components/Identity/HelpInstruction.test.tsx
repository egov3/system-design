import { render, screen } from "@testing-library/react";
import { Components } from "~components";

describe("Components.HelpInstruction ", () => {
  it("(1) Should render HelpInstruction wrapper", () => {
    render(
      <Components.HelpInstruction
        description="description"
        linkText="linkText"
        link=""
      />,
    );

    expect(screen.getByTestId("HelpInstruction_WRAP")).toBeInTheDocument();
  });
});
