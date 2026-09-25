import type { ITabItem } from "~interfaces/TabButtons";

import { GenerateArray } from "./GenerateArray";

const MAX_VISIBLE_PAGES = 7;
const EDGE_PAGES = 5;

const DOTS_LEFT: ITabItem = { text: "...", key: "dots-left" };
const DOTS_RIGHT: ITabItem = { text: "...", key: "dots-right" };

const toTab = (page: number): ITabItem => ({
  text: String(page),
  key: String(page),
});

export const generateTabs = (
  currentPage: number,
  totalPages: number,
): ITabItem[] => {
  if (totalPages <= MAX_VISIBLE_PAGES) {
    return GenerateArray(totalPages).map(toTab);
  }
  if (currentPage < EDGE_PAGES) {
    return [
      ...GenerateArray(EDGE_PAGES).map(toTab),
      DOTS_RIGHT,
      toTab(totalPages),
    ];
  }
  if (currentPage > totalPages - EDGE_PAGES + 1) {
    return [
      toTab(1),
      DOTS_LEFT,
      ...GenerateArray(EDGE_PAGES, totalPages - EDGE_PAGES + 1).map(toTab),
    ];
  }
  return [
    toTab(1),
    DOTS_LEFT,
    ...GenerateArray(3, currentPage - 1).map(toTab),
    DOTS_RIGHT,
    toTab(totalPages),
  ];
};
