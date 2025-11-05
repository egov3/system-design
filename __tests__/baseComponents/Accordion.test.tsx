import { fireEvent, render, renderHook, screen } from "@testing-library/react";
import { useState } from "react";
import { BaseComponents } from "~baseComponents";

describe("Accordion", () => {
  it("(1) Should toggle accordion when clicking on the header", () => {
    const { result } = renderHook(() => useState(false)); // NOSONAR

    const { rerender } = render(
      <BaseComponents.Accordion
        open={result.current[0]}
        setOpen={result.current[1]}
        title={<>Accordion title</>}
      >
        Accordion Content
      </BaseComponents.Accordion>,
    );

    const accordionHeader = screen.getByTestId("Accordion_BUTTON");
    const accordionContent = screen.getByTestId("Accordion_CONTENT");

    expect(accordionContent).toHaveClass("accordionContent--hidden");

    fireEvent.click(accordionHeader);

    rerender(
      <BaseComponents.Accordion
        open={result.current[0]}
        setOpen={result.current[1]}
        title={<>Accordion title</>}
      >
        Accordion Content
      </BaseComponents.Accordion>,
    );

    expect(accordionContent).not.toHaveClass("accordionContent--hidden");
  });
});
