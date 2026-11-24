import { fireEvent, render, screen } from "@testing-library/react";

import { Dialog } from "~baseComponents";

describe("Dialog", () => {
  it("(1) Should render dialog with content and overlay by default", () => {
    render(
      <Dialog lang="ru">
        <p>Dialog content</p>
      </Dialog>,
    );

    expect(screen.getByTestId("Dialog_WRAPPER")).toBeInTheDocument();
    expect(screen.getByTestId("Dialog_BODY")).toHaveTextContent(
      "Dialog content",
    );
    expect(screen.getByTestId("Overlay_WRAP")).toBeInTheDocument();
    expect(screen.queryByTestId("Dialog_HEADER")).toBeNull();
    expect(screen.queryByTestId("Dialog_FOOTER")).toBeNull();
  });

  it("(2) Should render without overlay when isWithOverlay is false", () => {
    render(
      <Dialog lang="ru" isWithOverlay={false}>
        <p>Dialog content</p>
      </Dialog>,
    );

    expect(screen.queryByTestId("Overlay_WRAP")).toBeNull();
    expect(screen.getByTestId("Dialog_WRAPPER")).toBeInTheDocument();
  });

  it("(3) Should render header title, step text and close button", () => {
    render(
      <Dialog
        lang="ru"
        header={{
          stepText: "Раздел 1 из 1",
          title: "Dialog Header",
          isClosable: true,
        }}
      >
        <p>Dialog content</p>
      </Dialog>,
    );

    expect(screen.getByTestId("Dialog_HEADER")).toBeInTheDocument();
    expect(screen.getByTestId("Dialog_STEP")).toHaveTextContent(
      "Раздел 1 из 1",
    );
    expect(screen.getByTestId("Dialog_TITLE")).toHaveTextContent(
      "Dialog Header",
    );
    expect(screen.getByTestId("DialogHeaderBtn_CLOSE")).toBeInTheDocument();
  });

  it("(4) Should call setIsOpen when close button is clicked", () => {
    const mockSetIsOpen = jest.fn();

    render(
      <Dialog
        lang="ru"
        isOpen
        setIsOpen={mockSetIsOpen}
        header={{ title: "Title", isClosable: true }}
      >
        <p>Dialog content</p>
      </Dialog>,
    );

    fireEvent.click(screen.getByTestId("DialogHeaderBtn_CLOSE"));
    expect(mockSetIsOpen).toHaveBeenCalledWith(false);
  });

  it("(5) Should render footer with additional and footerButtons", () => {
    const onAdditional = jest.fn();
    const onSecondary = jest.fn();
    const onMain = jest.fn();

    render(
      <Dialog
        lang="ru"
        additionalButton={{
          text: "Contact Support",
          onClick: onAdditional,
          dataTestid: "Dialog_ADDITIONAL_BTN",
        }}
        footerButtons={[
          {
            text: "Cancel",
            onClick: onSecondary,
            variant: "secondary",
            dataTestid: "Dialog_SECONDARY_BTN",
          },
          {
            text: "Approve",
            onClick: onMain,
            dataTestid: "Dialog_MAIN_BTN",
          },
        ]}
      >
        <p>Dialog content</p>
      </Dialog>,
    );

    expect(screen.getByTestId("Dialog_FOOTER")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("Dialog_ADDITIONAL_BTN"));
    fireEvent.click(screen.getByTestId("Dialog_SECONDARY_BTN"));
    fireEvent.click(screen.getByTestId("Dialog_MAIN_BTN"));

    expect(onAdditional).toHaveBeenCalledTimes(1);
    expect(onSecondary).toHaveBeenCalledTimes(1);
    expect(onMain).toHaveBeenCalledTimes(1);
  });

  it("(6) Should not render footer without any buttons", () => {
    render(
      <Dialog lang="ru">
        <p>Dialog content</p>
      </Dialog>,
    );

    expect(screen.queryByTestId("Dialog_FOOTER")).toBeNull();
  });

  it("(7) Should toggle top and bottom dividers", () => {
    const { rerender } = render(
      <Dialog
        lang="ru"
        header={{ title: "Title" }}
        footerButtons={[{ text: "Approve", onClick: () => {} }]}
      >
        <p>Dialog content</p>
      </Dialog>,
    );

    expect(screen.getByTestId("Dialog_HEADER")).not.toHaveClass(
      "headerDivider",
    );
    expect(screen.getByTestId("Dialog_FOOTER")).not.toHaveClass(
      "footerDivider",
    );

    rerender(
      <Dialog
        lang="ru"
        isDividerTop
        isDividerBottom
        header={{ title: "Title" }}
        footerButtons={[{ text: "Approve", onClick: () => {} }]}
      >
        <p>Dialog content</p>
      </Dialog>,
    );

    expect(screen.getByTestId("Dialog_HEADER")).toHaveClass("headerDivider");
    expect(screen.getByTestId("Dialog_FOOTER")).toHaveClass("footerDivider");
  });
});
