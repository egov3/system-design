import { render, screen } from "@testing-library/react";

import { HtmlContainer } from "~baseComponents";
import { htmlSample } from "~constants/mockData";

describe("HtmlContainer", () => {
  it("(1) Should render instruction steps text", () => {
    render(<HtmlContainer html={htmlSample} />);

    expect(screen.getByTestId("HtmlContainer_WRAPPER")).toHaveTextContent(
      "Внимание! Тестовая услуга Вы можете получить сведения об объекте недвижимости через портал eGov. Для получения услуги: Авторизуйтесь на портале. Заполните необходимые данные. Отправьте заявление. Примечание: услуга создана исключительно для тестирования.",
    );
  });
});
