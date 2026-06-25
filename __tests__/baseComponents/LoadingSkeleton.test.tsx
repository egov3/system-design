import { render, screen } from "@testing-library/react";
import { BaseComponents } from "~baseComponents";
import { i18n } from "~constants/i18n";

describe("LoadingSkeleton", () => {
  it("(1) Should render skeleton title placeholder and cards", () => {
    render(
      <BaseComponents.LoadingSkeleton title={i18n.LoadingSkeleton.title.ru} />,
    );

    expect(screen.getByTestId("SectionLoadingSkeleton")).toBeInTheDocument();
    expect(
      screen.getByTestId("SectionLoadingSkeleton_TITLE"),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("SectionLoadingSkeleton_CARDS"),
    ).toBeInTheDocument();
    expect(screen.getAllByTestId("SectionLoadingSkeleton_ITEM")).toHaveLength(
      2,
    );
  });

  it("(2) Should render visible title and custom cards count", () => {
    render(
      <BaseComponents.LoadingSkeleton
        cardsCount={3}
        isTitleVisible
        title={i18n.LoadingSkeleton.title.ru}
      />,
    );

    expect(screen.getByText(i18n.LoadingSkeleton.title.ru)).toBeInTheDocument();
    expect(screen.getAllByTestId("SectionLoadingSkeleton_ITEM")).toHaveLength(
      3,
    );
  });
});
