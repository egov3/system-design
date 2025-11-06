import { fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import { BaseComponents } from "~baseComponents";

const TestWrapper = () => {
  const [lock, setLock] = useState<boolean>(true);
  return <BaseComponents.RadioToggle lock={lock} setLock={setLock} />;
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
});
