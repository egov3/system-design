import { fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import { BaseComponents } from "~baseComponents";

const TestWrapper = () => {
  const [open, setOpen] = useState(false);
  return (
    <BaseComponents.Accordion
      open={open}
      setOpen={setOpen}
      title={<>Accordion title</>}
    >
      Accordion Content
    </BaseComponents.Accordion>
  );
};

describe("Accordion", () => {
  it("(1) Should toggle accordion when clicking on the header", () => {
    render(<TestWrapper />);

    const accordionHeader = screen.getByTestId("Accordion_BUTTON");
    const accordionContent = screen.getByTestId("Accordion_CONTENT");

    expect(accordionContent).toHaveClass("accordionContent--hidden");

    fireEvent.click(accordionHeader);

    expect(accordionContent).not.toHaveClass("accordionContent--hidden");
  });
});
