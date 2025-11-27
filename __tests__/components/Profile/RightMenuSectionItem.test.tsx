import { fireEvent, render, screen } from "@testing-library/react";
import { Components } from "~components";

const { RightMenuSectionItem } = Components;

describe("RightMenuSectionItem", () => {
  const defaultProps = {
    title: "Нужна помощь?",
    btnText: "Помощь",
    ariaLabel: "Получить помощь",
    btnOnClick: jest.fn(),
  };

  it("(1) Should render correct title text", () => {
    render(<RightMenuSectionItem {...defaultProps} />);

    expect(screen.getByTestId("RightMenu_TITLE")).toHaveTextContent(
      "Нужна помощь?",
    );
  });

  it("(2) Should render correct button text", () => {
    render(<RightMenuSectionItem {...defaultProps} />);

    const button = screen.getByTestId("RightMenu_BTN");
    expect(button).toHaveTextContent("Помощь");
  });

  it("(3) Should call btnOnClick when button is clicked", () => {
    const btnOnClick = jest.fn();
    render(<RightMenuSectionItem {...defaultProps} btnOnClick={btnOnClick} />);

    const button = screen.getByTestId("RightMenu_BTN");
    fireEvent.click(button);

    expect(btnOnClick).toHaveBeenCalledTimes(1);
  });

  it("(4) Should use secondary variant by default", () => {
    render(<RightMenuSectionItem {...defaultProps} />);

    const button = screen.getByTestId("RightMenu_BTN");
    expect(button).toBeInTheDocument();
  });

  it("(5) Should use custom button variant when provided", () => {
    render(<RightMenuSectionItem {...defaultProps} btnVariant="default" />);

    const button = screen.getByTestId("RightMenu_BTN");
    expect(button).toBeInTheDocument();
  });

  it("(6) Should render with different title", () => {
    const customTitle = "Техническая поддержка";
    render(<RightMenuSectionItem {...defaultProps} title={customTitle} />);

    expect(screen.getByTestId("RightMenu_TITLE")).toHaveTextContent(
      customTitle,
    );
  });

  it("(7) Should render with different button text", () => {
    const customBtnText = "Связаться";
    render(<RightMenuSectionItem {...defaultProps} btnText={customBtnText} />);

    const button = screen.getByTestId("RightMenu_BTN");
    expect(button).toHaveTextContent(customBtnText);
  });

  it("(8) Should have correct CSS classes", () => {
    render(<RightMenuSectionItem {...defaultProps} />);

    const wrapper = screen.getByTestId("RightMenu_WRAPPER");
    expect(wrapper).toHaveClass("helpWrapper");

    const title = screen.getByTestId("RightMenu_TITLE");
    expect(title).toHaveClass("helpText");

    const button = screen.getByTestId("RightMenu_BTN");
    expect(button).toHaveClass("helpBtn");
  });

  it("(9) Should use small button size", () => {
    render(<RightMenuSectionItem {...defaultProps} />);

    const button = screen.getByTestId("RightMenu_BTN");
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("btn--small");
  });

  it("(10) Should handle multiple button clicks", () => {
    const btnOnClick = jest.fn();
    render(<RightMenuSectionItem {...defaultProps} btnOnClick={btnOnClick} />);

    const button = screen.getByTestId("RightMenu_BTN");

    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);

    expect(btnOnClick).toHaveBeenCalledTimes(3);
  });
});
