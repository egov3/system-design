import { SettingsOutlineIcon } from "@egov3/graphics/Additional/SettingsOutline";
import { render, screen } from "@testing-library/react";
import { Button } from "~baseComponents";

describe("Button", () => {
  const getButton = () => screen.getByTestId("Button_MAIN");
  it("(1) Should render rounded button", () => {
    render(<Button isRounded>Click me</Button>);
    expect(getButton()).toHaveClass("btn-rounded--medium");
  });

  it("(2) Should render square button", () => {
    render(<Button>Click me</Button>);
    expect(getButton()).toHaveClass("btn-square--medium");
  });

  it("(3) Should render disabled button", () => {
    render(<Button disabled>Click me</Button>);
    expect(getButton()).toHaveClass("btn-default--disabled");
  });

  it("(4) Should apply icon styles when isIcon is true", () => {
    render(
      <Button isIcon>
        <SettingsOutlineIcon fill="#fff" />
      </Button>,
    );
    expect(getButton()).toHaveClass("btn--medium--icon");
  });
});
