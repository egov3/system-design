import { fireEvent, render, screen } from "@testing-library/react";
import { BottomSheet } from "~baseComponents";

describe("BottomSheet", () => {
  it("(1) Should render BottomSheet with content, title and close it", () => {
    const mockSetOpen = jest.fn();

    render(
      <BottomSheet variant="small" title="Sheet Title" setIsOpen={mockSetOpen}>
        <p>BottomSheet content</p>
      </BottomSheet>,
    );

    expect(screen.getByTestId("BottomSheet_WRAPPER")).toHaveClass(
      "smallVariant",
    );
    expect(screen.getByText("BottomSheet content")).toBeInTheDocument();
    expect(screen.getByTestId("BottomSheet_TITLE")).toHaveTextContent(
      "Sheet Title",
    );

    fireEvent.click(screen.getByTestId("BottomSheetHeaderBtn_CLOSE"));
    expect(mockSetOpen).toHaveBeenCalledWith(false);
  });

  it("(2) Should render large variant", () => {
    render(
      <BottomSheet variant="large" title="Sheet Title" setIsOpen={jest.fn()}>
        <p>Large sheet</p>
      </BottomSheet>,
    );

    expect(screen.getByTestId("BottomSheet_WRAPPER")).toHaveClass(
      "largeVariant",
    );
  });
});
