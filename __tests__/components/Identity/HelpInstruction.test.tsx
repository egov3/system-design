import { render, screen } from "@testing-library/react";
import { Components } from "~components";

describe("Components.HelpInstruction ", () => {
  it("(1) Should render HelpInstruction wrapper", () => {
    const lang = "ru";

    render(<Components.HelpInstruction lang={lang} />);

    expect(screen.getByTestId("HelpInstruction_WRAP")).toBeInTheDocument();
  });
});
