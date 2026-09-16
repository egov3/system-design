import { type PointerEvent, type RefObject, useRef, useState } from "react";

export const CROP_CORNERS = ["tl", "tr", "bl", "br"] as const;

export type TCropCorner = (typeof CROP_CORNERS)[number];

/* NOTE: Контейнер медиа — это область отображения фотографии, а не обрезанный прямоугольник; используется то же пространство координат, в котором в итоге передаются данные об обрезке, и оно не зависит от того, что фотография при изменении раскладки может получить другой размер */
export interface ICropWindow {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface IDragStart {
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

const resizeFrom = (
  start: ICropWindow,
  corner: TCropCorner,
  dx: number,
  ratio: number,
  mediaRatio: number,
): ICropWindow => {
  /* NOTE: все углы остаются на месте, и только перемещаемый угол меняет размер. */
  const isLeft = corner.endsWith("l");
  const isTop = corner.startsWith("t");
  const anchorX = isLeft ? start.x + start.width : start.x;
  const anchorY = isTop ? start.y + start.height : start.y;

  const roomX = isLeft ? anchorX : 100 - anchorX;
  const roomY = isTop ? anchorY : 100 - anchorY;
  const maxWidth = Math.min(roomX, (roomY * ratio) / mediaRatio);

  const width = clamp(
    isLeft ? start.width - dx : start.width + dx,
    Math.min(MIN_WIDTH_PCT, maxWidth),
    maxWidth,
  );
  const height = heightFor(width, ratio, mediaRatio);

  return {
    x: isLeft ? anchorX - width : anchorX,
    y: isTop ? anchorY - height : anchorY,
    width,
    height,
  };
};

export const useCropWindow = (
  mediaRef: RefObject<HTMLDivElement | null>,
  ratio: number,
) => {
  const [mediaRatio, setMediaRatio] = useState<number | null>(null);
  const [crop, setCrop] = useState<ICropWindow | null>(null);

  /* NOTE: Это поверхность, управляемая через ref, а не через состояние: первый pointermove может произойти до того, как изменения состояния успеют примениться, и устаревшее значение null приводит к тому, что жест перестаёт работать */
  const dragStart = useRef<IDragStart | null>(null);
  const dragCorner = useRef<TCropCorner | null>(null);

  const openWith = (loadedRatio: number): void => {
    setMediaRatio(loadedRatio);
    setCrop(centredCrop(ratio, loadedRatio));
  };

  /* NOTE: preventDefault не даёт браузеру начать выделение текста, которое перехватывает указатель, и pointerup тогда не приходит */
  const onPointerDown = (event: PointerEvent<HTMLElement>): void => {
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    dragStart.current = {
      pointerX: event.clientX,
      pointerY: event.clientY,
      crop,
    };
  };

  /* NOTE: stopPropagation не даёт нажатию дойти до рамки, иначе её onPointerDown начнёт перемещение вместо изменения размера */
  const onCornerDown =
    (corner: TCropCorner) =>
    (event: PointerEvent<HTMLElement>): void => {
      event.stopPropagation();
      onPointerDown(event);
      dragCorner.current = corner;
    };

  const onPointerMove = (event: PointerEvent<HTMLElement>): void => {
    const media = mediaRef.current;
    const drag = dragStart.current;
    const start = drag?.crop;
    if (!drag || !start || !media) return;

    const dx = ((event.clientX - drag.pointerX) / media.offsetWidth) * 100;
    const dy = ((event.clientY - drag.pointerY) / media.offsetHeight) * 100;

    const corner = dragCorner.current;
    if (corner !== null && mediaRatio !== null) {
      setCrop(resizeFrom(start, corner, dx, ratio, mediaRatio));
      return;
    }

    setCrop({
      ...start,
      x: clamp(start.x + dx, 0, 100 - start.width),
      y: clamp(start.y + dy, 0, 100 - start.height),
    });
  };

  const onPointerUp = (): void => {
    dragStart.current = null;
    dragCorner.current = null;
  };

  return {
    crop,
    mediaRatio,
    openWith,
    windowProps: {
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onLostPointerCapture: onPointerUp,
    },
    cornerProps: (corner: TCropCorner) => ({
      onPointerDown: onCornerDown(corner),
      onPointerMove,
      onPointerUp,
      onLostPointerCapture: onPointerUp,
    }),
  };
};
