import { fireEvent, render, screen } from "@testing-library/react";

import { ContentHeader } from "~components";
import { i18n } from "~constants/i18n";

describe("ContentHeader", () => {
  it("(1) Should update content text and show notification on button click", async () => {
    const title = "Test Title";
    render(
      <ContentHeader
        lang="kk"
        title={title}
        handleUpdateData={() => {}}
        updatedText={`${i18n.ContentHeader.updated.kk} ${new Date().toLocaleDateString()}`}
      />,
    );

    const button = screen.getByTestId("ContentHeader_BUTTON");
    fireEvent.click(button);

    const updatedText = await screen.findByTestId("ContentHeader_UPDATE");
    expect(updatedText).toHaveTextContent(/Обновлено|Жаңартылды/);
  });
});
