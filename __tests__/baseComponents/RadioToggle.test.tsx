import { fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";

import { RadioToggle } from "~baseComponents";

const TestWrapper = ({ isDisabled }: { isDisabled?: boolean }) => {
  const [lock, setLock] = useState<boolean>(true);
  return <RadioToggle lock={lock} setLock={setLock} isDisabled={isDisabled} />;
};

describe("RadioToggle", () => {
  it("(1) Should switch lock state if clicked", () => {
    render(<TestWrapper />);

    const wrap = screen.getByTestId("RadioToggle_WRAP");
    expect(wrap).toHaveClass("wrapLock");

    const toggleButton = screen.getByTestId("RadioToggle_BUTTON");
    fireEvent.click(toggleButton);

    expect(wrap).not.toHaveClass("wrapLock");
  });

  it("(2) Should not switch lock state if disabled and clicked", () => {
    render(<TestWrapper isDisabled={true} />);

    const wrap = screen.getByTestId("RadioToggle_WRAP");
    expect(wrap).toHaveClass("wrapLock");

    const toggleButton = screen.getByTestId("RadioToggle_BUTTON");
    fireEvent.click(toggleButton);

    expect(wrap).toHaveClass("wrapLock");
  });
});
