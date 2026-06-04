import { render, screen } from "@testing-library/react";
import { Components } from "~components";

describe("Calendar Component", () => {
  test("(1) Should render Calendar body and save button", () => {
    render(<Components.Calendar lang="ru" />);

    expect(screen.getByTestId("CalendarBody")).toBeInTheDocument();
    expect(screen.getByText("Сохранить")).toBeInTheDocument();
  });

  test("(2) Should disable dates after maxDate in default mode", () => {
    render(
      <Components.Calendar
        lang="ru"
        mode="default"
        defaultSelectedDate={new Date(2025, 0, 10)}
        maxDate={new Date(2025, 0, 15)}
      />,
    );

    expect(screen.getByTestId("CalendarBody_DAY_2025-01-16")).toBeDisabled();
    expect(screen.getByTestId("Calendar_NEXT_MONTH_BTN")).toBeDisabled();
  });
});
