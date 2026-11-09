import { render, screen } from "@testing-library/react";

import { PresaleComponent } from "~components";
import { htmlSample } from "~constants/mockData";

describe("PresaleComponent.ServiceNotification", () => {
  it("(1) Should render instruction steps text", () => {
    render(<PresaleComponent.ServiceNotification notification={htmlSample} />);

    expect(screen.getByTestId("ServiceNotification_WRAPPER")).toHaveTextContent(
      "Внимание! Тестовая услуга Вы можете получить сведения об объекте недвижимости через портал eGov. Для получения услуги: Авторизуйтесь на портале. Заполните необходимые данные. Отправьте заявление. Примечание: услуга создана исключительно для тестирования.",
    );
  });
});
