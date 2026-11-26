import { fireEvent, render, screen } from "@testing-library/react";

import { ContentHeader } from "~components";

describe("ContentHeader", () => {
  it("(1) Should render update text and call update handler on button click", () => {
    const title = "Test Title";
    const updatedText = "Жаңартылды 25.11.2026";
    const handleUpdateData = jest.fn();

    render(
      <ContentHeader
        lang="kk"
        title={title}
        handleUpdateData={handleUpdateData}
        updatedText={updatedText}
      />,
    );

    const button = screen.getByRole("button", { name: "Жаңарту" });
    fireEvent.click(button);

    expect(screen.getByTestId("ContentHeader_UPDATE")).toHaveTextContent(
      updatedText,
    );
    expect(handleUpdateData).toHaveBeenCalledTimes(1);
  });
});
