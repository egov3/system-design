import { render, screen } from "@testing-library/react";

import { Table, TableHead, TableHeadCell } from "~baseComponents";

describe("Table", () => {
  it("(1) Should render head cells with and without ellipsis", () => {
    render(
      <Table>
        <TableHead>
          <TableHeadCell>Organization</TableHeadCell>
          <TableHeadCell isNoEllipsis>Diagnosis</TableHeadCell>
        </TableHead>
      </Table>,
    );

    const [headCell, wrappedHeadCell] = screen.getAllByTestId("TableHead_CELL");
    expect(headCell).toHaveClass("headCell");
    expect(wrappedHeadCell).toHaveClass("headCellNoEllipsis");
  });
});
