import { render, screen } from "@testing-library/react";
import { Components } from "~components";

describe("PresaleComponent.AccordionTitle", () => {
  it("(1) Should render AccordionTitle component ", () => {
    render(<Components.PresaleComponent.AccordionTitle title="Аккордеон" />);

    expect(screen.getByTestId("Accordion_TITLE")).toBeInTheDocument();
  });
});
