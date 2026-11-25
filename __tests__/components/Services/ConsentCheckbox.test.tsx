import { fireEvent, render, screen } from "@testing-library/react";

import { ConsentCheckbox } from "~components";
import { i18n } from "~constants/i18n";
import { CONSENT_CHECKBOX_TEXT } from "~constants/mock/ConsentCheckbox";

const langDic = i18n.ConsentCheckbox;

describe("ConsentCheckbox", () => {
  it("(1) Should render the default texts and the hint", () => {
    render(
      <ConsentCheckbox
        lang="ru"
        isChecked={false}
        setIsChecked={jest.fn()}
        modalText={CONSENT_CHECKBOX_TEXT.MODAL_TEXT}
        isHintShown={true}
      />,
    );

    expect(screen.getByTestId("Checkbox_TEXT")).toHaveTextContent(
      langDic.label.ru,
    );
    expect(screen.getByTestId("Checkbox_ACTION_TEXT")).toHaveTextContent(
      langDic.actionLabel.ru,
    );
    expect(screen.getByTestId("ConsentCheckbox_HINT")).toHaveTextContent(
      langDic.hint.ru,
    );
  });

  it("(2) Should render the custom texts and open the modal by the action", () => {
    render(
      <ConsentCheckbox
        lang="ru"
        isChecked={false}
        setIsChecked={jest.fn()}
        modalText={CONSENT_CHECKBOX_TEXT.MODAL_TEXT}
        label={CONSENT_CHECKBOX_TEXT.LABEL}
        actionLabel={CONSENT_CHECKBOX_TEXT.ACTION_LABEL}
      />,
    );

    expect(screen.getByTestId("Checkbox_TEXT")).toHaveTextContent(
      CONSENT_CHECKBOX_TEXT.LABEL,
    );
    expect(screen.queryByTestId("Modal_WRAPPER")).not.toBeInTheDocument();

    fireEvent.click(screen.getByTestId("Checkbox_ACTION"));

    expect(screen.getByTestId("Modal_TITLE")).toHaveTextContent(
      langDic.title.ru,
    );
    expect(screen.getByTestId("ConsentCheckbox_MODAL_TEXT")).toHaveTextContent(
      CONSENT_CHECKBOX_TEXT.MODAL_TEXT.split("\n")[0],
    );
  });
});
