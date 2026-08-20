const ACTION_OPEN = "@action<";
const ACTION_CLOSE = ">";
const ACTION_PATTERN = /(@action<[^>]*>)/;

interface ITextSegment {
  key: string;
  text: string;
  onClick?: () => void;
}

export const buildWordSegments = (
  textTemplate: string,
  actions: (() => void)[],
): ITextSegment[] => {
  const parts = textTemplate.split(ACTION_PATTERN).filter(Boolean);
  const segments: ITextSegment[] = [];
  let nextActionIndex = 0;

  for (let index = 0; index < parts.length; index += 1) {
    const part = parts[index];
    const isAction =
      part.startsWith(ACTION_OPEN) && part.endsWith(ACTION_CLOSE);

    if (isAction) {
      segments.push({
        key: `part-${index}`,
        text: part.slice(ACTION_OPEN.length, -ACTION_CLOSE.length),
        onClick: actions[nextActionIndex],
      });
      nextActionIndex += 1;
    } else {
      segments.push({ key: `part-${index}`, text: part });
    }
  }

  return segments;
};
