import { getCurrentTime } from "~utils/date/getCurrentTime";

describe("getCurrentTime", () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it("(1) Should format time correctly with leading zeros for hours and minutes", () => {
    const testDate = new Date(2025, 0, 1, 9, 5);
    const result = getCurrentTime(testDate);
    expect(result).toBe("09:05");
  });

  it("(2) Should use current time when no date is provided", () => {
    const mockDate = new Date(2025, 0, 1, 15, 45);
    jest.setSystemTime(mockDate);

    const result = getCurrentTime();
    expect(result).toBe("15:45");
  });
});
