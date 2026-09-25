import { fireEvent, render, screen } from "@testing-library/react";

import { TableFooter } from "~baseComponents";

describe("TableFooter", () => {
  it("(1) Should toggle page size and render selector when open", () => {
    const onTogglePageSize = jest.fn();
    const footer = (isPageSizeOpen: boolean) => (
      <table>
        <TableFooter
          colSpan={1}
          pageSize={5}
          isPageSizeOpen={isPageSizeOpen}
          onTogglePageSize={onTogglePageSize}
          pageSizeSelector={<div>Selector</div>}
          lang="kk"
        />
      </table>
    );
    const { rerender } = render(footer(false));

    expect(screen.queryByText("Selector")).not.toBeInTheDocument();
    fireEvent.click(screen.getByTestId("footerTable_pageSize_BTN"));
    rerender(footer(true));

    expect(onTogglePageSize).toHaveBeenCalledTimes(1);
    expect(screen.getByText("Selector")).toBeInTheDocument();
    expect(screen.getByTestId("TableFooter_TEXT")).toHaveTextContent(
      "Бетте көрсету:",
    );
  });
});
