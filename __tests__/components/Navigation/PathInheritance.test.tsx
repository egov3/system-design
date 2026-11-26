import { render, screen } from "@testing-library/react";

import { PathInheritance } from "~components";

describe("PathInheritance", () => {
  it("(1) Should render title, breadcrumb children, and action buttons", () => {
    render(
      <PathInheritance
        title="Выдача справки"
        actionBtns={<button type="button">Код услуги</button>}
      >
        <span>Главная - Услуги</span>
      </PathInheritance>,
    );

    expect(screen.getByTestId("PathInheritance_WRAPPER")).toBeInTheDocument();
    expect(
      screen.getByTestId("PathInheritance_BREADCRUMBS"),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("PathInheritance_BREADCRUMBS_WRAPPER"),
    ).toHaveTextContent("Главная - Услуги");
    expect(
      screen.getByTestId("PathInheritance_TITLE_WRAPPER"),
    ).toBeInTheDocument();
    expect(screen.getByTestId("PathInheritance_TITLE")).toHaveTextContent(
      "Выдача справки",
    );
    expect(screen.getByTestId("PathInheritance_TITLE")).toHaveAttribute(
      "aria-label",
      "Выдача справки",
    );
    expect(screen.getByTestId("PathInheritance_ACTIONS")).toHaveTextContent(
      "Код услуги",
    );
  });

  it("(2) Should render without action buttons when actionBtns is omitted", () => {
    render(
      <PathInheritance title="Выдача справки">
        <span>Главная - Услуги</span>
      </PathInheritance>,
    );

    expect(screen.getByTestId("PathInheritance_WRAPPER")).toBeInTheDocument();
    expect(screen.getByTestId("PathInheritance_ACTIONS")).toBeEmptyDOMElement();
  });
});
