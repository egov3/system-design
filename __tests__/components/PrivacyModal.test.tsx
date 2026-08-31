import { fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import { PrivacyModal } from "~components";
import { i18n } from "~constants/i18n";

const Wrapper = () => {
  const [isOpen, setIsOpen] = useState(true);

  return isOpen ? (
    <PrivacyModal lang="ru" isOpen={isOpen} setIsOpen={setIsOpen} />
  ) : null;
};

describe("PrivacyModal", () => {
  it("(1) Should render the title and the policy text", () => {
    render(<PrivacyModal lang="ru" />);

    expect(screen.getByTestId("Modal_TITLE")).toHaveTextContent(
      i18n.PrivacyModal.title.ru,
    );
    expect(screen.getByTestId("PrivacyModal_BODY")).toBeInTheDocument();
  });

  it("(2) Should be closable", () => {
    render(<Wrapper />);

    fireEvent.click(screen.getByTestId("ModalHeaderBtn_CLOSE"));

    expect(screen.queryByTestId("Modal_WRAPPER")).not.toBeInTheDocument();
  });
});
