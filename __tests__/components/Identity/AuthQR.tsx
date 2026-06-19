import { render, screen } from "@testing-library/react";
import { AuthQR } from "~components";
import { i18n } from "~constants/i18n";

describe("AuthQR component", () => {
  const lang = "kk";
  const handleRefreshClick = jest.fn();

  it("(1) Should render AuthQR component with correct language", () => {
    render(<AuthQR lang={lang} handleRefreshClick={handleRefreshClick} />);

    expect(screen.getByTestId("QRCodeComponent_REFRESH").textContent).toEqual(
      i18n.AuthQR.refresh[lang],
    );
  });
});
