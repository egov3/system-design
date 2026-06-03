import { render, screen } from "@testing-library/react";
import { Components } from "~components";

describe("Calendar Component", () => {
  test("(1) Should render Calendar body and save button", () => {
    render(<Components.Calendar lang="ru" />);

    expect(screen.getByTestId("CalendarBody")).toBeInTheDocument();
    expect(screen.getByText("Сохранить")).toBeInTheDocument();
  });
});
