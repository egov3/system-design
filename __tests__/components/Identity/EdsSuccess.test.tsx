import { render, screen } from "@testing-library/react";
import { EdsSuccess } from "~components";
import { i18n } from "~constants/i18n";


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
