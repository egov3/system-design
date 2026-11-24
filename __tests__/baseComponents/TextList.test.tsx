import { render, screen } from "@testing-library/react";

import { textListItems } from "__tests__/Mock/textListItems";
import { TextList } from "~baseComponents";

describe("TextList", () => {
  it("(1) Should render every item text in order", () => {
    render(<TextList items={textListItems} />);

    expect(
      screen.getAllByTestId("TextList_ITEM").map((item) => item.textContent),
    ).toEqual(textListItems.map(({ text }) => text));
  });
});
