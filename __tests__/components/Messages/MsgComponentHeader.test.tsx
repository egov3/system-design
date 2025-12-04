import { fireEvent, render, screen } from "@testing-library/react";
import { Components } from "~components";

describe("MsgComponentHeader", () => {
  const mockHandleOpenSearch = jest.fn();
  const mockHandleReadAll = jest.fn();

  it("(1) Should call handleOpenSearch when search button is clicked", () => {
    render(
      <Components.MsgComponentHeader
        lang="ru"
        headerText="Заявки по услугам"
        headerAriaLabel="Заявки по услугам"
        handleOpenSearch={mockHandleOpenSearch}
        handleReadAll={mockHandleReadAll}
      />,
    );

    const searchButton = screen.getByTestId("MsgHelpNotification_SEARCH");
    fireEvent.click(searchButton);

    expect(mockHandleOpenSearch).toHaveBeenCalledTimes(1);
  });

  it("(2) Should call handleReadAll when read all button is clicked", () => {
    render(
      <Components.MsgComponentHeader
        lang="ru"
        headerText="Заявки по услугам"
        headerAriaLabel="Заявки по услугам"
        handleOpenSearch={mockHandleOpenSearch}
        handleReadAll={mockHandleReadAll}
      />,
    );

    const readAllButton = screen.getByTestId("MsgHelpNotification_CHECK");
    fireEvent.click(readAllButton);

    expect(mockHandleReadAll).toHaveBeenCalledTimes(1);
  });
});
