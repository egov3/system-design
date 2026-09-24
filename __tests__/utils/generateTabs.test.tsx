import { generateTabs } from "~utils/generateTabs";

describe("generateTabs", () => {
  it.each([
    [1, 3, "1 2 3"],
    [4, 10, "1 2 3 4 5 ... 10"],
    [5, 10, "1 ... 4 5 6 ... 10"],
    [7, 10, "1 ... 6 7 8 9 10"],
  ])(
    "(%#) Should return tabs for page %i of %i",
    (currentPage, totalPages, expected) => {
      const tabs = generateTabs(currentPage, totalPages);

      expect(tabs.map((tab) => tab.text).join(" ")).toBe(expected);
    },
  );
});
