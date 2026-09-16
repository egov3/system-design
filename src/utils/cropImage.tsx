import type { ICropWindow } from "~customHooks/useCropWindow";

/* NOTE: область выделения покрывает % изображения, и он отрисовывается поверх пикселей изображения, поэтому не нужно знать, какого размера оно было на экране. */
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
