import { render, screen } from "@testing-library/react";
import { Components } from "~components";
import { i18n } from "~constants/i18n";

const { EdsSuccess } = Components;

describe("EdsSuccess component", () => {
  it("(1) Should render EdsSuccess with correct message", () => {
    const lang = "ru";
    const handleEdsOnclick = jest.fn();
    render(<EdsSuccess lang={lang} handleEdsOnclick={handleEdsOnclick} />);

    expect(screen.getByTestId("IdentityEds_TITLE").textContent).toEqual(
      i18n.EdsSuccess.IdentityEdsTitle[lang],
    );
  });
});
