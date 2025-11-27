import { render, screen } from "@testing-library/react";
import type { ComponentType, SVGProps } from "react";
import { Components } from "~components";

const { IconToggleItem } = Components;

const MockIcon: ComponentType<SVGProps<SVGSVGElement>> = (props) => (
  <svg data-testid="mock-icon" {...props}>
    <title>Mock Icon</title>
  </svg>
);

describe("IconToggleItem", () => {
  const defaultProps = {
    Icon: MockIcon,
    text: "Kaspi Bank",
    lock: false,
    unlock: jest.fn(),
  };

  it("(1) Should render with different text", () => {
    const customText = "Halyk Bank";
    render(<IconToggleItem {...defaultProps} text={customText} />);

    expect(screen.getByTestId("IconToggleItem_TEXT")).toHaveTextContent(
      customText,
    );
  });

  it("(2) Should render RadioToggle component", () => {
    render(<IconToggleItem {...defaultProps} />);
    expect(screen.getByTestId("IconToggleItem")).toBeInTheDocument();
  });

  it("(3) Should have correct CSS classes", () => {
    render(<IconToggleItem {...defaultProps} />);

    const wrapper = screen.getByTestId("IconToggleItem");
    expect(wrapper).toHaveClass("wrap");

    const textElement = screen.getByTestId("IconToggleItem_TEXT");
    expect(textElement).toHaveClass("text");
  });

  it("(5) Should render multiple items correctly", () => {
    const props1 = {
      Icon: MockIcon,
      text: "Kaspi Bank",
      lock: false,
      unlock: jest.fn(),
    };

    const props2 = {
      Icon: MockIcon,
      text: "Halyk Bank",
      lock: true,
      unlock: jest.fn(),
    };

    render(
      <div>
        <IconToggleItem {...props1} />
        <IconToggleItem {...props2} />
      </div>,
    );

    expect(screen.getAllByTestId("IconToggleItem")).toHaveLength(2);
    expect(screen.getAllByTestId("IconToggleItem_ICON")).toHaveLength(2);
    expect(screen.getAllByTestId("IconToggleItem_TEXT")).toHaveLength(2);

    expect(screen.getByText("Kaspi Bank")).toBeInTheDocument();
    expect(screen.getByText("Halyk Bank")).toBeInTheDocument();
  });
});
