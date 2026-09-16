import { type PointerEvent, type RefObject, useRef, useState } from "react";

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
) => {
  const [mediaRatio, setMediaRatio] = useState<number | null>(null);
  const [crop, setCrop] = useState<ICropWindow | null>(null);

  /* NOTE: Это поверхность, управляемая через ref, а не через состояние: первый pointermove может произойти до того, как изменения состояния успеют примениться, и устаревшее значение null приводит к тому, что жест перестаёт работать */
  const dragStart = useRef<IDragStart | null>(null);

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

  const onPointerMove = (event: PointerEvent<HTMLElement>): void => {
    const media = mediaRef.current;
    const drag = dragStart.current;
    const start = drag?.crop;
    if (!drag || !start || !media) return;

    const dx = ((event.clientX - drag.pointerX) / media.offsetWidth) * 100;
    const dy = ((event.clientY - drag.pointerY) / media.offsetHeight) * 100;

    setCrop({
      ...start,
      x: clamp(start.x + dx, 0, 100 - start.width),
      y: clamp(start.y + dy, 0, 100 - start.height),
    });
  };

  const onPointerUp = (): void => {
    dragStart.current = null;
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
  };
};
