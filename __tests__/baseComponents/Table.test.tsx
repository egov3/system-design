import { render, screen } from "@testing-library/react";

import {
  Table,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "~baseComponents";

describe("Table", () => {
  it("(1) Should render cells with and without ellipsis", () => {
    render(
      <Table>
        <TableHead>
          <TableHeadCell>Organization</TableHeadCell>
          <TableHeadCell isNoEllipsis>Diagnosis</TableHeadCell>
        </TableHead>
        <tbody>
          <TableRow>
            <TableCell>Hospital</TableCell>
            <TableCell isNoEllipsis>Tonsillitis</TableCell>
          </TableRow>
        </tbody>
      </Table>,
    );

    const [headCell, wrappedHeadCell] = screen.getAllByTestId("TableHead_CELL");
    const [cell, wrappedCell] = screen.getAllByTestId("TableData_CELL");
    expect(headCell).toHaveClass("headCell");
    expect(wrappedHeadCell).toHaveClass("headCellNoEllipsis");
    expect(cell).toHaveClass("bodyCell");
    expect(wrappedCell).toHaveClass("bodyCellNoEllipsis");
  });
});
