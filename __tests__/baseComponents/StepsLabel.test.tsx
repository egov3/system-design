import { render, screen } from "@testing-library/react";

import { StepsLabel } from "~baseComponents";

describe("StepsLabel", () => {
  it("(1) Should render the label text", () => {
    render(<StepsLabel label="Данные заявителя" />);
    expect(screen.getByTestId("StepsLabel_TITLE")).toHaveTextContent(
      "Данные заявителя",
    );
  });

  it("(2) Should set aria-label from the label prop", () => {
    render(<StepsLabel label="Оплата" />);
    expect(screen.getByTestId("StepsLabel_TITLE")).toHaveAttribute(
      "aria-label",
      "Оплата",
    );
  });
});
