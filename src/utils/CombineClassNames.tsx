export const CombineClassNames = (...args: unknown[]) =>
  args.filter((item) => !!item).join(" ");
