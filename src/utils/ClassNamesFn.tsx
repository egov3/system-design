export const ClassNamesFn = (...args: unknown[]) =>
  args.filter((item) => !!item).join(" ");
