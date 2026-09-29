export const DEFAULT_PAGE_SIZES = [5, 10, 20] as const;

export type TPageSize = (typeof DEFAULT_PAGE_SIZES)[number];
