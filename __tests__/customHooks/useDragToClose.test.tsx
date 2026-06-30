import { fireEvent, render, screen } from "@testing-library/react";
import { BottomSheet } from "~baseComponents";

describe("useDragToClose", () => {
  beforeAll(() => {
    /* Note: jsdom не реализует PointerEvent; подменяем его через MouseEvent,
        чтобы clientY/pointerId доходили до обработчиков. Захват указателя — заглушка без эффекта. */
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

  const renderSheet = (setIsOpen = jest.fn()) => {
    render(
      <BottomSheet variant="small" title="Sheet Title" setIsOpen={setIsOpen}>
        <p>BottomSheet content</p>
      </BottomSheet>,
    );

    return {
      setIsOpen,
      grabber: screen.getByTestId("BottomSheet_GRABBER"),
      sheet: screen.getByTestId("BottomSheet_WRAPPER"),
    };
  };

  //Note: Должен закрыть окно если потянуть за грабер больше пикселей трешхолда
  it("(1) Should dismiss when dragged down past the threshold", () => {
    const { setIsOpen, grabber } = renderSheet();

    fireEvent.pointerDown(grabber, { clientY: 0, pointerId: 1 });
    fireEvent.pointerMove(grabber, { clientY: 80 });
    fireEvent.pointerUp(grabber, { clientY: 120 });

    expect(setIsOpen).toHaveBeenCalledWith(false);
  });

  //Note: должен двигать окно при нажатии и свайпе пальца, и вернуться назад если свайп был меньше трешхолда
  it("(2) Should follow the finger and snap back when below the threshold", () => {
    const { setIsOpen, grabber, sheet } = renderSheet();

    fireEvent.pointerDown(grabber, { clientY: 0, pointerId: 1 });

    // Note: Следует за движением вниз один к одному, без анимации.
    fireEvent.pointerMove(grabber, { clientY: 40 });
    expect(sheet.style.transform).toBe("translateY(40px)");
    expect(sheet.style.transition).toBe("none");

    // Note: Ниже трешхолда при отпускании -> анимированный возврат к 0.
    fireEvent.pointerUp(grabber, { clientY: 40 });
    expect(sheet.style.transform).toBe("translateY(0px)");
    expect(sheet.style.transition).toBe("transform 200ms ease-out");
    expect(setIsOpen).not.toHaveBeenCalled();
  });

  //Note: окно не должно тянуться наверх
  it("(3) Should clamp upward drags to zero", () => {
    const { grabber, sheet } = renderSheet();

    fireEvent.pointerDown(grabber, { clientY: 100, pointerId: 1 });
    fireEvent.pointerMove(grabber, { clientY: 40 });

    expect(sheet.style.transform).toBe("translateY(0px)");
  });

  //Note: должен игнорировать какие-либо действия при свайпе если палец не убрали с "грабера"
  it("(4) Should ignore move and up events without a preceding pointer down", () => {
    const { setIsOpen, grabber, sheet } = renderSheet();

    fireEvent.pointerMove(grabber, { clientY: 50 });
    fireEvent.pointerUp(grabber, { clientY: 200 });

    expect(sheet.style.transform).toBe("");
    expect(setIsOpen).not.toHaveBeenCalled();
  });
});
