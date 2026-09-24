import { fireEvent, render, screen } from "@testing-library/react";

import { Pagination } from "~baseComponents";

describe("Pagination", () => {
  it("(1) Should render actions and change page ignoring dots", () => {
    const setPage = jest.fn();
    render(
      <Pagination
        itemsPerPage={5}
        totalItems={50}
        currentPage={1}
        setPage={setPage}
        actions={<span>Actions</span>}
      />,
    );

    fireEvent.click(screen.getByText("..."));
    fireEvent.click(screen.getByText("2"));

    expect(screen.getByText("Actions")).toBeInTheDocument();
    expect(setPage).toHaveBeenCalledTimes(1);
    expect(setPage).toHaveBeenCalledWith(2);
  });
});
