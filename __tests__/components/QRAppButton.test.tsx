import { fireEvent, render, screen } from "@testing-library/react";
import { QRAppButton } from "~components";

describe("QRAppButton", () => {
  it("(1) Should render its graphics and call onClick", () => {
    const handleOrderService = jest.fn();

    render(
      <QRAppButton
        qrImage={<img data-testid="QRAppButton_QR" alt="QR code" />}
        icon={<svg data-testid="QRAppButton_ICON" aria-hidden="true" />}
        handleOrderService={handleOrderService}
      />,
    );

    const button = screen.getByTestId("QRAppButton_BUTTON");
    const qrImage = screen.getByTestId("QRAppButton_QR");
    const icon = screen.getByTestId("QRAppButton_ICON");

    expect(button).toHaveClass("wrap");
    expect(button).toHaveAttribute("type", "button");
    expect(qrImage).toHaveClass("qrImage");
    expect(icon).toHaveClass("icon");

    fireEvent.click(button);

    expect(handleOrderService).toHaveBeenCalledTimes(1);
  });
});
