import { SettingsOutlineIcon } from "@egov3/graphics/Additional/SettingsOutline";
import { fireEvent, render, screen } from "@testing-library/react";

import { DropDownMenu } from "~baseComponents";

const firstAction = jest.fn();
const disabledAction = jest.fn();

const items = [
  {
    icon: <SettingsOutlineIcon />,
    text: "Default",
    action: firstAction,
  },
  {
    icon: <SettingsOutlineIcon />,
    text: "Disabled",
    action: disabledAction,
    disabled: true,
  },
];

describe("DropDownMenu", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("(1) Should render the provided items and call an action", () => {
    render(<DropDownMenu items={items} />);

    fireEvent.click(screen.getByRole("menuitem", { name: "Default" }));

    expect(firstAction).toHaveBeenCalledTimes(1);
    expect(screen.getAllByTestId("SettingsOutlineIcon")).toHaveLength(2);
  });

  it("(2) Should disable an item and not call its action", () => {
    render(<DropDownMenu items={items} />);

    const disabledItem = screen.getByRole("menuitem", { name: "Disabled" });
    fireEvent.click(disabledItem);

    expect(disabledItem).toBeDisabled();
    expect(disabledAction).not.toHaveBeenCalled();
  });
});
