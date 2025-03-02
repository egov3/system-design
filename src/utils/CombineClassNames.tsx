export const combineClassNames = (...args: unknown[]) =>
  args.filter((item) => !!item).join(" ");
