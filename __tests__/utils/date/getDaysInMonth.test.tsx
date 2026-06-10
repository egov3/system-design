import { getDaysInMonth } from "~utils/date/getDaysInMonth";

describe("getDaysInMonth", () => {
  it("(1) Should return number of days for regular month", () => {
    expect(getDaysInMonth(0, 2025)).toBe(31);
    expect(getDaysInMonth(3, 2025)).toBe(30);
  });

  it("(2) Should return number of days for february in leap and non leap year", () => {
    expect(getDaysInMonth(1, 2024)).toBe(29);
    expect(getDaysInMonth(1, 2025)).toBe(28);
  });
});
