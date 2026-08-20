import { buildWordSegments } from "~utils/string/buildWordSegments";

describe("buildWordSegments", () => {
  it("(1) Should return a single plain segment when there are no actions in the template", () => {
    expect(buildWordSegments("Ознакомьтесь с требованиями", [])).toEqual([
      { key: "part-0", text: "Ознакомьтесь с требованиями" },
    ]);
  });

  it("(2) Should return an empty list for an empty template", () => {
    expect(buildWordSegments("", [])).toEqual([]);
  });

  it("(3) Should split the template into plain and action segments", () => {
    const onPhotoClick = jest.fn();

    expect(
      buildWordSegments("Перед загрузкой @action<Требования> прочитайте", [
        onPhotoClick,
      ]),
    ).toEqual([
      { key: "part-0", text: "Перед загрузкой " },
      { key: "part-1", text: "Требования", onClick: onPhotoClick },
      { key: "part-2", text: " прочитайте" },
    ]);
  });

  it("(4) Should assign actions to action segments in order of appearance", () => {
    const onPhotoClick = jest.fn();
    const onSignatureClick = jest.fn();

    const segments = buildWordSegments("@action<Фото> и @action<Подпись>", [
      onPhotoClick,
      onSignatureClick,
    ]);

    expect(segments).toEqual([
      { key: "part-0", text: "Фото", onClick: onPhotoClick },
      { key: "part-1", text: " и " },
      { key: "part-2", text: "Подпись", onClick: onSignatureClick },
    ]);

    segments[0].onClick?.();
    segments[2].onClick?.();

    expect(onPhotoClick).toHaveBeenCalledTimes(1);
    expect(onSignatureClick).toHaveBeenCalledTimes(1);
  });

  it("(5) Should leave onClick undefined when there is no action for the segment", () => {
    expect(buildWordSegments("Читайте @action<Требования>", [])).toEqual([
      { key: "part-0", text: "Читайте " },
      { key: "part-1", text: "Требования", onClick: undefined },
    ]);
  });

  it("(6) Should treat an unclosed action marker as plain text", () => {
    expect(
      buildWordSegments("Читайте @action<Требования", [jest.fn()]),
    ).toEqual([{ key: "part-0", text: "Читайте @action<Требования" }]);
  });
});
