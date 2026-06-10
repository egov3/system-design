import { convertType } from "~utils/date/convertType";

describe("convertType", () => {
  it("(1) Should convert day month and year values to string", () => {
    expect(convertType.day.toString(5)).toBe("05");
    expect(convertType.month.toString(0)).toBe("01");
    expect(convertType.year.toString(2025)).toBe("2025");
  });

  it("(2) Should convert day month and year values to number", () => {
    expect(convertType.day.toNumber("05")).toBe(5);
    expect(convertType.month.toNumber("01")).toBe(0);
    expect(convertType.year.toNumber("2025")).toBe(2025);
  });

  it("(3) Should convert date object to string values", () => {
    expect(
      convertType.date.toString({
        day: 5,
        month: 0,
        year: 2025,
      }),
    ).toEqual({
      day: "05",
      month: "01",
      year: "2025",
    });
  });

  it("(4) Should convert date object to numeric values", () => {
    expect(
      convertType.date.toNumber({
        day: "05",
        month: "01",
        year: "2025",
      }),
    ).toEqual({
      day: 5,
      month: 0,
      year: 2025,
    });
  });

  it("(5) Should convert date range to string values", () => {
    expect(
      convertType.dateRange.toString({
        from: {
          day: 1,
          month: 0,
          year: 2025,
        },
        to: {
          day: 15,
          month: 10,
          year: 2026,
        },
      }),
    ).toEqual({
      from: {
        day: "01",
        month: "01",
        year: "2025",
      },
      to: {
        day: "15",
        month: "11",
        year: "2026",
      },
    });
  });

  it("(6) Should convert date range to numeric values", () => {
    expect(
      convertType.dateRange.toNumber({
        from: {
          day: "01",
          month: "01",
          year: "2025",
        },
        to: {
          day: "15",
          month: "11",
          year: "2026",
        },
      }),
    ).toEqual({
      from: {
        day: 1,
        month: 0,
        year: 2025,
      },
      to: {
        day: 15,
        month: 10,
        year: 2026,
      },
    });
  });
});
