import { fireEvent, render, screen } from "@testing-library/react";

import { ConsentCheckbox } from "~components";
import { CONSENT_CHECKBOX_TEXT } from "~constants/mock/ConsentCheckbox";

const setIsChecked = jest.fn();

const renderConsentCheckbox = (hintText?: string) =>
  render(
    <ConsentCheckbox
      lang="ru"
      label={CONSENT_CHECKBOX_TEXT.LABEL}
      actionLabel={CONSENT_CHECKBOX_TEXT.ACTION_LABEL}
      isChecked={false}
      setIsChecked={setIsChecked}
      modalTitle={CONSENT_CHECKBOX_TEXT.MODAL_TITLE}
      modalText={CONSENT_CHECKBOX_TEXT.MODAL_TEXT}
      hintText={hintText}
    />,
  );

describe("ConsentCheckbox", () => {
  beforeEach(() => {
    setIsChecked.mockClear();
  });

  it("(1) Should render the checkbox label and action without the hint and the modal", () => {
    renderConsentCheckbox();

    expect(screen.getByTestId("Checkbox_TEXT")).toHaveTextContent(
      CONSENT_CHECKBOX_TEXT.LABEL,
    );
    expect(screen.getByTestId("Checkbox_ACTION_TEXT")).toHaveTextContent(
      CONSENT_CHECKBOX_TEXT.ACTION_LABEL,
    );
    expect(
      screen.queryByTestId("ConsentCheckbox_HINT"),
    ).not.toBeInTheDocument();
    expect(screen.queryByTestId("Modal_WRAPPER")).not.toBeInTheDocument();
  });

  it("(2) Should render the hint", () => {
    renderConsentCheckbox(CONSENT_CHECKBOX_TEXT.HINT);

    expect(screen.getByTestId("ConsentCheckbox_HINT")).toHaveTextContent(
      CONSENT_CHECKBOX_TEXT.HINT,
    );
  });

  it("(3) Should pass the checked value to setIsChecked", () => {
    renderConsentCheckbox();

    fireEvent.click(screen.getByTestId("Checkbox_INPUT"));

    expect(setIsChecked).toHaveBeenCalledWith(true);
  });

  it("(4) Should open the modal with the full text without checking the checkbox", () => {
    renderConsentCheckbox();

    fireEvent.click(screen.getByTestId("Checkbox_ACTION"));

    expect(screen.getByTestId("Modal_TITLE")).toHaveTextContent(
      CONSENT_CHECKBOX_TEXT.MODAL_TITLE,
    );
    expect(screen.getByTestId("ConsentCheckbox_MODAL_TEXT")).toHaveTextContent(
      CONSENT_CHECKBOX_TEXT.MODAL_TEXT.split("\n")[0],
    );
    expect(setIsChecked).not.toHaveBeenCalled();
  });

  it("(5) Should close the modal by the close button", () => {
    renderConsentCheckbox();

    fireEvent.click(screen.getByTestId("Checkbox_ACTION"));
    fireEvent.click(screen.getByTestId("ModalHeaderBtn_CLOSE"));

    expect(screen.queryByTestId("Modal_WRAPPER")).not.toBeInTheDocument();
  });
});
