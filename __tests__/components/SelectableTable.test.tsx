import { fireEvent, render, screen } from "@testing-library/react";

import { SelectableTable } from "~components";
import {
  SELECTABLE_TABLE_LESSON_COLUMNS,
  SELECTABLE_TABLE_LESSON_ROWS,
} from "~constants/mock/SelectableTable";

describe("SelectableTable", () => {
  it("(1) Should render the passed columns, name the radio by the first column and select a row", () => {
    const onSelect = jest.fn();
    render(
      <SelectableTable
        columns={SELECTABLE_TABLE_LESSON_COLUMNS}
        rows={[
          ...SELECTABLE_TABLE_LESSON_ROWS,
          { id: "79", values: { organization: null } },
        ]}
        selectedId={SELECTABLE_TABLE_LESSON_ROWS[0].id}
        onSelect={onSelect}
      />,
    );

    const headCells = screen.getAllByTestId("TableHead_HEADER");
    expect(headCells).toHaveLength(5);
    expect(headCells[2]).toHaveStyle({ width: "93px" });

    const [firstRadio, secondRadio] = screen.getAllByRole("radio");
    expect(firstRadio).toBeChecked();
    expect(
      screen.getByRole("radio", { name: "Колледж сервиса и технологий" }),
    ).toBe(secondRadio);
    expect(screen.getByRole("radio", { name: "-" })).not.toBeChecked();

    fireEvent.click(secondRadio);

    expect(onSelect).toHaveBeenCalledWith(SELECTABLE_TABLE_LESSON_ROWS[1].id);
  });
});
