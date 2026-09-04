import type { ICropWindow } from "~customHooks/useCropWindow";

/* NOTE: the crop rect is a percentage of the painted photo, so it maps straight
  onto the photo's own pixels without knowing how large it was drawn on screen. */
export const cropImage = (
  image: HTMLImageElement,
  crop: ICropWindow,
): string => {
  const { naturalWidth, naturalHeight } = image;
  const canvas = document.createElement("canvas");
  canvas.width = Math.round((crop.width / 100) * naturalWidth);
  canvas.height = Math.round((crop.height / 100) * naturalHeight);

  canvas
    .getContext("2d")
    ?.drawImage(
      image,
      (crop.x / 100) * naturalWidth,
      (crop.y / 100) * naturalHeight,
      canvas.width,
      canvas.height,
      0,
      0,
      canvas.width,
      canvas.height,
    );

  return canvas.toDataURL("image/png");
};
