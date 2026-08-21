import { fireEvent, render, screen } from "@testing-library/react";
import { PhotoCutter } from "~baseComponents";

const MEDIA = { offsetWidth: 234, offsetHeight: 300 };
const PHOTO = { naturalWidth: 784, naturalHeight: 1004 };
const SIGNATURE_RATIO = 350 / 100;

const stub = (element: HTMLElement, values: Record<string, number>): void => {
  for (const [name, value] of Object.entries(values)) {
    Object.defineProperty(element, name, { value, configurable: true });
  }
};

const renderCutter = (ratio: number) => {
  render(<PhotoCutter src="photo.png" ratio={ratio} />);
  const image = screen.getByTestId("PhotoCutter_IMAGE");
  stub(image, PHOTO);
  fireEvent.load(image);
  stub(screen.getByTestId("PhotoCutter_MEDIA"), MEDIA);
  return screen.getByTestId("PhotoCutter_FRAME");
};

const boxOf = (frame: HTMLElement) => ({
  x: Number.parseFloat(frame.style.left),
  y: Number.parseFloat(frame.style.top),
  width: Number.parseFloat(frame.style.width),
  height: Number.parseFloat(frame.style.height),
});

const pixelRatio = (frame: HTMLElement): number => {
  const box = boxOf(frame);
  return (
    (box.width * MEDIA.offsetWidth) /
    100 /
    ((box.height * MEDIA.offsetHeight) / 100)
  );
};

describe("useCropWindow", () => {
  beforeAll(() => {
    if (globalThis.PointerEvent === undefined) {
      class PointerEventPolyfill extends MouseEvent {
        pointerId: number;
        constructor(type: string, params: PointerEventInit = {}) {
          super(type, params);
          this.pointerId = params.pointerId ?? 0;
        }
      }
      globalThis.PointerEvent =
        PointerEventPolyfill as unknown as typeof PointerEvent;
    }
    Element.prototype.setPointerCapture = jest.fn();
  });

  it("(1) Should open with the largest centred window at the given ratio", () => {
    const frame = renderCutter(SIGNATURE_RATIO);
    const box = boxOf(frame);

    expect(box.width).toBeCloseTo(100);
    expect(box.x).toBeCloseTo(0);
    expect(box.y).toBeCloseTo((100 - box.height) / 2);
    expect(pixelRatio(frame)).toBeCloseTo(SIGNATURE_RATIO, 2);
  });

  it("(2) Should move the window with the pointer and keep its size", () => {
    const frame = renderCutter(SIGNATURE_RATIO);
    const before = boxOf(frame);

    fireEvent.pointerDown(frame, { clientX: 0, clientY: 0, pointerId: 1 });
    fireEvent.pointerMove(frame, { clientX: 0, clientY: 30 });
    const after = boxOf(frame);

    expect(after.y - before.y).toBeCloseTo((30 / MEDIA.offsetHeight) * 100);
    expect(after.width).toBeCloseTo(before.width);
    expect(after.height).toBeCloseTo(before.height);
  });

  it("(3) Should keep the window inside the photo while moving", () => {
    const frame = renderCutter(SIGNATURE_RATIO);

    fireEvent.pointerDown(frame, { clientX: 0, clientY: 0, pointerId: 1 });
    fireEvent.pointerMove(frame, { clientX: -9999, clientY: -9999 });
    expect(boxOf(frame).x).toBeCloseTo(0);
    expect(boxOf(frame).y).toBeCloseTo(0);

    fireEvent.pointerMove(frame, { clientX: 9999, clientY: 9999 });
    const box = boxOf(frame);
    expect(box.x + box.width).toBeCloseTo(100);
    expect(box.y + box.height).toBeCloseTo(100);
  });

  it("(4) Should resize from a corner and hold the ratio", () => {
    const frame = renderCutter(SIGNATURE_RATIO);
    const before = boxOf(frame);
    const corner = screen.getByTestId("PhotoCutter_CORNER_se");

    fireEvent.pointerDown(corner, { clientX: 0, clientY: 0, pointerId: 1 });
    fireEvent.pointerMove(corner, { clientX: -60, clientY: 0 });
    const after = boxOf(frame);

    expect(after.width).toBeLessThan(before.width);
    expect(after.height).toBeLessThan(before.height);
    expect(pixelRatio(frame)).toBeCloseTo(SIGNATURE_RATIO, 2);
  });

  it("(5) Should anchor the opposite corner while resizing", () => {
    const frame = renderCutter(SIGNATURE_RATIO);
    const before = boxOf(frame);
    const corner = screen.getByTestId("PhotoCutter_CORNER_se");

    fireEvent.pointerDown(corner, { clientX: 0, clientY: 0, pointerId: 1 });
    fireEvent.pointerMove(corner, { clientX: -60, clientY: 0 });
    const after = boxOf(frame);

    expect(after.x).toBeCloseTo(before.x);
    expect(after.y).toBeCloseTo(before.y);
  });

  it("(6) Should resize from the opposite corner in the other direction", () => {
    const frame = renderCutter(SIGNATURE_RATIO);
    const before = boxOf(frame);
    const corner = screen.getByTestId("PhotoCutter_CORNER_nw");

    fireEvent.pointerDown(corner, { clientX: 0, clientY: 0, pointerId: 1 });
    fireEvent.pointerMove(corner, { clientX: 60, clientY: 0 });
    const after = boxOf(frame);

    expect(after.width).toBeLessThan(before.width);
    expect(after.x + after.width).toBeCloseTo(before.x + before.width);
    expect(after.y + after.height).toBeCloseTo(before.y + before.height);
    expect(pixelRatio(frame)).toBeCloseTo(SIGNATURE_RATIO, 2);
  });

  it("(7) Should not grow a resize past the edge of the photo", () => {
    const frame = renderCutter(SIGNATURE_RATIO);
    const corner = screen.getByTestId("PhotoCutter_CORNER_se");

    fireEvent.pointerDown(corner, { clientX: 0, clientY: 0, pointerId: 1 });
    fireEvent.pointerMove(corner, { clientX: 9999, clientY: 9999 });
    const box = boxOf(frame);

    expect(box.x + box.width).toBeLessThanOrEqual(100.01);
    expect(box.y + box.height).toBeLessThanOrEqual(100.01);
    expect(pixelRatio(frame)).toBeCloseTo(SIGNATURE_RATIO, 2);
  });

  it("(8) Should stop tracking once the pointer is released", () => {
    const frame = renderCutter(SIGNATURE_RATIO);

    fireEvent.pointerDown(frame, { clientX: 0, clientY: 0, pointerId: 1 });
    fireEvent.pointerMove(frame, { clientX: 0, clientY: 20 });
    const afterDrag = boxOf(frame);
    fireEvent.pointerUp(frame, { clientX: 0, clientY: 20 });
    fireEvent.pointerMove(frame, { clientX: 0, clientY: 90 });

    expect(boxOf(frame)).toEqual(afterDrag);
  });

  it("(9) Should re-centre the window when the ratio changes", () => {
    render(<PhotoCutter src="photo.png" ratio={SIGNATURE_RATIO} />);
    const image = screen.getByTestId("PhotoCutter_IMAGE");
    stub(image, PHOTO);
    fireEvent.load(image);
    stub(screen.getByTestId("PhotoCutter_MEDIA"), MEDIA);

    const wide = boxOf(screen.getByTestId("PhotoCutter_FRAME"));
    expect(wide.width).toBeCloseTo(100);
    expect(wide.height).toBeLessThan(50);
  });
});
