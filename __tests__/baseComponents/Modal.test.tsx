import { fireEvent, render, screen } from "@testing-library/react";
import { BaseComponents } from "~baseComponents";

const { Modal } = BaseComponents;

describe.skip("Modal", () => {
  it("(1) Should render modal with default props", () => {
    render(
      <Modal variant="small" lang="ru">
        <p>Modal content</p>
      </Modal>,
    );

    expect(screen.getByTestId("Modal_WRAPPER")).toBeInTheDocument();
    expect(screen.getByText("Modal content")).toBeInTheDocument();

    expect(screen.queryByTestId("Modal_HEADER")).toBeNull();
  });

  it("(2) Should render modal with overlay by default", () => {
    render(
      <Modal variant="small" lang="ru">
        <p>Modal content</p>
      </Modal>,
    );

    expect(screen.getByTestId("Overlay_WRAP")).toBeInTheDocument();
  });

  it("(3) Should render modal without overlay when withOverlay is false", () => {
    render(
      <Modal variant="small" lang="ru" withOverlay={false}>
        <p>Modal content</p>
      </Modal>,
    );

    expect(screen.queryByTestId("Overlay_WRAP")).toBeNull();
    expect(screen.getByTestId("Modal_WRAPPER")).toBeInTheDocument();
  });

  it("(4) Should render modal with header and title", () => {
    render(
      <Modal
        variant="large"
        lang="ru"
        header={{
          title: "Modal Title",
          isClosable: true,
        }}
      >
        <p>Modal content</p>
      </Modal>,
    );

    expect(screen.getByTestId("Modal_HEADER")).toBeInTheDocument();
    expect(screen.getByTestId("Modal_TITLE")).toHaveTextContent("Modal Title");
    expect(screen.getByTestId("ModalHeaderBtn_CLOSE")).toBeInTheDocument();
  });

  it("(5) Should render modal with go back button", () => {
    const mockGoBack = jest.fn();

    render(
      <Modal
        variant="large"
        lang="ru"
        header={{
          goBackService: mockGoBack,
          isClosable: true,
        }}
      >
        <p>Modal content</p>
      </Modal>,
    );

    const backButton = screen.getByTestId("IdentityHeaderGoBack_BTN");
    expect(backButton).toBeInTheDocument();

    fireEvent.click(backButton);
    expect(mockGoBack).toHaveBeenCalledTimes(1);
  });

  it("(6) Should render modal with identity main button", () => {
    const mockGoIdentityMain = jest.fn();

    render(
      <Modal
        variant="large"
        lang="ru"
        header={{
          goIdentityMain: mockGoIdentityMain,
          isClosable: true,
        }}
      >
        <p>Modal content</p>
      </Modal>,
    );

    const identityButton = screen.getByTestId("IdentityHeaderGoMain_BTN");
    expect(identityButton).toBeInTheDocument();

    fireEvent.click(identityButton);
    expect(mockGoIdentityMain).toHaveBeenCalledTimes(1);
  });

  it("(7) Should handle close button click", () => {
    const mockSetOpen = jest.fn();
    const isOpen = true;

    render(
      <Modal
        variant="small"
        lang="ru"
        open={isOpen}
        setOpen={mockSetOpen}
        header={{
          isClosable: true,
        }}
      >
        <p>Modal content</p>
      </Modal>,
    );

    expect(screen.getByTestId("ModalClose_ICON")).toBeInTheDocument();
    const closeButton = screen.getByTestId("ModalHeaderBtn_CLOSE");
    expect(closeButton).toBeInTheDocument();

    fireEvent.click(closeButton);
    expect(mockSetOpen).toHaveBeenCalledWith(false);
  });

  it("(8) Should render different variants correctly", () => {
    const { rerender } = render(
      <Modal variant="small" lang="ru">
        <p>Small modal</p>
      </Modal>,
    );

    const wrapper = screen.getByTestId("Modal_WRAPPER");
    expect(wrapper).toHaveClass("smallVariant");

    rerender(
      <Modal variant="large" lang="ru">
        <p>Large modal</p>
      </Modal>,
    );

    expect(wrapper).toHaveClass("largeVariant");
  });

  it("(9) Should render placeholder when not closable", () => {
    render(
      <Modal
        variant="small"
        lang="ru"
        header={{
          isClosable: false,
        }}
      >
        <p>Modal content</p>
      </Modal>,
    );

    expect(screen.getByTestId("IdentityHeaderBtn_CLOSE")).toBeInTheDocument();
  });

  it("(10)Should not do anything when close button is clicked without setOpen ", () => {
    const isOpen = true;

    render(
      <Modal
        variant="small"
        lang="ru"
        open={isOpen}
        header={{
          isClosable: true,
        }}
      >
        <p>Modal content</p>
      </Modal>,
    );

    expect(screen.getByTestId("ModalClose_ICON")).toBeInTheDocument();
    const closeButton = screen.getByTestId("ModalHeaderBtn_CLOSE");

    fireEvent.click(closeButton);
    expect(closeButton).toBeInTheDocument();
  });
});
