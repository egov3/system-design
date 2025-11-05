import { render, screen } from "@testing-library/react";
import { BaseComponents } from "~baseComponents";

describe("Button", () => {
  it("(1) Should render rounded button", () => {
    render(
      <BaseComponents.Button isRounded={true}>Click me</BaseComponents.Button>,
    );
    expect(screen.getByText("Click me")).toHaveClass("btn-rounded--medium");
  });

  it("(2) Should render square button", () => {
    render(<BaseComponents.Button>Click me</BaseComponents.Button>);
    expect(screen.getByText("Click me")).toHaveClass("btn-square--medium");
  });

  it("(3) Should render disabled button", () => {
    render(
      <BaseComponents.Button disabled={true}>Click me</BaseComponents.Button>,
    );
    expect(screen.getByText("Click me")).toHaveClass("btn-default--disabled");
  });
});
