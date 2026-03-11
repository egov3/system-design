import { render, screen } from "@testing-library/react";
import { Components } from "~components";

describe("Components.Calendar", () => {
  const props = {
    isOpen: true,
    setIsOpen: () => {},
    variant: "default" as const,
    lang: "ru" as const,
    selectedDate: null,
    setSelectedDate: jest.fn(),
    selectedPeriod: null,
    setSelectedPeriod: jest.fn(),
    isWeekdaysOnly: false,
    availableDays: [],
    yearRange: {
      from: { day: 1, month: 1, year: 2020 },
      to: { day: 31, month: 12, year: 2027 },
    },
    hintText: "",
  };

  it("(1) Should highlight selected day when calendar is open", () => {
    render(
      <Components.Calendar
        {...props}
        selectedDate={{
          day: 8,
          month: 3,
          year: 2026,
        }}
      />,
    );

    expect(screen.getByTestId("day-2026-2-8")).toHaveClass(/daySelected/);
  });

  it("(2) Should not highlight selected day when calendar is closed", () => {
    render(
      <Components.Calendar
        {...props}
        isOpen={false}
        selectedDate={{
          day: 8,
          month: 3,
          year: 2026,
        }}
      />,
    );

    expect(screen.getByTestId("day-2026-2-8")).not.toHaveClass(/daySelected/);
  });
});
