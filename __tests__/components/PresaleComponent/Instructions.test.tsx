import { render } from "@testing-library/react";
import { Components } from "~components";
import { instructions } from "../../Mock/presale";

describe("PresaleComponent.Instructions", () => {
  it("(1) Should render P601 instructions ", () => {
    const { getByRole } = render(
      <Components.PresaleComponent.Instructions
        instructions={instructions.P601}
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
