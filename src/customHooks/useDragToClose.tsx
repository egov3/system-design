import {
  type Dispatch,
  type PointerEvent,
  type RefObject,
  type SetStateAction,
  useRef,
} from "react";

/* Note: Larger-than-typical dismiss threshold (~100px vs the usual 50-80px) to avoid
 accidental closes for elderly users who drag slowly and imprecisely */
const DISMISS_THRESHOLD_PX = 100;
const SNAP_BACK_TRANSITION = "transform 200ms ease-out";

interface IDragToClose {
  grabberProps: {
    onPointerDown: (event: PointerEvent<HTMLDivElement>) => void;
    onPointerMove: (event: PointerEvent<HTMLDivElement>) => void;
    onPointerUp: (event: PointerEvent<HTMLDivElement>) => void;
    style: { touchAction: "none" };
  };
  sheetRef: RefObject<HTMLDivElement | null>;
}

/* Note Drag the grabber to translate the sheet 1:1 with the finger; on release,
  dismiss past the threshold or snap back.*/
export const useDragToClose = (
  setIsOpen: Dispatch<SetStateAction<boolean>>,
): IDragToClose => {
  const sheetRef = useRef<HTMLDivElement>(null);
  const dragStartY = useRef<number | null>(null);

  const setOffset = (px: number, animate: boolean): void => {
    const sheet = sheetRef.current;
    if (!sheet) return;
    // Note: No transition during drag for 1:1 finger tracking; animate on snap-back.
    sheet.style.transition = animate ? SNAP_BACK_TRANSITION : "none";
    sheet.style.transform = `translateY(${px}px)`;
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>): void => {
    dragStartY.current = event.clientY;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>): void => {
    if (dragStartY.current === null) return;
    // Note: Only follow downward drags; clamp upward pulls to 0.
    setOffset(Math.max(0, event.clientY - dragStartY.current), false);
  };

  const onPointerUp = (event: PointerEvent<HTMLDivElement>): void => {
    if (dragStartY.current === null) return;
    const draggedDown = event.clientY - dragStartY.current;
    dragStartY.current = null;
    if (draggedDown >= DISMISS_THRESHOLD_PX) {
      setIsOpen(false);
      return;
    }
    setOffset(0, true);
  };

  return {
    grabberProps: {
      onPointerDown,
      onPointerMove,
      onPointerUp,
      // Note: required to prevents the browser from interpreting the drag as a scroll.
      style: { touchAction: "none" },
    },
    sheetRef,
  };
};
