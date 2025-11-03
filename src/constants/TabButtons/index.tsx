import type { ITabItem } from "~interfaces/TabButtons";

const TabLabels = {
  FIRST: "First Tab",
  SECOND: "Second Tab",
} as const;

export type TTabLabels = keyof typeof TabLabels;

export const tabLabelsArray = Object.entries(TabLabels).map(([key, value]) => ({
  key,
  text: value,
})) as ITabItem[];
