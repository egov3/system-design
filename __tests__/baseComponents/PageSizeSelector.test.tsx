import { fireEvent, render, screen } from "@testing-library/react";

import { PageSizeSelector } from "~baseComponents";

describe("PageSizeSelector", () => {
  it("(1) Should mark the selected size and select a new one", () => {
    const setPageSize = jest.fn();
    const setIsOpenPageSize = jest.fn();
    render(
      <PageSizeSelector
        pageSize={10}
        setPageSize={setPageSize}
        setIsOpenPageSize={setIsOpenPageSize}
      />,
    );

    fireEvent.click(screen.getByText("20"));

    expect(screen.getAllByTestId("PageSizeSelectorIcon_CHECK")).toHaveLength(1);
    expect(setPageSize).toHaveBeenCalledWith(20);
    expect(setIsOpenPageSize).toHaveBeenCalledWith(false);
  });
});
