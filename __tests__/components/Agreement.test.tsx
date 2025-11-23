import { fireEvent, render, screen } from "@testing-library/react";
import { Components } from "~components";

const { Agreement } = Components;

describe("Agreement component", () => {
  it("(1) Should call submitAgreementAndSign when the button is clicked", () => {
    const submitAgreementAndSign = jest.fn();
    render(
      <Agreement
        agreementText="Agreement text"
        submitAgreementAndSign={submitAgreementAndSign}
      />,
    );

    const submitButton = screen.getByTestId("IdentityBtn_AGREEMENT");

    fireEvent.click(submitButton);

    expect(submitAgreementAndSign).toHaveBeenCalled();
  });
});
