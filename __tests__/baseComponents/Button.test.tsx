import { Icons } from "@egov3/graphics";
import { render, screen } from "@testing-library/react";
import { BaseComponents } from "~baseComponents";

describe("Button", () => {
  const getButton = () => screen.getByTestId("Button_MAIN");
  it("(1) Should render rounded button", () => {
    render(<BaseComponents.Button isRounded>Click me</BaseComponents.Button>);
    expect(getButton()).toHaveClass("btn-rounded--medium");
  });

  it("(2) Should render square button", () => {
    render(<BaseComponents.Button>Click me</BaseComponents.Button>);
    expect(getButton()).toHaveClass("btn-square--medium");
  });

  it("(3) Should render disabled button", () => {
    render(<BaseComponents.Button disabled>Click me</BaseComponents.Button>);
    expect(getButton()).toHaveClass("btn-default--disabled");
  });

  it("(4) Should apply icon styles when isIcon is true", () => {
    render(
      <BaseComponents.Button isIcon>
        <Icons.Additional.SettingsOutline fill="#fff" />
      </BaseComponents.Button>,
    );
    expect(getButton()).toHaveClass("btn--medium--icon");
  });
});
