import { type PointerEvent, type RefObject, useRef, useState } from "react";

export const CROP_CORNERS = ["nw", "ne", "se", "sw"] as const;

export type TCropCorner = (typeof CROP_CORNERS)[number];

/* NOTE: Контейнер медиа — это область отображения фотографии, а не обрезанный прямоугольник; используется то же пространство координат, в котором в итоге передаются данные об обрезке, и оно не зависит от того, что фотография при изменении раскладки может получить другой размер */
export interface ICropWindow {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface IDragStart {
  corner: TCropCorner | null;
  pointerX: number;
  pointerY: number;
  crop: ICropWindow | null;
}

const MIN_WIDTH_PCT = 15;

const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);

/* NOTE: Соотношение сторон элемента обрезки рассчитывается относительно границ, а не является фиксированным; оно сохраняется только после того, как соотношение сторон самой фотографии учитывается при формировании области. */
const heightFor = (width: number, ratio: number, mediaRatio: number): number =>
  (width * mediaRatio) / ratio;

const centredCrop = (ratio: number, mediaRatio: number): ICropWindow => {
  const width = Math.min(100, (ratio / mediaRatio) * 100);
  const height = heightFor(width, ratio, mediaRatio);
  return { x: (100 - width) / 2, y: (100 - height) / 2, width, height };
};

export const useCropWindow = (
  mediaRef: RefObject<HTMLDivElement | null>,
  ratio: number,
  onSettle?: (crop: ICropWindow) => void,
) => {
  const [mediaRatio, setMediaRatio] = useState<number | null>(null);
  const [crop, setCrop] = useState<ICropWindow | null>(null);

  /* NOTE: Это поверхность, управляемая через ref, а не через состояние: первый pointermove может произойти до того, как изменения состояния успеют примениться, и устаревшее значение null приводит к тому, что жест перестаёт работать */
  const dragStart = useRef<IDragStart | null>(null);

  const openWith = (loadedRatio: number): ICropWindow => {
    const opening = centredCrop(ratio, loadedRatio);
    setMediaRatio(loadedRatio);
    setCrop(opening);
    return opening;
  };

  const beginDrag =
    (corner: TCropCorner | null) =>
    (event: PointerEvent<HTMLElement>): void => {
      event.stopPropagation();
      event.currentTarget.setPointerCapture(event.pointerId);
      dragStart.current = {
        corner,
        pointerX: event.clientX,
        pointerY: event.clientY,
        crop,
      };
    };

  const onPointerMove = (event: PointerEvent<HTMLElement>): void => {
    const media = mediaRef.current;
    const drag = dragStart.current;
    const start = drag?.crop;
    if (!drag || !start || !media || mediaRatio === null) return;

    const dx = ((event.clientX - drag.pointerX) / media.offsetWidth) * 100;
    const dy = ((event.clientY - drag.pointerY) / media.offsetHeight) * 100;

    if (drag.corner === null) {
      setCrop({
        ...start,
        x: clamp(start.x + dx, 0, 100 - start.width),
        y: clamp(start.y + dy, 0, 100 - start.height),
      });
      return;
    }

    /* NOTE: все углы остаются на месте, и только перемещаемый угол меняет размер. */
    const isWest = drag.corner.endsWith("w");
    const isNorth = drag.corner.startsWith("n");
    const anchorX = isWest ? start.x + start.width : start.x;
    const anchorY = isNorth ? start.y + start.height : start.y;

    const roomX = isWest ? anchorX : 100 - anchorX;
    const roomY = isNorth ? anchorY : 100 - anchorY;
    const maxWidth = Math.min(roomX, (roomY * ratio) / mediaRatio);

    const width = clamp(
      isWest ? start.width - dx : start.width + dx,
      Math.min(MIN_WIDTH_PCT, maxWidth),
      maxWidth,
    );
    const height = heightFor(width, ratio, mediaRatio);

    setCrop({
      x: isWest ? anchorX - width : anchorX,
      y: isNorth ? anchorY - height : anchorY,
      width,
      height,
    });
  };

  const onPointerUp = (): void => {
    const start = dragStart.current;
    if (start && crop && start.crop !== crop) onSettle?.(crop);
    dragStart.current = null;
  };

  return {
    crop,
    mediaRatio,
    openWith,
    windowProps: {
      onPointerDown: beginDrag(null),
      onPointerMove,
      onPointerUp,
    },
    cornerProps: (corner: TCropCorner) => ({
      onPointerDown: beginDrag(corner),
      onPointerMove,
      onPointerUp,
    }),
  };
};
