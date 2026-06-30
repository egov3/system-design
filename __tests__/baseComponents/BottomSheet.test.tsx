import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useState } from "react";
import { BottomSheet } from "~baseComponents";

describe("BottomSheet", () => {
  it("(1) Should render BottomSheet in small variant", () => {
    render(
      <BottomSheet variant="small" title="Sheet Title" setIsOpen={jest.fn()}>
        <p>BottomSheet content</p>
      </BottomSheet>,
    );

    expect(screen.getByTestId("BottomSheet_WRAPPER")).toHaveClass(
      "smallVariant",
    );
  });

  it("(2) Should render BottomSheet in large variant", () => {
    render(
      <BottomSheet variant="large" title="Sheet Title" setIsOpen={jest.fn()}>
        <p>Large sheet</p>
      </BottomSheet>,
    );

    expect(screen.getByTestId("BottomSheet_WRAPPER")).toHaveClass(
      "largeVariant",
    );
  });

  it("(3) Should render inside overlay with grabber, header and body", () => {
    render(
      <BottomSheet variant="small" title="Sheet Title" setIsOpen={jest.fn()}>
        <p>BottomSheet content</p>
      </BottomSheet>,
    );

    expect(screen.getByTestId("Overlay_WRAP")).toBeInTheDocument();
    expect(screen.getByTestId("BottomSheet_GRABBER")).toBeInTheDocument();
    expect(screen.getByTestId("BottomSheet_HEADER")).toBeInTheDocument();
    expect(screen.getByTestId("BottomSheet_BODY")).toBeInTheDocument();
    expect(screen.getByText("BottomSheet content")).toBeInTheDocument();
    expect(screen.getByTestId("BottomSheet_TITLE")).toHaveTextContent(
      "Sheet Title",
    );
    expect(screen.getByTestId("BottomSheetClose_ICON")).toBeInTheDocument();
  });

  it("(4) Should render arbitrary children inside the body", () => {
    render(
      <BottomSheet variant="small" title="Sheet Title" setIsOpen={jest.fn()}>
        <button type="button" data-testid="Custom_CHILD">
          Action
        </button>
      </BottomSheet>,
    );

    const body = screen.getByTestId("BottomSheet_BODY");
    expect(body).toContainElement(screen.getByTestId("Custom_CHILD"));
  });

  it("(5) Should not be in the document after closing", async () => {
    const Wrapper = () => {
      const [isOpen, setIsOpen] = useState(true);
      return isOpen ? (
        <BottomSheet variant="small" title="Sheet Title" setIsOpen={setIsOpen}>
          <p>BottomSheet content</p>
        </BottomSheet>
      ) : null;
    };

    render(<Wrapper />);

    expect(screen.getByTestId("BottomSheet_WRAPPER")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("BottomSheetHeaderBtn_CLOSE"));

    await waitFor(() => {
      expect(
        screen.queryByTestId("BottomSheet_WRAPPER"),
      ).not.toBeInTheDocument();
    });
  });
});
