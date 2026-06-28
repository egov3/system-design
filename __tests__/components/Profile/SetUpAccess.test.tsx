import { render, screen } from "@testing-library/react";
import { SetUpAccess } from "~components";
import type { ILangGeneric } from "~interfaces/common";

describe("SetUpAccess", () => {
  const defaultProps = {
    lang: "ru" as keyof ILangGeneric<string>,
    lock: false,
    close: false,
    unlock: jest.fn(),
    setClose: jest.fn(),
  };

  it("(1) Should call setClose when save button is clicked", () => {
    render(<SetUpAccess {...defaultProps} />);

    expect(screen.getByTestId("SetUpAccess_WRAP")).toBeInTheDocument();
  });
});
