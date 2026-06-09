import { getMonthNameProper } from "~utils/date/getMonthNameProper";

describe("getMonthNameProper", () => {
  it("(1) Should return russian month name", () => {
    expect(getMonthNameProper(0, "ru")).toBe("Январь");
  });

  it("(2) Should return english month name", () => {
    expect(getMonthNameProper(0, "en")).toBe("January");
  });

  it("(3) Should return kazakh month name from dictionary", () => {
    expect(getMonthNameProper(0, "kk")).toBe("Қаңтар");
    expect(getMonthNameProper(8, "kk")).toBe("Қыркүйек");
  });
});
