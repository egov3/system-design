import { render } from "@testing-library/react";
import { Components } from "~components";
import { i18n } from "~constants/i18n";

describe("PresaleComponent.Instructions", () => {
  it("(1) Should render P601 instructions ", () => {
    const { getByRole } = render(
      <Components.PresaleComponent.Instructions
        instructions={i18n.Services.presaleMock.instructions.P601}
        lang="ru"
      />,
    );

    expect(getByRole("list")).toHaveTextContent(
      "Подайте заявку на получение справки о пенсионных отчислениях за выбранный вами период",
    );
    expect(getByRole("list")).toHaveTextContent("Ожидайте ответа от госоргана");
    expect(getByRole("list")).toHaveTextContent(
      "Справка появится в личном кабинете",
    );
  });
});
